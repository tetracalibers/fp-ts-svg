import { pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import {
  fill,
  strokeColor,
  strokeWidth,
  viewbox,
} from '../../lib/dom/attributes.js'
import { createSvgRoot, createPolyline } from '../../lib/dom/element.js'
import { at, points, fromTo } from '../../lib/dom/points.js'
import { dumpSvgFile } from '../util.js'

const svg = define(createSvgRoot, viewbox(0, 0, 800, 800))

const polyline = define(
  createPolyline,
  //points(at(50, 112), at(500, 300), at(50, 400)),
  points(at(50, 112), fromTo(450, 188), fromTo(-450, 100)),
  fill('none'),
  strokeColor('#9970DB'),
  strokeWidth(20)
)

const graphic = pipe(svg, addChild(polyline))

await dumpSvgFile(graphic, './examples/polyline-relative/result.svg')
