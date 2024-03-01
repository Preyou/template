<script setup lang="ts">
import { viewerConstructorOptions } from '@/cesium/utils'
import onReady from '@/views/cesium'

const options = {
  ...viewerConstructorOptions,
  // globe: false,
  sceneMode: Cesium.SceneMode.SCENE3D,
} satisfies Cesium.Viewer.ConstructorOptions
</script>

<template>
  <cesium-viewer :options="options" @ready="onReady" />
</template>
