import { pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import { fillColor, size, viewbox, position } from '../../lib/dom/attributes.js'
import { createSvgRoot, createRect } from '../../lib/dom/element.js'

const svg = define(createSvgRoot, viewbox(0, 0, 800, 800))

const rect = define(
  createRect,
  position(276, 200),
  size(400, 400),
  fillColor('rebeccapurple')
)

export const graphic = pipe(svg, addChild(rect))
