// ClickPoint.js

let VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' + 
    'void main() {\n' + 
    '   gl_Position = a_Position;\n' + 
    '   gl_PointSize = 10.0;\n' + 
    '}\n'
let FSHADER_SOURCE = 
    'void main() {\n' + 
    '   gl_FragColor = vec4(1.0, 1.0, 0.1, 1.0);\n'+ 
    '}\n'

let main = function () {
    let canvas = document.getElementById('myCanvas')
    if (!canvas) {
        console.log('没有找到id="myCanvas" <canvas> 标签')
        return
    }

    let gl = getWebGLContext(canvas)
    if (!gl) {
        console.log('获取绘图上下文失败')
        return
    }
    
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('初始化着色器程序失败');
        return
    }
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0) {
        console.log('获取a_Position失败')
        return
    }
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position)
    }
    gl.vertexAttrib3f(a_Position, 0.5, 0.3, 0.0)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

let g_points = []

function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX
    let y = ev.clientY
    let rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2)
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
    g_points.push([x, y]);
    gl.clear(gl.COLOR_BUFFER_BIT)
    let len = g_points.length
    for (let i = 0; i < len; i++) {
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0)
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}