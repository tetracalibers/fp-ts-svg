import { pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import {
  center,
  fillColor,
  radius,
  strokeColor,
  strokeWidth,
  viewbox,
} from '../../lib/dom/attributes.js'
import { createSvgRoot, createCircle } from '../../lib/dom/element.js'

const svg = define(createSvgRoot, viewbox(0, 0, 800, 800))

const circle = define(
  createCircle,
  radius(245),
  center(400, 400),
  fillColor('#7FDB70'),
  strokeColor('#41B82E'),
  strokeWidth(10)
)

export const graphic = pipe(svg, addChild(circle))
