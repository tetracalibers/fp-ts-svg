import { pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import {
  fill,
  strokeColor,
  strokeWidth,
  viewbox,
} from '../../lib/dom/attributes.js'
import { createSvgRoot, createPolyline } from '../../lib/dom/element.js'
import { at, points } from '../../lib/dom/points.js'

const svg = define(createSvgRoot, viewbox(0, 0, 800, 800))

const polyline = define(
  createPolyline,
  points(at(50, 112), at(500, 300), at(50, 400)),
  fill('none'),
  strokeColor('#9970DB'),
  strokeWidth(20)
)

export const graphic = pipe(svg, addChild(polyline))
