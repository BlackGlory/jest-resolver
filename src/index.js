function resolver(path, options) {
  const { defaultResolver } = options

  try {
    return defaultResolver(path, options)
  } catch {
    return defaultResolver(processPath(path), options)
  }
}

function processPath(path) {
  return path
    .replace(/\.js$/, '.ts')
    .replace(/node:/, '')
}

module.exports = resolver
