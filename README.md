# display-tree

A JavaScript tree implementation designed to be efficiently "flattened" and sorted. Built with realtime rendering in mind, and forms the generic part of [`scene-tree`](http://npmjs.com/package/scene-tree).

## API

### `node = Node(data)`

Creates a new node. `data` is an optional object that may be supplied for assigning additional data to a node: in most cases, you'll want to include some basic information about the node using this.

``` javascript
var Node = require('display-tree')

var node = Node({
  position: [0, 1, 0],
  color: [1, 0, 1, 1]
})
```

### `node.data`

The data you supplied when creating the node is made accessible here.

``` javascript
var node = Node({
  position: [0, 1, 0],
  color: [1, 0, 1, 1]
})

console.log(node.data.position) // [0, 1, 0]
console.log(node.data.color) // [1, 0, 1, 1]
```

### `node.add(children...)`

Adds one or more `children` to a given `node`. Accepts a single node, an array of nodes, or a mixture of both across multiple arguments.

``` javascript
var root = Node()

root.add(Node())
root.add([Node(), Node(), Node()])
root.add(Node(), Node(), Node())
```

### `node.addOne(child)`

`node.add()` without any of the sugar: adds a single `child` node.

``` javascript
var root = Node()

root.addOne(Node())
```

### `node.remove(child)`

Removes `child` from `node`, if applicable.

``` javascript
var root = Node()
var child = Node()

root.add(child)
root.remove(child)
```

### `node.clear()`

Removes any children attached to the given `node`.

``` javascript
var root = Node()

root.add(Node())
root.add(Node())
console.log(root.children.length) // 2
root.clear()
console.log(root.children.length) // 0
```

### `node.each(visitor)`

Calls the `visitor` function on each descendent node in the tree (depth first,
pre-order). Note that `visitor` is not called on `node` itself.

``` javascript
var root = Node({ id: 0 }).add(
  Node({ id: 1 }),
  Node({ id: 2 }),
  Node({ id: 3 }).add(
    Node({ id: 4 }),
    Node({ id: 5 })
  ),
)

root.each(function visitor (node) {
  console.log(node.data.id)
})

// 1
// 2
// 3
// 4
// 5
```

### `node.findup(visitor)`

Walks up the tree from `node` until hitting the root element, calling `visitor` on each node along the way.

``` javascript
var child = Node({ id: 0 })
var root = Node({ id: 1 })

root.add(
  Node({ id: 2 }).add(Node({ id: 3 })),
  Node({ id: 4 }).add(child),
)

child.findup(function visitor (node) {
  console.log(node.data.id)
})

// 4
// 1
```

### `node.flat(output)`

Returns a flat array of all the child nodes in a tree.

``` javascript
var root = Node({ id: 0 }).add(
  Node({ id: 1 }),
  Node({ id: 2 }),
  Node({ id: 3 }).add(
    Node({ id: 4 }),
    Node({ id: 5 })
  ),
)

var ids = root.flat().map(d => d.data.id)
console.log(ids) // [0, 1, 2, 3, 4, 5]
```

### `node.size()`

Gets the total number of descendent nodes of `node`, not including `node` itself:

``` javascript
var root = Node({ id: 0 }).add(
  Node({ id: 1 }),
  Node({ id: 2 }),
  Node({ id: 3 }).add(
    Node({ id: 4 }),
    Node({ id: 5 })
  ),
)

console.log(root.size()) // 5
```

### `getNodeList = node.list([sortFunction])`

Returns a function that sorts descendent nodes only as required using `sortFunction`, returning a flat array of the results. This is the preferred way to iterate over the elements in the tree when you're ready to render them.

``` javascript
var root = Node()
var getNodeList = root.list()

root.add(Node(), Node(), Node())

function render () {
  var nodes = getNodeList()

  for (var i = 0; i < nodes.length; i++) {
    draw(nodes[i])
  }
}
```

### `node.resetLists()`

Call this on a node whenever something has occurred that would change its sort order, e.g. its position has been changed. This will reset any existing lists to sort their contents again, provided the root node is an ancestor of `node`.
