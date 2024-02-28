export const viewerSymbol = Symbol('viewer')

export function useViewer() {
  return inject<Promise<Cesium.Viewer>>(viewerSymbol)
}
