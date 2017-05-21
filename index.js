'use strict'

var splice = require('remove-array-items')

module.exports = DisplayTreeNode

function DisplayTreeNode (data) {
  if (!(this instanceof DisplayTreeNode)) {
    return new DisplayTreeNode(data)
  }

  this.data = data || {}
  this.children = null
  this.parent = null
  this.sortVersion = 1
}

DisplayTreeNode.prototype.add = function (arg) {
  var argCount = arguments.length
  if (argCount === 0) return this
  if (argCount === 1) {
    if (Array.isArray(arg)) {
      for (var i = 0, l = arg.length; i < l; i++) {
        this.addOne(arg[i])
      }

      return this
    } else {
      return this.addOne(arg)
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    if (Array.isArray(arguments[i])) {
      var arg = arguments[i]
      for (var j = 0, k = arg.length; j < k; j++) {
        this.addOne(arg[j])
      }
    } else {
      this.addOne(arguments[i])
    }
  }

  return this
}

DisplayTreeNode.prototype.addOne = function (child) {
  if (!child) return this
  if (this.children === null) this.children = []
  if (child.parent) {
    child.parent.remove(child)
  }

  var idx = this.children.indexOf(child)
  if (idx !== -1) return this

  child.parent = this
  this.children.push(child)
  this.resetLists()

  return this
}

DisplayTreeNode.prototype.resetLists = function () {
  this.sortVersion++
  var parent = this.parent
  while (parent) {
    parent.sortVersion++
    parent = parent.parent
  }
}

DisplayTreeNode.prototype.remove = function (child) {
  var children = this.children
  if (children === null) return this

  var idx = children.indexOf(child)
  if (idx !== -1) splice(children, idx, 1)
  child.parent = null

  this.resetLists()

  return this
}

DisplayTreeNode.prototype.clear = function () {
  var children = this.children

  this.children = null

  for (var i = 0; i < children.length; i++) {
    children[i].parent = null
  }

  return this
}

DisplayTreeNode.prototype.each = function (iter) {
  var children = this.children
  if (children === null) return

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i]
    var result = iter(child)
    if (result === false) continue
    child.each(iter)
  }

  return this
}

DisplayTreeNode.prototype.findup = function (iter) {
  if (!this.parent) return this

  var result = iter(this.parent)
  if (result === false) return this
  this.parent.findup(iter)

  return this
}

DisplayTreeNode.prototype.flat = function (out) {
  var j = 0

  out = out || []
  out.length = 0

  this.each(function (node, parent) {
    out[j++] = node
  })

  return out
}

DisplayTreeNode.prototype.list = function (sortFn) {
  var sortVersion = 0
  var list = []
  var self = this

  return sortNodes

  function sortNodes () {
    if (self.sortVersion === sortVersion) {
      return list
    }

    sortVersion = self.sortVersion

    return sortFn
      ? self.flat(list).sort(sortFn)
      : self.flat(list)
  }
}

DisplayTreeNode.prototype.size = function () {
  var j = 0

  this.each(function () {
    j++
  })

  return j
}
