/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="@vue-macros/reactivity-transform/macros-global" />

export {}
declare global{
  interface Window {
    $g: any
  }
}

declare global{
  export type * as Cesium from 'cesium'
}
// interface ImportMetaEnv {
//   readonly VITE_APP_TITLE: string
//   // 更多环境变量...
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv
// }
