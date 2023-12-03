import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as Arr from 'fp-ts-std/Array'
import * as S from 'fp-ts/string'
import * as Str from 'fp-ts-std/String'
import * as ST from 'fp-ts/State'
import { setAttribute } from './attributes.js'

type Point = [number, number]
type HasPointsElement = SVGPolylineElement | SVGPolygonElement

/**
export interface State<S, A> {
  // 初期状態 => [出力, 新しい状態]
  (s: S): [A, S]
}
 */

const pointToString = (point: Point) =>
  pipe(point, A.map(Str.fromNumber), Arr.join(','))

const pointsToString = (points: Point[]) => {
  const concat = (a: string, b: string) => pipe([a, b], Arr.join(' '))
  const monoid = { concat, empty: '' }
  return pipe(points, A.foldMap(monoid)(pointToString), S.trim)
}

export const moveTo =
  (x: number, y: number) =>
  <E extends HasPointsElement>(_element: E): ST.State<E, Point[]> => {
    return ST.of([[x, y]])
  }

export const lineTo =
  (x: number, y: number) =>
  <E extends HasPointsElement>(state: ST.State<E, Point[]>) => {
    return pipe(
      state,
      ST.map((points) => pipe(points, A.append<Point>([x, y])))
    )
  }

export const points =
  <E extends HasPointsElement>(reducer: (element: E) => ST.State<E, Point[]>) =>
  (element: E) => {
    const setter = pipe(
      reducer(element),
      ST.evaluate(element),
      pointsToString,
      setAttribute<E>('points')
    )
    return setter(element)
  }
