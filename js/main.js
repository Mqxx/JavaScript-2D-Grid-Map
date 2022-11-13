import { Background } from './Background.js'

let canvas = document.getElementById('background-grid')

const background = new Background(canvas, 100)

window.addEventListener('resize', event => {
    background.resize(event.target.innerWidth, event.target.innerHeight)
    background.clear()
    background.drawGrid()
    background.drawLineToOrigin()
    background.drawOrigin()
})

background.resize(window.innerWidth, window.innerHeight)


canvas.addEventListener('mousemove', event => {
    
    if (event.buttons == 1) {
        background.move(event.movementX, event.movementY)
        background.clear()
        background.drawGrid()
        background.drawLineToOrigin()
        background.drawOrigin()
    }
})

canvas.addEventListener('wheel', event => {
    // zoom in
    if (event.deltaY < 0) {
        background.zoom(event.clientX, event.clientY, 'in')
    }
    // zoom out
    else if (event.deltaY > 0) {
        background.zoom(event.clientX, event.clientY, 'out')
    }
    background.clear()
    background.drawGrid()
    background.drawLineToOrigin()
    background.drawOrigin()
})

background.clear()
background.drawGrid()
background.drawLineToOrigin()
background.drawOrigin()