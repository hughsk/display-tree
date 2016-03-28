const test = require('tape')
const Node = require('../')

test('#each(fn) [one level]', function (t) {
  const root = Node().add(
    Node({ id: 1 }),
    Node({ id: 2 }),
    Node({ id: 3 })
  )

  var i = 0

  t.plan(3)
  root.each(function (node) {
    t.equal(node.data.id, ++i)
  })
})

test('#each(fn) [two level]', function (t) {
  const root = Node().add(
    Node({ id: 1 }),
    Node({ id: 2 }).add(
      Node({ id: 3 })
    ),
    Node({ id: 4 }).add(
      Node({ id: 5 }),
      Node({ id: 6 })
    )
  )

  var i = 0

  t.plan(6)
  root.each(function (node) {
    t.equal(node.data.id, ++i)
  })
})

test('#each(fn) [three level]', function (t) {
  const root = Node().add(
    Node({ id: 1 }),
    Node({ id: 2 }).add(
      Node({ id: 3 })
    ),
    Node({ id: 4 }).add(
      Node({ id: 5 }).add(
        Node({ id: 6 }),
        Node({ id: 7 }),
        Node({ id: 8 })
      ),
      Node({ id: 9 })
    )
  )

  var i = 0

  t.plan(9)
  root.each(function (node) {
    t.equal(node.data.id, ++i)
  })
})

test('#each(fn) [early bailing]', function (t) {
  const root = Node().add(
    Node({ id: 1 }),
    Node({ id: 2, bail: true }).add(
      Node({ id: 0 })
    ),
    Node({ id: 3 }).add(
      Node({ id: 4, bail: true }).add(
        Node({ id: 0 }),
        Node({ id: 0 }),
        Node({ id: 0 })
      ),
      Node({ id: 5 })
    )
  )

  var i = 0

  t.plan(5)
  root.each(function (node) {
    t.equal(node.data.id, ++i)
    if (node.data.bail) return false
  })
})
