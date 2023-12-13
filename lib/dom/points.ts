import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as Arr from 'fp-ts-std/Array'
import * as S from 'fp-ts/string'
import * as Str from 'fp-ts-std/String'
import * as O from 'fp-ts/Option'
import { StackSetters, setAttributeList } from './attributes.js'

type HasPointsElement = SVGPolylineElement | SVGPolygonElement

const pointToString = (point: number[]) =>
  pipe(point, A.map(Str.fromNumber), Arr.join(','))

// absolute
export const at = (x: number, y: number) => (stack: string[]) => {
  return pipe(stack, A.append(pointToString([x, y])))
}

// relative
export const fromTo = (x: number, y: number) => (stack: string[]) => {
  const previous = pipe(
    stack,
    A.last,
    O.match(
      () => [0, 0],
      (pointStr) =>
        pipe(
          pointStr,
          S.split(','),
          Arr.fromReadonly,
          A.reduce<string, number[]>([], (a, b) => [...a, Number(b)])
        )
    )
  )
  const now = pipe(
    previous,
    A.zip([x, y]),
    A.map(([prev, curr]) => prev + curr)
  )
  return pipe(stack, A.append(pointToString(now)))
}

export const points = <E extends HasPointsElement>(
  ...setters: StackSetters<string>
) => {
  return setAttributeList<E>('points')(...setters)
}
