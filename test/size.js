const test = require('tape')
const Node = require('../')

test('#size()', function (t) {
  var a, b, c, d

  const root = Node().add(
    Node(),
    Node().add(
      d = Node().add(
        Node().add(
          a = Node(),
          b = Node()
        )
      )
    ),
    c = Node().add(
      Node(),
      Node()
    )
  )

  t.equal(root.size(), 9, '9 nodes initially')
  a.parent.remove(a)
  t.equal(root.size(), 8, '8 remaining')
  b.parent.remove(b)
  t.equal(root.size(), 7, '7 remaining')
  c.parent.remove(c)
  t.equal(root.size(), 4, '4 remaining')
  d.parent.remove(d)
  t.equal(root.size(), 2, '2 remaining')
  t.end()
})
