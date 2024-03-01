import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoExport from 'unplugin-auto-export/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import tsconfigPaths from 'vite-tsconfig-paths'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const cesiumSource = 'node_modules/cesium/Build/Cesium'
const cesiumBaseUrl = 'cesiumStatic'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
  },
  plugins: [
    ReactivityTransform(),
    VueDevTools(),
    VueRouter({
      dts: './types/auto/vue-router.d.ts',
      routesFolder: [
        {
          src: 'src/views/pages',
        },
      ],
    }),
    vue(),
    vueJsx(),
    // viteSingleFile(),
    AutoImport({
      dts: './types/auto/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: [
        '@vueuse/core',
        '@vueuse/math',
        '@vueuse/head',
        'vue',
        VueRouterAutoImports,
        {
          'cesium': [
            ['*', 'Cesium'],
          ],
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },

      ],
    }),
    Components({
      dts: './types/auto/components.d.ts',
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({
          prefix: 'i',
        }),
        (componentName) => {
          // where `componentName` is always CapitalCase
          if (componentName.startsWith('Cesium')) {
            const name = componentName.slice(6)
            return { from: `@/cesium/viewer/${name}.vue`, name: 'default' }
          }
        },
      ],
      version: 3,
    }),
    AutoExport({
      // 文件扩展名（默认为 'ts'）'ts' | 'js'
      extname: 'ts',
      // 自定义导出格式
      // formatter: (filename, extname) => `export * from './${filename}'`,
      // 要忽略的文件夹或文件（可选）
      ignore: ['**/node_modules/*'],
      // 要监听的文件夹, 路径可以使用别名; 以 /* 结尾即可
      path: ['src/cesium/utils/*'],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
    tsconfigPaths(),
    UnoCSS(),
    viteStaticCopy({
      targets: [
        { dest: cesiumBaseUrl, src: `${cesiumSource}/ThirdParty` },
        { dest: cesiumBaseUrl, src: `${cesiumSource}/Workers` },
        { dest: cesiumBaseUrl, src: `${cesiumSource}/Assets` },
        { dest: cesiumBaseUrl, src: `${cesiumSource}/Widgets` },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
