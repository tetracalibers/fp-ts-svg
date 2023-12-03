import * as fs from 'fs/promises'
import * as Console from 'fp-ts/Console'
import * as T from 'fp-ts/TaskEither'
import * as IO from 'fp-ts/IO'
import { JSDOM } from 'jsdom'
import { pipe } from 'fp-ts/lib/function.js'
import { getOuterHTML } from '../lib/dom/util.js'

const writeFile = (path: string) => (contents: string) => {
  return T.tryCatch(
    () => fs.writeFile(path, contents),
    (reason) => Console.error(reason)
  )
}

export const dumpSvgFile = (
  render: (document: Document) => IO.IO<SVGSVGElement>,
  path: string
) => {
  const window = new JSDOM()
  const document = window.window.document

  return pipe(
    render(document),
    IO.map(getOuterHTML),
    IO.chain(writeFile(path))
  )()
}
