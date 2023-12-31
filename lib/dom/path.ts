import { pipe } from 'fp-ts/lib/function.js'
import * as A from 'fp-ts/Array'
import * as Arr from 'fp-ts-std/Array'
import * as Str from 'fp-ts-std/String'
import * as O from 'fp-ts/Option'
import { StackSetters, setAttributeList } from './attributes.js'

type Point = [number, number]

const joinByComma = (list: number[]) => {
  return pipe(list, A.map(Str.fromNumber), Arr.join(','))
}

const commandToString = (command: string, ...list: number[]) => {
  return pipe(list, joinByComma, Str.prepend(command))
}

const joinBySpace = (list: string[]) => {
  return pipe(list, Arr.join(' '))
}

const listCommandToString = (commandName: string, points: Point[]) => {
  return pipe(
    points,
    A.map((point) => joinByComma(point)),
    joinBySpace,
    Str.prepend(commandName)
  )
}

export const moveToAt = (x: number, y: number) => (stack: string[]) => {
  return pipe(stack, A.append(commandToString('M', x, y)))
}

export const moveTo = (x: number, y: number) => (stack: string[]) => {
  return pipe(stack, A.append(commandToString('m', x, y)))
}

export const lineToAt = (x: number, y: number) => (stack: string[]) => {
  return pipe(stack, A.append(commandToString('L', x, y)))
}

export const lineTo = (x: number, y: number) => (stack: string[]) => {
  return pipe(stack, A.append(commandToString('l', x, y)))
}

export const lineToAtPoints =
  (...points: Point[]) =>
  (stack: string[]) => {
    return pipe(stack, A.append(listCommandToString('L', points)))
  }

export const lineToPoints =
  (...points: Point[]) =>
  (stack: string[]) => {
    return pipe(stack, A.append(listCommandToString('l', points)))
  }

export const hLineToAt = (x: number) => (stack: string[]) => {
  return pipe(stack, A.append(commandToString('H', x)))
}

export const vLineToAt = (y: number) => (stack: string[]) => {
  return pipe(stack, A.append(commandToString('V', y)))
}

export const hLineTo = (x: number) => (stack: string[]) => {
  return pipe(stack, A.append(commandToString('h', x)))
}

export const vLineTo = (y: number) => (stack: string[]) => {
  return pipe(stack, A.append(commandToString('v', y)))
}

export const close = () => (stack: string[]) => {
  const isPrevRelative = pipe(
    stack,
    A.last,
    O.match(
      () => false,
      (s) =>
        pipe(
          s,
          Str.head,
          O.map((c) => Str.isLower(c)),
          O.getOrElse(() => false)
        )
    )
  )
  const command = isPrevRelative ? 'z' : 'Z'
  return pipe(stack, A.append(command))
}

export const commands = <E extends SVGPathElement>(
  ...setters: StackSetters<string>
) => {
  return setAttributeList<E>('d')(...setters)
}
