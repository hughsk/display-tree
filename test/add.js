const test = require('tape')
const Node = require('../')

test('#add(a)', function (t) {
  const root = Node().add(Node({ id: 1 }))

  t.equal(root.children.length, 1, 'one child after adding')
  t.equal(root.children[0].data.id, 1, 'id matches')
  t.equal(root.children[0].parent, root, 'parent matches')
  t.end()
})

test('#add(a, b)', function (t) {
  const root = Node().add(
    Node({ id: 1 }),
    Node({ id: 2 })
  )

  t.equal(root.children.length, 2, 'two children after adding')
  t.equal(root.children[0].data.id, 1, 'id matches')
  t.equal(root.children[1].data.id, 2, 'id matches')
  t.equal(root.children[0].parent, root, 'parent matches')
  t.equal(root.children[1].parent, root, 'parent matches')
  t.end()
})

test('#add([a])', function (t) {
  const root = Node().add(
    [
      Node({ id: 1 }),
      Node({ id: 2 })
    ]
  )

  t.equal(root.children.length, 2, 'two children after adding')
  t.equal(root.children[0].data.id, 1, 'id matches')
  t.equal(root.children[1].data.id, 2, 'id matches')
  t.equal(root.children[0].parent, root, 'parent matches')
  t.equal(root.children[1].parent, root, 'parent matches')
  t.end()
})

test('#add([a], b)', function (t) {
  const root = Node().add(
    [
      Node({ id: 1 }),
      Node({ id: 2 })
    ],
    Node({ id: 3 })
  )

  t.equal(root.children.length, 3, 'three children after adding')
  t.equal(root.children[0].data.id, 1, 'id matches')
  t.equal(root.children[1].data.id, 2, 'id matches')
  t.equal(root.children[2].data.id, 3, 'id matches')
  t.equal(root.children[0].parent, root, 'parent matches')
  t.equal(root.children[1].parent, root, 'parent matches')
  t.equal(root.children[2].parent, root, 'parent matches')
  t.end()
})

test('#add(a, [b])', function (t) {
  const root = Node().add(
    Node({ id: 1 }),
    [
      Node({ id: 2 }),
      Node({ id: 3 })
    ]
  )

  t.equal(root.children.length, 3, 'three children after adding')
  t.equal(root.children[0].data.id, 1, 'id matches')
  t.equal(root.children[1].data.id, 2, 'id matches')
  t.equal(root.children[2].data.id, 3, 'id matches')
  t.equal(root.children[0].parent, root, 'parent matches')
  t.equal(root.children[1].parent, root, 'parent matches')
  t.equal(root.children[2].parent, root, 'parent matches')
  t.end()
})

test('#add([a], [b])', function (t) {
  const root = Node().add(
    [
      Node({ id: 1 }),
      Node({ id: 2 })
    ],
    [
      Node({ id: 3 }),
      Node({ id: 4 })
    ]
  )

  t.equal(root.children.length, 4, 'four children after adding')
  t.equal(root.children[0].data.id, 1, 'id matches')
  t.equal(root.children[1].data.id, 2, 'id matches')
  t.equal(root.children[2].data.id, 3, 'id matches')
  t.equal(root.children[3].data.id, 4, 'id matches')
  t.equal(root.children[0].parent, root, 'parent matches')
  t.equal(root.children[1].parent, root, 'parent matches')
  t.equal(root.children[2].parent, root, 'parent matches')
  t.equal(root.children[3].parent, root, 'parent matches')
  t.end()
})

test('#add(a, a)', function (t) {
  const child = Node()
  const root = Node().add(child, child)

  t.equal(child.parent, root, 'parent matches')
  t.equal(root.children.length, 1, 'only one child added')
  t.end()
})
