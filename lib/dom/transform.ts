import * as A from 'fp-ts/Array'
import * as NA from 'fp-ts/NonEmptyArray'
import * as O from 'fp-ts/Option'
import * as S from 'fp-ts/string'
import * as Str from 'fp-ts-std/String'
import { pipe } from 'fp-ts/function'
import { setAttribute, setAttributeVector } from './attributes.js'

const wrapBrace = (value: string) => {
  return `(${value})`
}

const functionToString = (fnName: string) => (value: string) => {
  return S.Monoid.concat(fnName, wrapBrace(value))
}

const transformToString = (
  fnName: string,
  values: Array<number | undefined>
) => {
  return pipe(
    values,
    A.filterMap(O.fromNullable),
    A.map(Str.fromNumber),
    Str.unwords,
    functionToString(fnName)
  )
}

export const translate = (x: number, y?: number) => (stack: string[]) => {
  return pipe(stack, A.append(transformToString('translate', [x, y])))
}

export const rotate =
  (angle: number, originX?: number, originY?: number) => (stack: string[]) => {
    return pipe(
      stack,
      A.append(transformToString('rotate', [angle, originX, originY]))
    )
  }

export const scale = (x: number, y?: number) => (stack: string[]) => {
  return pipe(stack, A.append(transformToString('scale', [x, y])))
}

export const skewX = (angle: number) => (stack: string[]) => {
  return pipe(stack, A.append(transformToString('skewX', [angle])))
}

export const skewY = (angle: number) => (stack: string[]) => {
  return pipe(stack, A.append(transformToString('skewY', [angle])))
}

export const transformOrigin = <E extends SVGElement>(x: number, y: number) => {
  return setAttributeVector<E>('transform-origin')([x, y])
}

export const transform = <E extends SVGElement>(
  ...setters: Array<(stack: string[]) => NA.NonEmptyArray<string>>
) => {
  return pipe(
    setters,
    A.reduce(A.of(''), (stack, setter) => {
      return pipe(stack, setter)
    }),
    Str.unwords,
    S.trim,
    setAttribute<E>('patternTransform')
  )
}

export const patternTransform = transform
