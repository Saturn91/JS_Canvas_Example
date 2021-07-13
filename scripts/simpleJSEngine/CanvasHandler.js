function is2Component(value) {
    let log = Math.log(value) / Math.log(2);
    let pow = Math.pow(2, Math.round(log));
    return pow == value;
}

class CanvasHandler {
    constructor(canvasID, windowWidth,  windowHeight) {

        this.canvas = document.getElementById(canvasID); 
        this.bufferCanvas = document.createElement("canvas");
        this.bufferCtx = this.bufferCanvas.getContext("2d");       
        
        if(!is2Component(GameEnvironement.graphics.tileSize) || GameEnvironement.graphics.tileSize > 64) console.warn('Tile size should be [1,2,4,8,16,32 or 64!]: but is ' + GameEnvironement.graphics.tileSize)

        if(GameEnvironement.graphics.windowWidth == undefined) { GameEnvironement.graphics.windowWidth = window.innerWidth-4 }
        if(GameEnvironement.graphics.windowHeight == undefined) { GameEnvironement.graphics.windowHeight = window.innerHeight-4 }

        this.scaleX = 1;
        this.scaleY = 1;

        

        if(Math.abs(this.scaleX-this.scaleY) > 0.01) {
            console.warn('resolutionX / windowWithd should be the same value as resolutionY / windowHeight! elswhise the image gets stretched!')
        }

        this.setCanvasSize(GameEnvironement.graphics.windowWidth,GameEnvironement.graphics.windowHeight)

        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.ctx.scale(GameEnvironement.graphics.windowWidth / GameEnvironement.graphics.resolutionX, GameEnvironement.graphics.windowHeight / GameEnvironement.graphics.resolutionY)

        this.setBackgroundColor(GameEnvironement.graphics.clearColor);
        
        this.spriteSheet = new Image();
        this.spriteSheet.src = './assets/spriteSheet.png'; 
        
        GameEnvironement.initialized.canvas = false;

        if(GameEnvironement.properties.debug) console.log(`Canvas: [${this.windowWidth}x${this.windowHeight}] initialized!`);
        GameEnvironement.internaly.canvas = this;
        GameEnvironement.internaly.canvas.loadResources(() => {
            GameEnvironement.initialized.canvas = true;
        })
    }

    loadResources(callBack) {
        this.spriteSheet.onload = callBack;
    }

    setCanvasSize(windowWidth, windowHeight) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;        
        
        this.canvas.width = this.windowWidth;
        this.canvas.height = windowHeight;
        this.bufferCanvas.width = this.canvas.width;
        this.bufferCanvas.height = this.canvas.height;
    }

    setBackgroundColor(col) {
        this.canvas.style.background = Colors[col].color;
    }

    setColor(colorNum) {
        this.bufferCtx.fillStyle = Colors[colorNum].color;
        this.bufferCtx.strokeSytle = Colors[colorNum].color;
    }

    cls() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fillRect(x, y, w, h, col) {
        this.bufferCtx.fillStyle = Colors[col].color;
        this.bufferCtx.fillRect(x,y,w,h);
    }

    drawSprite(sprite, x, y) {        
        let tileSize = GameEnvironement.graphics.tileSize; 
        let pos = this.getScaledPositionOnScreenInPixel(Math.round(x), Math.round(y));
        this.bufferCtx.drawImage(this.spriteSheet,(sprite%(64/tileSize))*tileSize,(sprite-sprite%(64/tileSize)),tileSize,tileSize,pos.x,pos.y,tileSize*this.scaleX,tileSize*this.scaleY);            
    }

    getScaledPositionOnScreenInPixel(x, y){
        return {
            x: Math.round(x * this.scaleX),
            y: Math.round(y * this.scaleY)
        }
    }

    setUpdate(update_function) {
        this.update_function = update_function;
    }

    setDraw(draw_function) {
        this.draw_function = draw_function;
    }    
}