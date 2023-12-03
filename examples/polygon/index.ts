import { flow, pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import {
  fillColor,
  strokeColor,
  strokeWidth,
  viewbox,
} from '../../lib/dom/attributes.js'
import { createSvgRoot, createPolygon } from '../../lib/dom/element.js'
import { lineTo, moveTo, points } from '../../lib/dom/points.js'

const svg = define(createSvgRoot, viewbox(0, 0, 800, 800))

const polygon = define(
  createPolygon,
  points(flow(moveTo(50, 112), lineTo(500, 300), lineTo(50, 400))),
  fillColor('#70DB8E'),
  strokeColor('#2EB855'),
  strokeWidth(20)
)

export const graphic = pipe(svg, addChild(polygon))
