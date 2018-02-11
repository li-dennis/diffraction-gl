import './styles/index.styl'

function setup() {
  const fragmentShader = require<string>('./glsl/fragment.glsl')
  const vertexShader = require<string>('./glsl/vertex.glsl')
  const canvas = document.getElementById('canvas') as HTMLCanvasElement

  const gl = canvas.getContext('webgl')

  if (!gl) {
    return
  }

  const program = gl.createProgram()
  const vShader = gl.createShader(gl.VERTEX_SHADER)
  const fShader = gl.createShader(gl.FRAGMENT_SHADER)

  gl.shaderSource(vShader, vertexShader)
  gl.compileShader(vShader)

  gl.shaderSource(fShader, fragmentShader)
  gl.compileShader(fShader)

  gl.attachShader(program, vShader)
  gl.attachShader(program, fShader)

  gl.linkProgram(program)
  gl.useProgram(program)

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(positionLocation)

  const buffer   = gl.createBuffer()
  const vertices = [-0.5,  0.5,
                  -0.5, -0.5,
                  0.5,  0.5,
                  0.5,  0.5,
                  -0.5, -0.5,
                  0.5, -0.5]
  const size = 2
  const stride = 0
  const offset = 0

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.vertexAttribPointer(positionLocation, size, gl.FLOAT, false, stride, offset)

  const count = 6
  gl.drawArrays(gl.TRIANGLES, offset, count)
}

setup()
