import { fromNumber } from 'fp-ts-std/String'
import * as IO from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'
import * as RI from 'fp-ts/ReaderIO'

export const setAttribute =
  <E extends SVGElement>(name: string) =>
  (value: string) =>
  (element: E): IO.IO<E> =>
  () => {
    element.setAttribute(name, value)
    return element
  }

const setAttributeNumber =
  <E extends SVGElement>(name: string) =>
  (value: number) => {
    return setAttribute<E>(name)(fromNumber(value))
  }

export const fillColor = <E extends SVGElement>(color: string) => {
  return setAttribute<E>('fill')(color)
}

export const fill = fillColor

export const fillOpacity = <E extends SVGElement>(opacity: number) => {
  return setAttributeNumber<E>('fill-opacity')(opacity)
}

export const strokeColor = <E extends SVGElement>(color: string) => {
  return setAttribute<E>('stroke')(color)
}

export const stroke = strokeColor

export const strokeOpacity = <E extends SVGElement>(opacity: number) => {
  return setAttributeNumber<E>('stroke-opacity')(opacity)
}

export const strokeWidth = <E extends SVGElement>(width: number) => {
  return setAttributeNumber<E>('stroke-width')(width)
}

export const radiusXY = <E extends SVGEllipseElement>(
  rx: number,
  ry: number
) => {
  return pipe(
    setAttributeNumber<E>('rx')(rx),
    RI.flatMapIO(setAttributeNumber<E>('ry')(ry))
  )
}

export const radius = setAttributeNumber<SVGCircleElement>('r')

export const center = <E extends SVGCircleElement | SVGEllipseElement>(
  x: number,
  y: number
) => {
  return pipe(
    setAttributeNumber<E>('cx')(x),
    RI.flatMapIO(setAttributeNumber<E>('cy')(y))
  )
}

export const viewbox = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return setAttribute<SVGSVGElement>('viewBox')(`${x} ${y} ${width} ${height}`)
}

export const width = <E extends SVGSVGElement | SVGRectElement>(
  width: number
) => {
  return setAttributeNumber<E>('width')(width)
}

export const height = <E extends SVGSVGElement | SVGRectElement>(
  height: number
) => {
  return setAttributeNumber<E>('height')(height)
}

export const size = <E extends SVGSVGElement | SVGRectElement>(
  _width: number,
  _height: number
) => {
  return pipe(width<E>(_width), RI.flatMapIO(height<E>(_height)))
}

export const position = <E extends SVGRectElement>(x: number, y: number) => {
  return pipe(
    setAttributeNumber<E>('x')(x),
    RI.flatMapIO(setAttributeNumber<E>('y')(y))
  )
}

export const from = <E extends SVGLineElement>(x: number, y: number) => {
  return pipe(
    setAttributeNumber<E>('x1')(x),
    RI.flatMapIO(setAttributeNumber<E>('y1')(y))
  )
}

export const to = <E extends SVGLineElement>(x: number, y: number) => {
  return pipe(
    setAttributeNumber<E>('x2')(x),
    RI.flatMapIO(setAttributeNumber<E>('y2')(y))
  )
}
