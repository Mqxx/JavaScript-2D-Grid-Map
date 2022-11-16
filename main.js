import { Background } from './Background.js'

const canvas = document.getElementById('background-grid')
const ctx = canvas.getContext('2d')

const background = new Background(canvas, 50, 10)
background.style.grid.lineWidth = 1
background.style.grid.color = '#2d333b'

// resize page
window.addEventListener('resize', () => {
    background.resize(window.innerWidth, window.innerHeight)
})
background.resize(window.innerWidth, window.innerHeight)

// move background grid
canvas.addEventListener('mousemove', event => {

    // only move if left mouse button is pressed
    if (event.buttons == 1) {
        background.moveBy(event.movementX, event.movementY)
    }
})

// zoom in and out
canvas.addEventListener('wheel', event => {

    // zoom in
    if (event.deltaY < 0) {
        background.zoomAt(event.clientX, event.clientY, true)
    }

    // zoom out
    else if (event.deltaY > 0) {
        background.zoomAt(event.clientX, event.clientY, false)
    }
})

// move origin to center of page
background.moveTo(canvas.width / 2, canvas.height / 2)

background.update(() => {
    ctx.fillStyle = '#c93c37'
    ctx.strokeStyle = '#539bf5'
    ctx.beginPath()
    ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2);
    ctx.lineTo(background.getOrigin().posX, background.getOrigin().posY)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(background.getOrigin().posX, background.getOrigin().posY, 5, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath()
    
})
