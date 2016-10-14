'use strict' /* @flow */

import each from 'lodash/each'
import tinycolor from '../../modules/tinycolor2'

export default {

  simpleCheckForValidColor(data: any): any {
    const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'a', 'v']
    let checked = 0
    let passed = 0
    each(keysToCheck, (letter) => {
      if (data[letter]) {
        checked++
        if (!isNaN(data[letter])) {
          passed++
        }
      }
    })
    return (checked === passed) ? data : false
  },

  toState(data: any, oldHue: number): any {
    const color = data.hex ? tinycolor(data.hex) : tinycolor(data)
    const hsl = color.toHsl()
    const hsv = color.toHsv()
    if (hsl.s === 0) {
      hsl.h = oldHue || 0
      hsv.h = oldHue || 0
    }

    return {
      hsl,
      hex: `#${ color.toHex() }`,
      rgb: color.toRgb(),
      hsv,
      oldHue: data.h || oldHue || hsl.h,
      source: data.source,
    }
  },

  isValidHex(hex: string): boolean {
    return tinycolor(hex).isValid()
  },

}

export const red = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 },
}
