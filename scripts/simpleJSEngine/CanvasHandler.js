class CanvasHandler {
    constructor(canvasID, windowWidth,  windowHeight) {

        this.canvas = document.getElementById(canvasID);

        if(windowWidth == undefined) { windowWidth = window.innerWidth-4 }
        if(windowHeight == undefined) { windowHeight = window.innerHeight-4 }

        this.setCanvasSize(windowWidth,windowHeight)

        this.ctx = this.canvas.getContext('2d');
        
        this.spriteSheet = new Image();
        this.spriteSheet.src = './assets/spriteSheet.jpg';   
        console.log(`Canvas: [${this.windowWidth}x${this.windowHeight}] initialized!`);
    }

    loadResources() {
        this.spriteSheet = new Image();
        this.spriteSheet.src = './assets/spriteSheet.jpg';
        return this.spriteSheet.onload;
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

    cls() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fillRect(x, y, w, h, col) {
        this.ctx.fillStyle = Colors[col].color;
        this.ctx.fillRect(x,y,w,h);
    }

    drawSprite(sprite, x, y) {
        this.spriteSheet.onload = function() {
            this.ctx.drawImage(this.spriteSheet,x,y);
        }        
    }

    setUpdate(update_function) {
        this.update_function = update_function;
    }

    setDraw(draw_function) {
        this.draw_function = draw_function;
    }    
}