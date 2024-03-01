<script setup lang="ts">
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { viewerSymbol } from '@/cesium/utils'

const $emit = defineEmits<{
  ready: [Cesium.Viewer]
}>()
const { options } = $(defineProps<{ options: Cesium.Viewer.ConstructorOptions }>())
const cesiumContainer = ref<HTMLElement | null>(null)

provide(viewerSymbol, new Promise((res) => {
  whenever(cesiumContainer, (v: HTMLElement) => {
    const viewer = new Cesium.Viewer(v, options)
    // 隐藏版权信息
    viewer.cesiumWidget.creditContainer.setAttribute('style', 'display: none')
    $emit('ready', viewer)
    res(viewer)
    if (import.meta.env.DEV) {
      window.$g ??= {}
      window.$g.Cesium ??= Cesium
      window.$g.viewer ??= viewer
      window.$g.viewerSet ??= new Set()
      window.$g.viewerSet.add(viewer)
    }
  })
}))
</script>

<template>
  <div relative h-full w-full>
    <div ref="cesiumContainer" h-full w-full />
    <suspense>
      <slot />
    </suspense>
  </div>
</template>
