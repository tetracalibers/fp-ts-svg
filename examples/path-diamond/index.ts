import { pipe } from 'fp-ts/function'
import { addChild, define } from '../../lib/dom/util.js'
import { fillColor, height, width } from '../../lib/dom/attributes.js'
import { createSvgRoot, createPath } from '../../lib/dom/element.js'
import { dumpSvgFile } from '../util.js'
import { commands, lineToAt, moveToAt } from '../../lib/dom/path.js'

const diamond = define(
  createPath,
  commands(
    moveToAt(3, 10),
    lineToAt(10, 0),
    lineToAt(17, 10),
    lineToAt(10, 20),
    lineToAt(3, 10)
  ),
  fillColor('red')
)

const root = define(createSvgRoot, width(20), height(20))

const graphic = pipe(root, addChild(diamond))

await dumpSvgFile(graphic, './examples/path-diamond/result.svg')
