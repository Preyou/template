// import '@rushstack/eslint-patch/modern-module-resolution'
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  // stylistic: {
  //   indent: 2, // 4, or 'tab'
  //   quotes: 'single', // or 'double'
  // },

  // // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  // typescript: true,

  // // Disable jsonc and yaml support
  // jsonc: false,
  // yaml: false,

  // // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  // ignores: [
  //   '**/fixtures',
  // formatters: {
  //   css: true,
  // },

  //   // ...globs
  rules: {
    'no-unlimited-disable': 'off',
    'perfectionist/sort-objects': [
      'error',
      {
        order: 'asc',
        type: 'natural',
      },
    ],
  },

  typescript: {
    tsconfigPath: 'tsconfig.app.json',
  },
  // ],
  unocss: true,
  vue: {
    overrides: {
      'vue/component-tags-order': ['error', {
        order: [['script', 'template'], 'style'],
      }],
    },
  },
  ...compat.config({
    extends: [
      '.eslintrc-auto-import.json',
    ],
  }),
})
