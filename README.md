# pathie
Object path helpers

```javascript
const pathie = require('pathie')

const store = {}

pathie.set(store, [2, 6], 'Hello')
pathie.set(store, [2, 7], 'Goodbye')

console.log(store)
console.log(pathie.get(store, [2, 6]))
console.log(pathie.get(store, [2, 7]))
console.log(pathie.get(store, [2, 8]))

pathie.del(store, [2, 7])

console.log(store)
console.log(pathie.get(store, [2, 6]))
console.log(pathie.get(store, [2, 7]))
console.log(pathie.get(store, [2, 8]))

console.log(pathie.getorset(store, [2, 6], 'Fantastic'))
console.log(pathie.getorset(store, [2, 7], 'Goodbye'))

console.log(pathie.assign(store, [2, 6], (s) => s + ' World'))
console.log(pathie.assign(store, [2, 6], (s) => s + ' World'))
```
