// vite.config.ts
import { defineConfig } from "file:///Users/yancy/ai/nolebase-template/node_modules/.pnpm/vite@5.4.21_less@4.6.4/node_modules/vite/dist/node/index.js";
import Components from "file:///Users/yancy/ai/nolebase-template/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.5.34/node_modules/unplugin-vue-components/dist/vite.js";
import UnoCSS from "file:///Users/yancy/ai/nolebase-template/node_modules/.pnpm/unocss@0.58.9_postcss@8.5.14_vite@5.4.21/node_modules/unocss/dist/vite.mjs";
import Inspect from "file:///Users/yancy/ai/nolebase-template/node_modules/.pnpm/vite-plugin-inspect@0.8.9_vite@5.4.21/node_modules/vite-plugin-inspect/dist/index.mjs";
import { GitChangelog, GitChangelogMarkdownSection } from "file:///Users/yancy/ai/nolebase-template/node_modules/.pnpm/@nolebase+vitepress-plugin-git-changelog@2.0.0-rc11_vitepress@1.6.4_vue@3.5.34/node_modules/@nolebase/vitepress-plugin-git-changelog/dist/vite/index.mjs";
import { PageProperties, PagePropertiesMarkdownSection } from "file:///Users/yancy/ai/nolebase-template/node_modules/.pnpm/@nolebase+vitepress-plugin-page-properties@2.0.0-rc11_vitepress@1.6.4_vue@3.5.34/node_modules/@nolebase/vitepress-plugin-page-properties/dist/vite/index.mjs";
import { ThumbnailHashImages } from "file:///Users/yancy/ai/nolebase-template/node_modules/.pnpm/@nolebase+vitepress-plugin-thumbnail-hash@2.0.0-rc11_vitepress@1.6.4/node_modules/@nolebase/vitepress-plugin-thumbnail-hash/dist/vite/index.mjs";

// metadata/index.ts
var githubRepoLink = "https://github.com/nolebase/nolebase";
var plainTargetDomain = "nolebase.ayaka.io";
var targetDomain = `https://${plainTargetDomain}`;

