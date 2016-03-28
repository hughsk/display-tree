precision mediump float;

varying vec3 vnorm;

void main() {
  gl_FragColor = vec4(vnorm * 0.5 + 0.5, 1);
}
