import * as R from 'fp-ts/ReaderIO'
import { pipe } from 'fp-ts/function'

const createNS = <T extends keyof SVGElementTagNameMap>(tagName: T) => {
  return R.asks((document: Document) => {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      tagName
    )
    return element
  })
}

export const createSvgRoot = createNS('svg')
export const createEllipse = createNS('ellipse')
export const createCircle = createNS('circle')
export const createRect = createNS('rect')
export const createLine = createNS('line')
export const createPolyline = createNS('polyline')
export const createPolygon = createNS('polygon')
export const createGroup = createNS('g')
export const createDefs = createNS('defs')
export const createPath = createNS('path')

const withAddId =
  <E extends SVGElement>(element: R.ReaderIO<Document, E>) =>
  (id: string) => {
    return pipe(
      element,
      R.map((element) => {
        element.setAttribute('id', id)
        return element
      })
    )
  }

export const createMarker = withAddId(createNS('marker'))
export const createPattern = withAddId(createNS('pattern'))
