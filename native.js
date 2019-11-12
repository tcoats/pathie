const visit = (object, path, fn) => {
  const length = path.length
  const lastIndex = length - 1
  let index = -1

  while (object != null && ++index < length) {
    const key = path[index]
    if (index == lastIndex) return fn(object, key)
    if (!object.has(key)) object.set(key, new Map())
    object = object.get(key)
  }
}

const get = (object, path) =>
  visit(object, path, (object, key) =>
    object.get(key)

const getorset = (object, path, value) =>
  visit(object, path, (object, key) => {
    if (!object.has(key)) object.set(key, value)
    return object.get(key)
  })

const set = (object, path, value) =>
  visit(object, path, (object, key) =>
    object.set(key, value))

const assign = (object, path, fn) =>
  visit(object, path, (object, key) =>
    object.set(key, fn(object[key])))

const del = (object, path) =>
  visit(object, path, (object, key) => {
    if (!object.has(key)) return null
    const res = object.get(key)
    object.delete(key)
    return res
  })

const flat = (object, depth) => {
  if (depth == 0) return [[object]]
  const result = []
  for (const key of object.keys()) {
    if (object.get(key) == null) continue
    for (const row of flat(object.get(key), depth - 1))
      result.push([ key, ...row ])
  }
  return result
}

const build = (items) => {
  const res = {}
  for (let item of items) {
    const path = item.slice()
    const value = path.splice(-1)
    set(res, path, value[0])
  }
  return res
}

module.exports = {
  visit,
  get,
  getorset,
  set,
  assign,
  del,
  flat,
  build
}
