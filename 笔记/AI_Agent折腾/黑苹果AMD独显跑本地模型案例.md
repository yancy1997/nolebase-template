---
title: "黑苹果 AMD 独显跑本地模型：从 3 t/s 到 58 t/s"
description: "记录 Intel 黑苹果通过 MoltenVK 和 Vulkan 调用 AMD RX 6750 GRE 运行 llama.cpp，从 CPU 约 3 t/s 提升到 GPU 约 58 t/s 的排错过程。"
date: 2026-07-26
tags: [黑苹果, AMD, 本地模型, llama.cpp, Vulkan]
comment: true
---

# 黑苹果 AMD 独显跑本地模型：从 3 t/s 到 58 t/s

这台黑苹果我用了挺久。Intel CPU 加一张 AMD RX 6750 GRE 12GB，日常跑 macOS 没什么问题。后来我想让它常驻一个本地模型，给 OpenClaw 之类的工具提供 API，麻烦才开始。

我最早直接装了 Ollama。模型能启动，回答也正常，速度只有 3 t/s 左右。看日志和系统占用，推理全压在 CPU 上，12GB 显存基本闲着。

这套状态维持了一年。偶尔问两句话还能忍，放到 Agent 工作流里就很难用了。一次任务要调用多轮模型，3 t/s 会把每个步骤都拖长。

## Metal 跑快了，输出却坏了

我把 Ollama 换成 `llama.cpp`，先试了 macOS 上常用的 Metal 后端。

速度立刻到了 60 t/s 左右，GPU 也确实开始工作。我以为问题已经解决，模型输出却变成乱码、多语言混杂和无限重复。速度很漂亮，结果没法用。

我先排查模型文件。把 GPU offload 关掉，纯 CPU 输出正常；只把一层放到 GPU，乱码又出现了。模型和量化文件没有损坏，问题跟着 GPU 后端走。

Flash Attention、KV Cache 精度和 offload 参数我都调过，输出仍然不稳定。日志里还有一条信息值得注意：AMD 独显被识别为非统一内存设备。Apple Silicon 的 CPU 和 GPU 共用统一内存，这台黑苹果的 AMD 显卡通过 PCIe 连接，内存结构完全不同。

在我的机器上，Metal 后端能完成计算，也能跑出很高的速度，但计算结果不可靠。继续调 Metal 参数已经没有意义，我换了一条后端。

## 用 MoltenVK 把 Vulkan 接进来

我最后用了 MoltenVK，让 `llama.cpp` 通过 Vulkan 调用 AMD 显卡。

先安装编译依赖：

```bash
brew install molten-vk vulkan-headers vulkan-loader shaderc
```

然后拉一份新的 `llama.cpp`，打开 Vulkan，关闭 Metal：

```bash
git clone --depth 1 \
  https://github.com/ggml-org/llama.cpp.git \
  ~/llama.cpp-vulkan

cmake -B ~/llama.cpp-vulkan/build \
  -S ~/llama.cpp-vulkan \
  -DGGML_VULKAN=ON \
  -DGGML_METAL=OFF \
  -DCMAKE_BUILD_TYPE=Release

cmake --build ~/llama.cpp-vulkan/build \
  --config Release \
  -j$(sysctl -n hw.ncpu) \
  -- llama-cli llama-server
```

编译完成后，我用 GGUF 量化模型做测试。模型文件可以替换成自己的路径：

```bash
DYLD_LIBRARY_PATH=~/llama.cpp-vulkan/build/bin \
  ~/llama.cpp-vulkan/build/bin/llama-cli \
  -m ~/models/model.gguf \
  -fa off \
  -ngl 99 \
  -c 4096
```

这里有一个我踩过的坑。Vulkan 环境下开启 Flash Attention，模型仍可能出现重复输出。我加上 `-fa off` 后，输出才稳定下来。

同一个模型，我在这台机器上测到三组结果。

CPU 纯推理约 3 t/s，输出正常；Metal GPU 接近 60 t/s，输出乱码；Vulkan GPU 约 58 t/s，输出正常。Vulkan 少掉的一点速度没有影响实际使用，稳定输出解决了我最在意的问题。

## 跑成一个本地 API

命令行里能正常对话以后，我又启动了 `llama-server`：

```bash
DYLD_LIBRARY_PATH=~/llama.cpp-vulkan/build/bin \
  ~/llama.cpp-vulkan/build/bin/llama-server \
  -m ~/models/model.gguf \
  -fa off \
  -ngl 99 \
  -c 4096 \
  --host 127.0.0.1 \
  --port 11434
```

它会提供 OpenAI 兼容接口。支持自定义 API 地址的 Agent 或应用，可以直接把请求转到这台黑苹果上，不需要再经过 Ollama。

我只监听 `127.0.0.1`，没有把模型服务直接暴露到公网。远程调用需要额外的身份验证、访问控制和网络隔离，单独开放端口会留下安全风险。

## 我留下的排错顺序

这次折腾之后，我保留了一套很短的排查顺序。

先用 `-ngl 0` 跑纯 CPU，确认模型文件和 Chat Template 能正常输出。再用 `-ngl 1` 只 offload 一层，观察问题是否跟 GPU 后端一起出现。输出一旦变成乱码，就检查日志里的统一内存识别和后端信息。

模型在 CPU 上正常、进入 GPU 后异常时，继续更换量化文件通常解决不了后端兼容问题。换 Metal 参数也没有修好我的机器。切到 Vulkan 后，速度和输出才同时达到可用状态。

这套方案来自一台具体的黑苹果，硬件、macOS、`llama.cpp` 和 MoltenVK 版本变化都可能影响结果。它不能保证所有 AMD 黑苹果都能复现，但排查过程可以复用：先隔离模型问题，再缩小到 GPU offload，最后更换计算后端。

这台旧机器现在能稳定承担低频本地推理，也能给我自己的 Agent 提供 API。12GB AMD 显存重新用起来了，速度从约 3 t/s 提升到约 58 t/s。比速度更有用的，是我终于知道该怎样判断问题出在模型、参数，还是 GPU 后端。
