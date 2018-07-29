// HelloPoint2.js

let VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' + 
    'void main() {\n' + 
    '   gl_Position = a_Position;\n' + 
    '   gl_PointSize = 100.0;\n' + 
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
    //for (let x =0.0, y = 0.0; x < 1.0; x +=0.00000000001, y +=0.00000000001) {
    gl.vertexAttrib3f(a_Position, 0.5, 0.3, 0.0)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
    //}
}