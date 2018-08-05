// RotatedTriangle.js
// TranslateTriangle.js

//顶点着色器
let VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' + 
    'uniform float u_SinB, u_CosB;\n' +
    'void main() {\n' + 
    '   gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n' + 
    '   gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n' +
    '   gl_Position.z = a_Position.z;\n' +
    '   gl_Position.w = 1.0;\n' +
    '}\n'
//片段着色器
let FSHADER_SOURCE = 
    'void main() {\n' + 
    '   gl_FragColor = vec4(1.0, 1.0, 0.1, 1.0);\n'+ 
    '}\n'
let time = 0
let main = function () {
    //根据id获取<canvas>标签
    let canvas = document.getElementById('myCanvas')
    if (!canvas) {
        console.log('没有找到id="myCanvas" <canvas> 标签')
        return
    }

    //获取webgl的上下文
    let gl = getWebGLContext(canvas)
    if (!gl) {
        console.log('获取绘图上下文失败')
        return
    }
    
    //初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('初始化着色器程序失败');
        return
    }
    //设置顶点位置
    let nPos = initVertexBuffers(gl)
    if (nPos < 0) {
        console.log('设置顶点位置失败')
        return
    }
    let angle = 90.0
    let radian = Math.PI * angle / 180.0
    let sinB = Math.sin(radian);
    let cosB = Math.cos(radian);
    let u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
    gl.uniform1f(u_SinB, sinB)
    let u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
    gl.uniform1f(u_CosB, cosB)

    //设置背景色并清空<canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, nPos)
    setInterval(Rotated, 500, gl, 30.0, nPos)
}
function Rotated(gl, angle, nPos) {
    angle = angle * time
    time++
    let radian = Math.PI * angle / 180.0
    let sinB = Math.sin(radian);
    let cosB = Math.cos(radian);
    let u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
    gl.uniform1f(u_SinB, sinB)
    let u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
    gl.uniform1f(u_CosB, cosB)

    //设置背景色并清空<canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, nPos)
}
function initVertexBuffers(gl) {
    let vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ])
    let n = 3
    
    //创建缓冲区对象
    let vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) {
        console.log("创建缓冲区对象失败")
        return -1
    }

    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
     //获取"a_Position"
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0) {
        console.log('获取a_Position失败')
        return -1
    }
    //绑定attribute对象
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    //启用atribute对象
    gl.enableVertexAttribArray(a_Position)

    return n
}