// vite.config.ts
var vite_config_default = defineConfig(async () => {
  return {
    assetsInclude: ["**/*.mov"],
    optimizeDeps: {
      // vitepress is aliased with replacement `join(DIST_CLIENT_PATH, '/index')`
      // This needs to be excluded from optimization
      exclude: [
        "vitepress"
      ]
    },
    plugins: [
      Inspect(),
      GitChangelog({
        repoURL: () => githubRepoLink
      }),
      GitChangelogMarkdownSection({
        getChangelogTitle: () => {
          return "\u6587\u4EF6\u5386\u53F2";
        },
        getContributorsTitle: () => {
          return "\u8D21\u732E\u8005";
        },
        excludes: [
          "toc.md",
          "index.md"
        ]
      }),
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: [
          "toc.md",
          "index.md"
        ]
      }),
      ThumbnailHashImages(),
      Components({
        include: [/\.vue$/, /\.md$/],
        dirs: ".vitepress/theme/components",
        dts: ".vitepress/components.d.ts"
      }),
      UnoCSS()
    ],
    ssr: {
      noExternal: [
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/vitepress-plugin-highlight-targeted-heading",
        "@nolebase/vitepress-plugin-inline-link-preview"
      ]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWV0YWRhdGEvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveWFuY3kvYWkvbm9sZWJhc2UtdGVtcGxhdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95YW5jeS9haS9ub2xlYmFzZS10ZW1wbGF0ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveWFuY3kvYWkvbm9sZWJhc2UtdGVtcGxhdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0J1xuXG5pbXBvcnQgeyBHaXRDaGFuZ2Vsb2csIEdpdENoYW5nZWxvZ01hcmtkb3duU2VjdGlvbiB9IGZyb20gJ0Bub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLWdpdC1jaGFuZ2Vsb2cvdml0ZSdcbmltcG9ydCB7IFBhZ2VQcm9wZXJ0aWVzLCBQYWdlUHJvcGVydGllc01hcmtkb3duU2VjdGlvbiB9IGZyb20gJ0Bub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLXBhZ2UtcHJvcGVydGllcy92aXRlJ1xuaW1wb3J0IHsgVGh1bWJuYWlsSGFzaEltYWdlcyB9IGZyb20gJ0Bub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLXRodW1ibmFpbC1oYXNoL3ZpdGUnXG5cbmltcG9ydCB7IGdpdGh1YlJlcG9MaW5rIH0gZnJvbSAnLi9tZXRhZGF0YSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhc3NldHNJbmNsdWRlOiBbJyoqLyoubW92J10sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAvLyB2aXRlcHJlc3MgaXMgYWxpYXNlZCB3aXRoIHJlcGxhY2VtZW50IGBqb2luKERJU1RfQ0xJRU5UX1BBVEgsICcvaW5kZXgnKWBcbiAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgZXhjbHVkZWQgZnJvbSBvcHRpbWl6YXRpb25cbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgJ3ZpdGVwcmVzcycsXG4gICAgICBdLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgSW5zcGVjdCgpLFxuICAgICAgR2l0Q2hhbmdlbG9nKHtcbiAgICAgICAgcmVwb1VSTDogKCkgPT4gZ2l0aHViUmVwb0xpbmssXG4gICAgICB9KSxcbiAgICAgIEdpdENoYW5nZWxvZ01hcmtkb3duU2VjdGlvbih7XG4gICAgICAgIGdldENoYW5nZWxvZ1RpdGxlOiAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgICByZXR1cm4gJ1x1NjU4N1x1NEVGNlx1NTM4Nlx1NTNGMidcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q29udHJpYnV0b3JzVGl0bGU6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgIHJldHVybiAnXHU4RDIxXHU3MzJFXHU4MDA1J1xuICAgICAgICB9LFxuICAgICAgICBleGNsdWRlczogW1xuICAgICAgICAgICd0b2MubWQnLFxuICAgICAgICAgICdpbmRleC5tZCcsXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIFBhZ2VQcm9wZXJ0aWVzKCksXG4gICAgICBQYWdlUHJvcGVydGllc01hcmtkb3duU2VjdGlvbih7XG4gICAgICAgIGV4Y2x1ZGVzOiBbXG4gICAgICAgICAgJ3RvYy5tZCcsXG4gICAgICAgICAgJ2luZGV4Lm1kJyxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgVGh1bWJuYWlsSGFzaEltYWdlcygpLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcbiAgICAgICAgZGlyczogJy52aXRlcHJlc3MvdGhlbWUvY29tcG9uZW50cycsXG4gICAgICAgIGR0czogJy52aXRlcHJlc3MvY29tcG9uZW50cy5kLnRzJyxcbiAgICAgIH0pLFxuICAgICAgVW5vQ1NTKCksXG4gICAgXSxcbiAgICBzc3I6IHtcbiAgICAgIG5vRXh0ZXJuYWw6IFtcbiAgICAgICAgJ0Bub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLWVuaGFuY2VkLXJlYWRhYmlsaXRpZXMnLFxuICAgICAgICAnQG5vbGViYXNlL3ZpdGVwcmVzcy1wbHVnaW4taGlnaGxpZ2h0LXRhcmdldGVkLWhlYWRpbmcnLFxuICAgICAgICAnQG5vbGViYXNlL3ZpdGVwcmVzcy1wbHVnaW4taW5saW5lLWxpbmstcHJldmlldycsXG4gICAgICBdLFxuICAgIH0sXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy95YW5jeS9haS9ub2xlYmFzZS10ZW1wbGF0ZS9tZXRhZGF0YVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3lhbmN5L2FpL25vbGViYXNlLXRlbXBsYXRlL21ldGFkYXRhL2luZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy95YW5jeS9haS9ub2xlYmFzZS10ZW1wbGF0ZS9tZXRhZGF0YS9pbmRleC50c1wiOy8qKiBcdTY1ODdcdTY3MkMgKi9cbmV4cG9ydCBjb25zdCBzaXRlTmFtZSA9ICdOXHUwMEYzbFx1MDBFQmJhc2UnXG5leHBvcnQgY29uc3Qgc2l0ZVNob3J0TmFtZSA9ICdOXHUwMEYzbFx1MDBFQmJhc2UnXG5leHBvcnQgY29uc3Qgc2l0ZURlc2NyaXB0aW9uID0gJ1x1OEJCMFx1NUY1NVx1NTZERVx1NUZDNlx1RkYwQ1x1NzdFNVx1OEJDNlx1NTQ4Q1x1NzU0NVx1NjBGM1x1NzY4NFx1NTczMFx1NjVCOSdcblxuLyoqIFx1NjU4N1x1Njg2M1x1NjI0MFx1NTcyOFx1NzZFRVx1NUY1NSAqL1xuZXhwb3J0IGNvbnN0IGluY2x1ZGUgPSBbJ1x1N0IxNFx1OEJCMCcsICdcdTc1MUZcdTZEM0InXVxuXG4vKiogUmVwbyAqL1xuZXhwb3J0IGNvbnN0IGdpdGh1YlJlcG9MaW5rID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9ub2xlYmFzZS9ub2xlYmFzZSdcbi8qKiBEaXNjb3JkICovXG5leHBvcnQgY29uc3QgZGlzY29yZExpbmsgPSAnaHR0cHM6Ly9kaXNjb3JkLmdnL1h1TkZEY0RaR2onXG5cbi8qKiBcdTY1RTBcdTUzNEZcdThCQUVcdTUyNERcdTdGMDBcdTU3REZcdTU0MEQgKi9cbmV4cG9ydCBjb25zdCBwbGFpblRhcmdldERvbWFpbiA9ICdub2xlYmFzZS5heWFrYS5pbydcbi8qKiBcdTVCOENcdTY1NzRcdTU3REZcdTU0MEQgKi9cbmV4cG9ydCBjb25zdCB0YXJnZXREb21haW4gPSBgaHR0cHM6Ly8ke3BsYWluVGFyZ2V0RG9tYWlufWBcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVIsU0FBUyxvQkFBb0I7QUFDbFQsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sYUFBYTtBQUVwQixTQUFTLGNBQWMsbUNBQW1DO0FBQzFELFNBQVMsZ0JBQWdCLHFDQUFxQztBQUM5RCxTQUFTLDJCQUEyQjs7O0FDRTdCLElBQU0saUJBQWlCO0FBS3ZCLElBQU0sb0JBQW9CO0FBRTFCLElBQU0sZUFBZSxXQUFXLGlCQUFpQjs7O0FETHhELElBQU8sc0JBQVEsYUFBYSxZQUFZO0FBQ3RDLFNBQU87QUFBQSxJQUNMLGVBQWUsQ0FBQyxVQUFVO0FBQUEsSUFDMUIsY0FBYztBQUFBO0FBQUE7QUFBQSxNQUdaLFNBQVM7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxRQUNYLFNBQVMsTUFBTTtBQUFBLE1BQ2pCLENBQUM7QUFBQSxNQUNELDRCQUE0QjtBQUFBLFFBQzFCLG1CQUFtQixNQUFjO0FBQy9CLGlCQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0Esc0JBQXNCLE1BQWM7QUFDbEMsaUJBQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxVQUFVO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxlQUFlO0FBQUEsTUFDZiw4QkFBOEI7QUFBQSxRQUM1QixVQUFVO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxvQkFBb0I7QUFBQSxNQUNwQixXQUFXO0FBQUEsUUFDVCxTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUEsUUFDM0IsTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLE1BQ0QsT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFlBQVk7QUFBQSxRQUNWO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
