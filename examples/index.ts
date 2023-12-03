import * as Circle from './circle/index.js'
import * as Ellipse from './ellipse/index.js'
import * as Rect from './rect/index.js'
import * as Line from './line/index.js'
import * as Polyline from './polyline/index.js'
import * as Polygon from './polygon/index.js'

import { dumpSvgFile } from './util.js'

const graphics = [
  {
    path: './examples/circle/circle.svg',
    render: Circle.graphic,
  },
  {
    path: './examples/ellipse/ellipse.svg',
    render: Ellipse.graphic,
  },
  {
    path: './examples/rect/rect.svg',
    render: Rect.graphic,
  },
  {
    path: './examples/line/line.svg',
    render: Line.graphic,
  },
  {
    path: './examples/polyline/polyline.svg',
    render: Polyline.graphic,
  },
  {
    path: './examples/polygon/polygon.svg',
    render: Polygon.graphic,
  },
]

await Promise.all(
  graphics.map(async ({ path, render }) => await dumpSvgFile(render, path))
)
