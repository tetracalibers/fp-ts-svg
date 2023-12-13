import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as NA from 'fp-ts/NonEmptyArray'
import * as Arr from 'fp-ts-std/Array'
import * as S from 'fp-ts/string'
import * as Str from 'fp-ts-std/String'
import { setAttribute } from './attributes.js'

type Point = [number, number]
type HasPointsElement = SVGPolylineElement | SVGPolygonElement

const pointToString = (point: Point) =>
  pipe(point, A.map(Str.fromNumber), Arr.join(','))

export const moveTo = (x: number, y: number) => (stack: string[]) => {
  return pipe(stack, A.append(pointToString([x, y])))
}

export const lineTo = moveTo

export const points = <E extends HasPointsElement>(
  ...setters: Array<(stack: string[]) => NA.NonEmptyArray<string>>
) => {
  return pipe(
    setters,
    A.reduce(A.of(''), (stack, setter) => {
      return pipe(stack, setter)
    }),
    Str.unwords,
    S.trim,
    setAttribute<E>('points')
  )
}
