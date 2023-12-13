import { flow, pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import { fillColor, height, width } from '../../lib/dom/attributes.js'
import { createSvgRoot, createPath } from '../../lib/dom/element.js'
import { dumpSvgFile } from '../util.js'
import {
  commands,
  lineToAt,
  moveToAt,
  close,
  vLineToAt,
  hLineToAt,
} from '../../lib/dom/path.js'

// M3,10 L10,0 17,10 10,20 Z
const cDiamondShape = flow(
  moveToAt(3, 10),
  lineToAt(10, 0),
  lineToAt(17, 10),
  lineToAt(10, 20),
  close()
)

// M9,11 L10,18 V10 H15 L11,9 10,2 V10 H5 Z
const cCutoutShape = flow(
  moveToAt(9, 11),
  lineToAt(10, 18),
  vLineToAt(10),
  hLineToAt(15),
  lineToAt(11, 9),
  lineToAt(10, 2),
  vLineToAt(10),
  hLineToAt(5),
  close()
)

const diamondCutout = define(
  createPath,
  commands(cDiamondShape, cCutoutShape),
  fillColor('red')
)

const root = define(createSvgRoot, width(20), height(20))

const graphic = pipe(root, addChild(diamondCutout))

await dumpSvgFile(graphic, './examples/path-diamond-cutout-use-vh/result.svg')
