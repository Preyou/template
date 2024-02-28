<script setup lang="ts">
import { viewerConstructorOptions } from '@/cesium/utils'

const options = {
  ...viewerConstructorOptions,
  sceneMode: Cesium.SceneMode.COLUMBUS_VIEW,
}
</script>

<template>
  <cesium-viewer :options="options" />
</template>
