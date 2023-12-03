import { pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import {
  center,
  fillColor,
  radiusXY,
  strokeColor,
  strokeWidth,
  viewbox,
} from '../../lib/dom/attributes.js'
import { createSvgRoot, createEllipse } from '../../lib/dom/element.js'

const svg = define(createSvgRoot, viewbox(0, 0, 800, 800))

const ellipse = define(
  createEllipse,
  radiusXY(245, 100),
  center(400, 400),
  fillColor('#DB7092'),
  strokeColor('#B82E5A'),
  strokeWidth(10)
)

export const graphic = pipe(svg, addChild(ellipse))
