import { defineConfig } from "vite";
// @ts-ignore
import path from "path";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        dts: "src/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        imports: ["vue", "vue-router"],
      }),
      Components({
        deep: true,
        extensions: ["vue", "tsx"],
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    base: "/",
    resolve: {
      alias: {
        // @ts-ignore
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      open: true,
      host: "0.0.0.0",
      // proxy: {
      //   "/api": {
      //     target: "https://******",
      //     changeOrigin: true,
      //     rewrite: (e) => e.replace(/^\/api/, ""),
      //   },
      // },
    },
  };
});
