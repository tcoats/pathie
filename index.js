const visit = (object, path, fn) => {
  const length = path.length
  const lastIndex = length - 1
  let index = -1

  while (object != null && ++index < length) {
    const key = path[index]
    if (index == lastIndex) return fn(object, key)
    if (object[key] === undefined) object[key] = {}
    object = object[key]
  }
}

const get = (object, path) =>
  visit(object, path, (object, key) =>
    object[key])

const getorset = (object, path, value) =>
  visit(object, path, (object, key) => {
    if (!object[key]) object[key] = value
    return object[key]
  })

const set = (object, path, value) =>
  visit(object, path, (object, key) =>
    object[key] = value)

const assign = (object, path, fn) =>
  visit(object, path, (object, key) =>
    object[key] = fn(object[key]))

const del = (object, path) =>
  visit(object, path, (object, key) => {
    if (object[key] === undefined) return null
    const res = object[key]
    delete object[key]
    return res
  })

const flat = (object, depth) => {
  if (depth == 0) return [object]
  return Object.keys(object)
    .filter(key => object[key] != null)
    .map(key => flat(object[key], depth - 1)
      .map(r => [key].concat(r))).flat()
}

module.exports = { visit, get, getorset, set, assign, del, flat }
