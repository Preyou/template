import { type UserConfig, defineConfig } from 'unocss'
import { presetAttributify, presetIcons, presetTagify, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({ /* preset options */ }),
    presetIcons({
      autoInstall: true,
    }),
    presetTagify(
      {
        prefix: 'un',
      },
    ),
    // ...other presets
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
