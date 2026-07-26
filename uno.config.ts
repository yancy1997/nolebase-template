import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { icons as carbonIcons } from '@iconify-json/carbon'
import { icons as iconParkOutlineIcons } from '@iconify-json/icon-park-outline'
import { icons as octiconIcons } from '@iconify-json/octicon'

const iconParkOutlineCollection = {
  ...iconParkOutlineIcons,
  icons: {
    ...iconParkOutlineIcons.icons,
    'icon-book-open': iconParkOutlineIcons.icons['book-open'],
    'icon-layout-one': iconParkOutlineIcons.icons['layout-one'],
    'icon-click': iconParkOutlineIcons.icons.click,
    'icon-auto-line-width': iconParkOutlineIcons.icons['auto-line-width'],
    'icon-auto-width-one': iconParkOutlineIcons.icons['auto-width-one'],
  },
}

const octiconCollection = {
  ...octiconIcons,
  icons: {
    ...octiconIcons.icons,
    'chevron-down-16-rotate-180': octiconIcons.icons['chevron-down-16'],
    'chevron-down-16-rotate-0': octiconIcons.icons['chevron-down-16'],
  },
}

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      scale: 1.2, // size: 1.2 rem
      collections: {
        carbon: carbonIcons,
        'icon-park-outline': iconParkOutlineCollection,
        octicon: octiconCollection,
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'min-width': '1.2rem',
      },
      warn: true,
    }),
  ],
})
