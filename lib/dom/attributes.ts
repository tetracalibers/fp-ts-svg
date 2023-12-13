import * as IO from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as S from 'fp-ts/string'
import * as Str from 'fp-ts-std/String'
import * as F from 'fp-ts-std/Function'

export const setAttribute =
  <E extends SVGElement>(name: string) =>
  (value: string) =>
  (element: E): IO.IO<E> =>
  () => {
    element.setAttribute(name, value)
    return element
  }

export const setAttributeNumber =
  <E extends SVGElement>(name: string) =>
  (value: number) => {
    return setAttribute<E>(name)(Str.fromNumber(value))
  }

export const setAttributeVector =
  <E extends SVGElement>(name: string) =>
  (value: number[]) => {
    return pipe(
      value,
      A.map(Str.fromNumber),
      Str.unwords,
      setAttribute<E>(name)
    )
  }

export const setAttributeNumbers =
  <E extends SVGElement>(names: string[]) =>
  (values: number[]) => {
    const setters = pipe(
      A.zip(names, values),
      A.map(F.uncurry2(setAttributeNumber<E>))
    )
    return (element: E) => {
      return pipe(
        setters,
        A.map((setter) => setter(element)),
        A.sequence(IO.Applicative),
        IO.map(() => element)
      )
    }
  }

export const fillColor = <E extends SVGElement>(color: string) => {
  return setAttribute<E>('fill')(color)
}

export const fill = fillColor

export const fillPattern = <E extends SVGElement>(id: string) => {
  return setAttribute<E>('fill')(`url(#${id})`)
}

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

export const roundX = <E extends SVGRectElement>(rx: number) => {
  return setAttributeNumber<E>('rx')(rx)
}

export const roundY = <E extends SVGRectElement>(ry: number) => {
  return setAttributeNumber<E>('ry')(ry)
}

export const radiusXY = <E extends SVGEllipseElement>(
  rx: number,
  ry: number
) => {
  return setAttributeNumbers<E>(['rx', 'ry'])([rx, ry])
}

export const radius = setAttributeNumber<SVGCircleElement>('r')

export const center = <E extends SVGCircleElement | SVGEllipseElement>(
  x: number,
  y: number
) => {
  return setAttributeNumbers<E>(['cx', 'cy'])([x, y])
}

type HasViewboxElement = SVGSVGElement | SVGPatternElement

export const viewbox = <E extends HasViewboxElement>(
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return setAttribute<E>('viewBox')(`${x} ${y} ${width} ${height}`)
}

export const viewBox = viewbox

type HasSizeElement = SVGSVGElement | SVGRectElement | SVGPatternElement

export const width = <E extends HasSizeElement>(width: number | string) => {
  return pipe(
    S.isString(width) ? width : Str.fromNumber(width),
    setAttribute<E>('width')
  )
}

export const height = <E extends HasSizeElement>(height: number | string) => {
  return pipe(
    S.isString(height) ? height : Str.fromNumber(height),
    setAttribute<E>('height')
  )
}

export const size = <E extends HasSizeElement>(
  width: number,
  height: number
) => {
  return setAttributeNumbers<E>(['width', 'height'])([width, height])
}

export const position = <E extends SVGRectElement>(x: number, y: number) => {
  return setAttributeNumbers<E>(['x', 'y'])([x, y])
}

export const from = <E extends SVGLineElement>(x: number, y: number) => {
  return setAttributeNumbers<E>(['x1', 'y1'])([x, y])
}

export const to = <E extends SVGLineElement>(x: number, y: number) => {
  return setAttributeNumbers<E>(['x2', 'y2'])([x, y])
}
