const test = require('tape')
const Node = require('../')

test('#sort()', function (t) {
  const root = Node({ id: 1 }).add(
    Node({ id: 3 }).add(
      Node({ id: 7 }),
      Node({ id: 9 })
    ),
    Node({ id: 2 }),
    Node({ id: 5 }).add(
      Node({ id: 8 }).add(
        Node({ id: 6 })
      )
    ),
    Node({ id: 4 }),
    Node({ id: 10 })
  )

  var didFire = false
  const sortById = root.sort(function (a, b) {
    didFire = true
    return getId(a) - getId(b)
  })

  const id1 = sortById().map(getId).slice()
  t.deepEqual(id1, [2, 3, 4, 5, 6, 7, 8, 9, 10], 'sorts nodes, disregarding heirarchy')
  t.ok(didFire, 'sort function fired')

  didFire = false
  const id2 = sortById().map(getId).slice()
  t.deepEqual(id1, id2, 'results of sort 1 and sort 2 are equivalent')
  t.notOk(didFire, 'sort function did not fire')

  root.add(Node({ id: 11 }).add(Node({ id: 1 })))

  didFire = false
  const id3 = sortById().map(getId).slice()
  t.deepEqual(id3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'sorts nodes again, including new entries')
  t.ok(didFire, 'sort function fired')

  didFire = false
  sortById().map(getId).slice()
  t.notOk(didFire, 'sort function does not fire before flushing')
  sortById.flush()
  sortById().map(getId).slice()
  t.ok(didFire, 'sort function fired after flushing')

  root.each(function (node) {
    console.log(node.sortVersion)
  })

  t.end()
})

function getId (d) {
  return d.data.id
}
