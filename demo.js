const perspective = require('gl-mat4/perspective')
const translate = require('gl-mat4/translate')
const identity = require('gl-mat4/identity')
const scale = require('gl-mat4/scale')
const faceNormals = require('face-normals')
const unindex = require('unindex-mesh')
const icosphere = require('icosphere')
const Geometry = require('gl-geometry')
const Camera = require('camera-spin')
const glslify = require('glslify')
const Shader = require('gl-shader')
const Fit = require('canvas-fit')
const raf = require('raf')
const Node = require('./')

const canvas = document.body.appendChild(document.createElement('canvas'))
const gl = canvas.getContext('webgl')
const proj = new Float32Array(16)
const model = new Float32Array(16)

const camera = Camera(canvas)
const sphere = createSphereGeometry(gl)
const scene = Node().add(
  Node({ scale: [0.8, 0.8, 0.8], position: [+5, 0, 0] }),
  Node({ scale: [0.8, 0.8, 0.8], position: [-5, 0, 0] }),
  Node({ scale: [0.8, 0.8, 0.8], position: [0, 0, +5] }),
  Node({ scale: [0.8, 0.8, 0.8], position: [0, 0, -5] }),
  Node({ scale: [0.8, 0.8, 0.8], position: [+5, 0, +5] }),
  Node({ scale: [0.8, 0.8, 0.8], position: [+5, 0, -5] }),
  Node({ scale: [0.8, 0.8, 0.8], position: [-5, 0, +5] }),
  Node({ scale: [0.8, 0.8, 0.8], position: [-5, 0, -5] }),
  Node({ scale: [0.3, 0.3, 0.3], position: [+3, 0, 0] }),
  Node({ scale: [0.3, 0.3, 0.3], position: [-3, 0, 0] }),
  Node({ scale: [0.3, 0.3, 0.3], position: [0, 0, +3] }),
  Node({ scale: [0.3, 0.3, 0.3], position: [0, 0, -3] }),
  Node({ scale: [0.3, 0.3, 0.3], position: [+3, 0, +3] }),
  Node({ scale: [0.3, 0.3, 0.3], position: [+3, 0, -3] }),
  Node({ scale: [0.3, 0.3, 0.3], position: [-3, 0, +3] }),
  Node({ scale: [0.3, 0.3, 0.3], position: [-3, 0, -3] })
)

const getNodes = scene.list()
const shader = Shader(gl
  , glslify('./demo.vert')
  , glslify('./demo.frag')
)

render()

function createSphereGeometry () {
  const positions = unindex(icosphere(2))
  const normals = faceNormals(positions)

  return Geometry(gl)
    .attr('position', positions)
    .attr('normal', normals)
}

function render () {
  raf(render)

  const width = canvas.width
  const height = canvas.height

  gl.viewport(0, 0, width, height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)

  const nodes = getNodes()

  sphere.bind(shader)
  shader.uniforms.proj = perspective(proj, Math.PI / 2, width / height, 0.1, 100)
  shader.uniforms.view = camera.tick()

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i]
    node.data.position[1] = Math.sin(Date.now() / 1000 + i / 2) * 1.5

    identity(model)
    translate(model, model, node.data.position)
    scale(model, model, node.data.scale)

    shader.uniforms.model = model
    sphere.draw()
  }
}

window.addEventListener('resize', Fit(canvas), false)
