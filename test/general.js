const test = require('tape')
const Node = require('../')

test('empty node', function (t) {
  const root = Node()

  t.equal(root.size(), 0, 'size() === 0')
  t.deepEqual(root.flat(), [], 'flat().length === 0')
  t.deepEqual(root.data, {}, 'data ~= {}')
  t.deepEqual(root.parent, null, 'parent === null')
  t.end()
})

test('node data', function (t) {
  const root = Node({
    hello: 'world',
    lorem: 'ipsum'
  })

  t.deepEqual(root.data, {
    hello: 'world',
    lorem: 'ipsum'
  }, 'data is available on .data property')

  t.end()
})
