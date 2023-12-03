import { pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import {
  viewbox,
  strokeColor,
  strokeWidth,
  from,
  to,
} from '../../lib/dom/attributes.js'
import { createSvgRoot, createLine } from '../../lib/dom/element.js'

const svg = define(createSvgRoot, viewbox(0, 0, 800, 800))

const line = define(
  createLine,
  from(50, 300),
  to(375, 50),
  strokeColor('#70AEDB'),
  strokeWidth(25)
)

export const graphic = pipe(svg, addChild(line))
