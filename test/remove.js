const test = require('tape')
const Node = require('../')

test('#remove(a)', function (t) {
  const child1 = Node({ id: 1 })
  const child2 = Node({ id: 2 })
  const root = Node().add(child1, child2)

  t.equal(root.children.length, 2, 'two children initially')
  t.equal(root.children[0].data.id, 1, 'id matches')
  t.equal(root.children[1].data.id, 2, 'id matches')
  t.equal(child1.parent, root, 'parent is root')
  t.equal(child2.parent, root, 'parent is root')

  root.remove(child1)

  t.equal(root.children.length, 1, 'one child after removal')
  t.equal(root.children[0].data.id, 2, 'id matches')
  t.equal(child1.parent, null, 'parent is null')
  t.equal(child2.parent, root, 'parent is root')

  root.remove(child1)

  t.equal(root.children.length, 1, 'missing children have no impact on removal')
  t.equal(root.children[0].data.id, 2, 'id matches')

  root.remove(child2)

  t.equal(root.children.length, 0, 'no children remaining after final removal')
  t.equal(child1.parent, null, 'parent is null')
  t.equal(child2.parent, null, 'parent is null')
  t.end()
})
