import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as Arr from 'fp-ts-std/Array'
import * as Str from 'fp-ts-std/String'
import { StackSetters, setAttributeList } from './attributes.js'

type Point = [number, number]
type HasPointsElement = SVGPolylineElement | SVGPolygonElement

const pointToString = (point: Point) =>
  pipe(point, A.map(Str.fromNumber), Arr.join(','))

export const moveTo = (x: number, y: number) => (stack: string[]) => {
  return pipe(stack, A.append(pointToString([x, y])))
}

export const lineTo = moveTo

export const points = <E extends HasPointsElement>(
  ...setters: StackSetters<string>
) => {
  return setAttributeList<E>('points')(...setters)
}
