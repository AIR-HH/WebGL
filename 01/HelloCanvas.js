// HelloCanvas.js
function main() {
    let canvas = document.getElementById('myCanvas')
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element")
        return
    }

    let gl = getWebGLContext(canvas)
    //let gl = canvas.getContext('webgl')
    if(!gl) {
        console.log("filed to get the rendering context for WebGL")
        return
    }

    gl.clearColor(0.0, 0.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}