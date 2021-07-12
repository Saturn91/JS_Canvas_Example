class CanvasHandler {
    constructor(canvasID, windowWidth,  windowHeight) {

        this.canvas = document.getElementById(canvasID);

        if(windowWidth == undefined) { windowWidth = window.innerWidth-4 }
        if(windowHeight == undefined) { windowHeight = window.innerHeight-4 }

        this.setCanvasSize(windowWidth,windowHeight)

        this.ctx = this.canvas.getContext('2d');

        console.log(`Canvas: [${this.windowWidth}x${this.windowHeight}] initialized!`)
    }

    setCanvasSize(windowWidth, windowHeight) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;        
        
        this.canvas.width = this.windowWidth;
        this.canvas.height = windowHeight;
    }

    setBackgroundColor(col) {
        this.canvas.style.background = Colors[col].color;
    }

    setColor(colorNum) {
        this.ctx.fillStyle = Colors[colorNum].color;
        this.ctx.strokeSytle = Colors[colorNum].color;
    }

    fillRect(x, y, w, h, col) {
        this.ctx.fillStyle = Colors[col].color;
        mainCanvas.ctx.fillRect(x,y,w,h);
    }
}