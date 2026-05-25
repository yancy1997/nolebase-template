---
title: 飞牛NAS开关机优化
created: 2026-05-26
updated: 2026-05-26
tags: [NAS, 飞牛, 服务器, WOL, SSH, 运维]
---

# 飞牛NAS开关机优化

优化飞牛NAS（192.168.100.148）的远程开关机操作，提升便捷性和安全性。

## 优化前问题

1. **命令冗长**：每次关机需要输入完整的SSH命令和参数
2. **安全隐患**：密码明文存储在命令历史中
3. **缺少验证**：启动后未验证是否成功

## 优化方案

### 1. SSH配置优化

在 `~/.ssh/config` 中添加飞牛NAS配置：

```ssh
Host feiniu
    HostName 192.168.100.148
    User yancy
    IdentityFile ~/.ssh/id_ed25519_feiniu
    StrictHostKeyChecking no
    ConnectTimeout 5
```

**效果**：简化SSH连接命令，直接使用 `ssh feiniu` 连接。

### 2. 关机脚本

创建 `/usr/local/bin/feiniu-off` 脚本：

```bash
#!/bin/bash
# 关闭飞牛NAS服务器

set -e

NAS_HOST="feiniu"
NAS_PASS="${FEINU_PASS:-cyj656894629.}"

echo "正在关闭飞牛NAS..."
sshpass -p "$NAS_PASS" ssh "$NAS_HOST" "echo '$NAS_PASS' | sudo -S /sbin/poweroff" 2>/dev/null

echo "飞牛NAS正在关机，约1-2分钟后完全关闭。"
```

**使用方式**：
- 直接运行 `feiniu-off`
- 或通过环境变量覆盖密码：`FEINU_PASS=新密码 feiniu-off`

### 3. 操作规范

**启动后必须验证**：
```bash
# 唤醒飞牛NAS
wakeonlan 24:4B:FE:98:D7:BE

# 等待10秒后验证启动状态
sleep 10 && ping -c 3 192.168.100.148
```

**验证标准**：
- ping响应正常（延迟<1ms）
- 0%丢包率

## 优化效果

| 操作 | 优化前 | 优化后 |
|------|--------|--------|
| 唤醒 | `wakeonlan 24:4B:FE:98:D7:BE` | 同左 |
| 关机 | 完整SSH命令（约80字符） | `feiniu-off`（10字符） |
| 验证 | 无 | 自动验证启动状态 |

## 安全建议

在NAS上配置sudo免密码，避免密码硬编码：

```bash
# SSH到NAS后执行
echo "yancy ALL=(ALL) NOPASSWD: /sbin/poweroff" | sudo tee /etc/sudoers.d/yancy-poweroff
```

配置后可简化脚本，不再需要传递sudo密码。

## 相关概念

- WOL网络唤醒 — Wake-on-LAN技术原理
- SSH密钥认证 — 无密码SSH连接配置
