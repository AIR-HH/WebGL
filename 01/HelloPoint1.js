// HelloPoint.js
let VSHADER_SOURCE = 
    'void main()\n' +
    '{\n' + 
    '   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + 
    '   gl_PointSize = 10.0;\n' + 
    '}'

let FSHADER_SOURCE = 
    'void main()\n' +
    '{\n' +
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}'
    
function loadshader(gl, source, type) {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader: ' + error);
        gl.deleteShader(shader);
        return null;
    }
    return shader
}

function createProgram(gl, vshader, fshader) {
    let v = loadshader(gl, vshader, gl.VERTEX_SHADER)
    let f = loadshader(gl, fshader, gl.FRAGMENT_SHADER)
    let program = gl.createProgram()
    gl.attachShader(program, v)
    gl.attachShader(program, f)
    gl.linkProgram(program)
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program)
        console.log('Failed to link program: ' + error)
        gl.deleteProgram(program)
        gl.deleteShader(fragmentShader)
        gl.deleteShader(vertexShader)
        return null
    }
    return program
}

function initShaders(gl, vshader, fshader) {
    let program = createProgram(gl, vshader, fshader)
    gl.useProgram(program)
    gl.program = program
    return true
}
let main = function() {
    canvas = document.getElementById('myCanvas')
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element")
        return null
    }

    let gl = canvas.getContext('webgl')
    if(!gl) {
        console.log("filed to get the rendering context for WebGL")
        return null
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.')
        return null
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
}

