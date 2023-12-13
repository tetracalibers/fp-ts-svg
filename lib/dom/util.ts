import * as R from 'fp-ts/ReaderIO'
import * as O from 'fp-ts/Option'
import * as IO from 'fp-ts/IO'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { createDefs } from './element.js'

export const addChild =
  <P extends SVGElement, C extends SVGElement>(
    child: R.ReaderIO<Document, C>
  ) =>
  (parent: R.ReaderIO<Document, P>) => {
    return pipe(
      parent,
      R.chain((p) => {
        return pipe(
          child,
          R.map((c) => {
            p.appendChild(c)
            return p
          })
        )
      })
    )
  }

export const children =
  <P extends SVGElement>(
    ...children: Array<R.ReaderIO<Document, SVGElement>>
  ) =>
  (parent: R.ReaderIO<Document, P>) => {
    return pipe(
      children,
      A.sequence(R.Applicative),
      R.flatMap((childrenElement) => {
        return pipe(
          parent,
          R.map((p) => {
            return pipe(
              childrenElement,
              A.reduce(p, (p, c) => {
                p.appendChild(c)
                return p
              })
            )
          })
        )
      })
    )
  }

export const defs =
  <P extends SVGElement, C extends SVGElement>(
    ..._children: Array<R.ReaderIO<Document, C>>
  ) =>
  (parent: R.ReaderIO<Document, P>) => {
    const _defs = pipe(createDefs, children(..._children))
    return pipe(parent, addChild(_defs))
  }

export const getOuterHTML = (element: Element) => {
  return pipe(
    O.fromNullable(element.outerHTML),
    O.getOrElse(() => '')
  )
}

export const define = <E extends SVGElement>(
  create: R.ReaderIO<Document, E>,
  ...setter: Array<(element: E) => IO.IO<E>>
) => {
  return pipe(
    create,
    R.chainIOK((element) => {
      return pipe(
        setter,
        A.map((f) => f(element)),
        A.sequence(IO.Applicative),
        IO.map(() => element)
      )
    })
  )
}
