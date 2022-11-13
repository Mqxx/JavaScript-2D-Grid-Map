export class Background {

    constructor(canvas, gridSize = 10) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
        this.origin = {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0
        }
        this.gridSize = gridSize
        this.zoomSteps = 5
    }

    resize(width, height) {
        this.canvas.width = width
        this.canvas.height = height
    }

    move(x = 0, y = 0) {
        this.origin.x += x
        this.origin.y += y
        this.origin.dx = this.origin.x % this.gridSize
        this.origin.dy = this.origin.y % this.gridSize
    }

    drawGrid() {
        this.ctx.strokeStyle = "#000000"
        for (let width = this.origin.dx; width < this.canvas.width; width += this.gridSize) {
            this.ctx.beginPath()
            this.ctx.moveTo(width, 0);
            this.ctx.lineTo(width, this.canvas.height)
            this.ctx.closePath()
            this.ctx.stroke()
            
        }

        for (let height = this.origin.dy; height < this.canvas.height; height += this.gridSize) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, height);
            this.ctx.lineTo(this.canvas.width, height)
            this.ctx.closePath()
            this.ctx.stroke()
        }
    }

    drawLineToOrigin() {
        this.ctx.strokeStyle = "#00FF00"
        this.ctx.beginPath()
        this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2)
        this.ctx.lineTo(this.origin.x, this.origin.y)
        this.ctx.closePath()
        this.ctx.stroke()
    }

    drawOrigin() {
        this.ctx.fillStyle = "#FF0000"
        this.ctx.beginPath()
        this.ctx.arc(this.origin.x, this.origin.y, 10, 0, 2 * Math.PI);
        this.ctx.closePath()
        this.ctx.fill()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    zoom(toX, toY, direction) {
        const x = Math.floor(((toX - this.origin.x) / this.gridSize) * this.zoomSteps) 
        const y = Math.floor(((toY - this.origin.y) / this.gridSize) * this.zoomSteps)

        if (direction == 'in') {
            this.gridSize += this.zoomSteps
            this.move(-x, -y)
        }
        else if (direction == 'out' && this.gridSize > this.zoomSteps) {
            this.gridSize -= this.zoomSteps
            this.move(x, y)
        }
    }
}