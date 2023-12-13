import * as IO from 'fp-ts/IO'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

export const shared =
  <E extends SVGElement>(...setter: Array<(element: E) => IO.IO<E>>) =>
  (element: E) => {
    return pipe(
      setter,
      A.map((f) => f(element)),
      A.sequence(IO.Applicative),
      IO.map(() => element)
    )
  }

export const useShared =
  <E extends SVGElement>(shared: (element: E) => IO.IO<E>) =>
  (element: E) => {
    return shared(element)
  }
