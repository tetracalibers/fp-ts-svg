import { pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import {
  fillColor,
  fillOpacity,
  height,
  strokeColor,
  strokeOpacity,
  strokeWidth,
  viewBox,
  width,
} from '../../lib/dom/attributes.js'
import { createSvgRoot, createPath } from '../../lib/dom/element.js'
import { dumpSvgFile } from '../util.js'
import { commands, lineTo, moveTo, close } from '../../lib/dom/path.js'

const diamond = define(
  createPath,
  commands(
    moveTo(3, 10),
    lineTo(7, -10),
    lineTo(7, 10),
    lineTo(-7, 10),
    close()
  ),
  strokeColor('red'),
  strokeWidth(3),
  strokeOpacity(0.8),
  fillColor('mediumOrchid'),
  fillOpacity(0.8)
)

const root = define(
  createSvgRoot,
  width(300),
  height(300),
  viewBox(-5, -5, 30, 30)
)

const graphic = pipe(root, addChild(diamond))

await dumpSvgFile(graphic, './examples/path-diamond-close-relative/result.svg')
