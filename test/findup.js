const test = require('tape')
const Node = require('../')

test('#findup(fn)', function (t) {
  const needle = Node()
  const root = Node({ id: 4 }).add(
    Node({ id: 3 }).add(
      Node(),
      Node({ id: 2 }).add(
        Node(),
        Node(),
        Node({ id: 1 }).add(needle)
      ),
      Node()
    )
  )

  var i = 0

  t.plan(4)
  needle.findup(function (node) {
    t.equal(node.data.id, ++i)
  })
})

test('#findup(fn) [early bailing]', function (t) {
  const needle = Node()
  const root = Node({ id: 4 }).add(
    Node({ id: 3 }).add(
      Node(),
      Node({ id: 2 }).add(
        Node(),
        Node(),
        Node({ id: 1 }).add(needle)
      ),
      Node()
    )
  )

  var i = 0

  t.plan(2)
  needle.findup(function (node) {
    t.equal(node.data.id, ++i)
    if (i === 2) return false
  })
})
