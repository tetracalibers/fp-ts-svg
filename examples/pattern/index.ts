import { pipe } from 'fp-ts/function'
import { addChild, children, define, defs } from '../../lib/dom/util.js'
import {
  center,
  fill,
  fillOpacity,
  fillPattern,
  height,
  radius,
  size,
  viewBox,
  width,
} from '../../lib/dom/attributes.js'
import {
  createSvgRoot,
  createCircle,
  createPattern,
  createRect,
} from '../../lib/dom/element.js'
import { patternTransform, translate } from '../../lib/dom/transform.js'
import { dumpSvgFile } from '../util.js'
import { shared, useShared } from '../../lib/dom/share.js'

const rect = define(
  createRect,
  width('100%'),
  height('100%'),
  fill('hsl(150, 60%, 74%)')
)

const circleBase = shared<SVGCircleElement>(center(20, 20))

const circleL = define(
  createCircle,
  useShared(circleBase),
  radius(15),
  fill('hsl(180, 60%, 24%)'),
  fillOpacity(0.5)
)

const circleM = define(
  createCircle,
  useShared(circleBase),
  radius(9),
  fill('hsl(180, 60%, 24%)'),
  fillOpacity(0.75)
)

const circleS = define(
  createCircle,
  useShared(circleBase),
  radius(3),
  fill('hsl(180, 60%, 14%)')
)

const pattern = pipe(
  define(
    createPattern('my-pattern'),
    size(0.25, 0.25),
    viewBox(0, 0, 40, 40),
    patternTransform(translate(0, 100))
  ),
  children(rect, circleL, circleM, circleS)
)

const container = define(
  createCircle,
  center(400, 400),
  radius(300),
  fillPattern('my-pattern')
)

const root = pipe(define(createSvgRoot, viewBox(0, 0, 800, 800)), defs(pattern))

const graphic = pipe(root, addChild(container))

await dumpSvgFile(graphic, './examples/pattern/pattern.svg')
