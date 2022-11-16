export class Background {

    #canvas
    #ctx
    #origin
    #updateFunction
  
    constructor(canvas, gridsize = 10, zoomSteps = 5) {
        
        this.#canvas = canvas

        this.#ctx = this.#canvas.getContext('2d')

        this.#origin = {
            posX: 0,
            posY: 0,
            offsetX: () => {
                // calculate the rest in the X direction if devided by gridSize
                return this.#origin.posX % this.gridSize
            },
            offsetY: () => {
                // calculate the rest in the Y direction if devided by gridSize
                return this.#origin.posY % this.gridSize
            }
        }

        this.gridSize = gridsize
        this.zoomSteps = zoomSteps

        this.style = {
            grid: {
                color: '#000000',
                lineWidth: 1
            }
        }

        this.#updateFunction = () => {}

    }

    getOrigin() {
        return {
            posX: this.#origin.posX,
            posY: this.#origin.posY
        }
    }

    getOffset() {
        return {
            offsetX: this.#origin.offsetX(),
            offsetY: this.#origin.offsetY()
        }
    }

    moveTo(posX, posY) {
        this.#origin.posX = posX
        this.#origin.posY = posY
        this.clear()
        this.#drawGrid()
        this.#updateFunction()
    }

    moveBy(movementX = 0, movementY = 0) {
        const moveToX = this.#origin.posX + movementX
        const moveToY = this.#origin.posY + movementY
        this.moveTo(moveToX, moveToY)
    }

    clear() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
    }

    resize(width, height) {
        this.#canvas.width = width
        this.#canvas.height = height
        this.clear()
        this.#drawGrid()
        this.#updateFunction()
    }

    zoomAt(posX, posY, directionIn) {
        
        // calculate the new position of the grid based on the scroll position
        const moveByX = Math.floor(((posX - this.#origin.posX) / this.gridSize) * this.zoomSteps) 
        const moveByY = Math.floor(((posY - this.#origin.posY) / this.gridSize) * this.zoomSteps)
        
        // zoom in
        if (directionIn) {
            this.gridSize += this.zoomSteps
            this.moveBy(-moveByX, -moveByY)
        }
      
        // zoom out
        else if (!directionIn && this.gridSize > this.zoomSteps) {
            this.gridSize -= this.zoomSteps
            this.moveBy(moveByX, moveByY)
        }
    }

    update(callbackfn) {
        this.#updateFunction = callbackfn
    }

    #drawGrid() {
        
        // set stroke style and line width
        this.#ctx.strokeStyle = this.style.grid.color
        this.#ctx.lineWidth = this.style.grid.lineWidth

        // draw vertical lines
        for (let width = this.#origin.offsetX(); width < this.#canvas.width; width += this.gridSize) {
            this.#ctx.beginPath()
            this.#ctx.moveTo(width, 0);
            this.#ctx.lineTo(width, this.#canvas.height)
            this.#ctx.stroke()
            this.#ctx.closePath()
        }

        // draw horizontal lines
        for (let height = this.#origin.offsetY(); height < this.#canvas.height; height += this.gridSize) {
            this.#ctx.beginPath()
            this.#ctx.moveTo(0, height);
            this.#ctx.lineTo(this.#canvas.width, height)
            this.#ctx.stroke()
            this.#ctx.closePath()
        }
    }
}
