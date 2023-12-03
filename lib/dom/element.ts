import * as R from 'fp-ts/ReaderIO'

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
