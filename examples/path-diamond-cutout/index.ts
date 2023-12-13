import { flow, pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import { fillColor, height, width } from '../../lib/dom/attributes.js'
import { createSvgRoot, createPath } from '../../lib/dom/element.js'
import { dumpSvgFile } from '../util.js'
import { commands, lineToAt, moveToAt, close } from '../../lib/dom/path.js'

const cDiamondShape = flow(
  moveToAt(3, 10),
  lineToAt(10, 0),
  lineToAt(17, 10),
  lineToAt(10, 20),
  close()
)

const cCutoutShape = flow(
  moveToAt(9, 11),
  lineToAt(10, 18),
  lineToAt(10, 10),
  lineToAt(15, 10),
  lineToAt(11, 9),
  lineToAt(10, 2),
  lineToAt(10, 10),
  lineToAt(5, 10),
  close()
)

const diamondCutout = define(
  createPath,
  commands(cDiamondShape, cCutoutShape),
  fillColor('red')
)

const root = define(createSvgRoot, width(20), height(20))

const graphic = pipe(root, addChild(diamondCutout))

await dumpSvgFile(graphic, './examples/path-diamond-cutout/result.svg')
