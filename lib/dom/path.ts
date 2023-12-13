import { pipe } from 'fp-ts/lib/function.js'
import * as A from 'fp-ts/Array'
import * as Arr from 'fp-ts-std/Array'
import * as Str from 'fp-ts-std/String'
import { StackSetters, setAttributeList } from './attributes.js'

const commandToString = (command: string, ...list: number[]) => {
  return pipe(list, A.map(Str.fromNumber), Arr.join(','), Str.prepend(command))
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

export const commands = <E extends SVGPathElement>(
  ...setters: StackSetters<string>
) => {
  return setAttributeList<E>('d')(...setters)
}
