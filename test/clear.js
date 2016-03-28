const test = require('tape')
const Node = require('../')

test('#clear()', function (t) {
  const child1 = Node({ id: 1 })
  const child2 = Node({ id: 2 })
  const child3 = Node({ id: 3 })
  const root = Node().add(child1, child2, child3)

  t.equal(root.children.length, 3, 'three children initially')
  t.equal(root.children[0].data.id, 1, 'id matches')
  t.equal(root.children[1].data.id, 2, 'id matches')
  t.equal(root.children[2].data.id, 3, 'id matches')
  t.equal(child1.parent, root, 'parent is root')
  t.equal(child2.parent, root, 'parent is root')
  t.equal(child3.parent, root, 'parent is root')

  root.clear()

  t.equal(root.children, null, 'no children')
  t.equal(child1.parent, null, 'parent is null')
  t.equal(child2.parent, null, 'parent is null')
  t.equal(child3.parent, null, 'parent is null')

  t.end()
})
