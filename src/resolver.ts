import resolve from 'enhanced-resolve'
import { SyncResolver } from 'jest-resolve'

export const resolver: SyncResolver = (path, options) => {
  const { defaultResolver } = options

  try {
    return defaultResolver(path, options)
  } catch {
    try {
      return defaultResolver(removeNodePrefix(replaceJsToTs(path)), options)
    } catch (e) {
      const result = resolve.sync(options.basedir, path)
      if (result) {
        return result
      } else {
        throw e
      }
    }
  }
}

function replaceJsToTs(path: string): string {
  return path.replace(/\.js$/, '.ts')
}

function removeNodePrefix(path: string): string {
  return path.replace(/^node:/, '')
}
