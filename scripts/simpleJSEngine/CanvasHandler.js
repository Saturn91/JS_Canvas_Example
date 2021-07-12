class CanvasHandler {
    constructor(canvasID, windowWidth,  windowHeight) {

        this.canvas = document.getElementById(canvasID);
        let log = Math.log(GameEnvironement.graphics.tileSize) / Math.log(2);
        let pow = Math.pow(2, Math.round(log));
        let valid = pow == GameEnvironement.graphics.tileSize;
        if(!valid || GameEnvironement.graphics.tileSize > 64) console.warn('Tile size should be [1,2,4,8,16,32 or 64!]: but is ' + GameEnvironement.graphics.tileSize)

        if(windowWidth == undefined) { windowWidth = window.innerWidth-4 }
        if(windowHeight == undefined) { windowHeight = window.innerHeight-4 }

        this.setCanvasSize(windowWidth,windowHeight)

        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

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
        let tileSize = GameEnvironement.graphics.tileSize; 
        this.ctx.drawImage(this.spriteSheet,(sprite%(64/tileSize))*tileSize,(sprite-sprite%(64/tileSize)),tileSize,tileSize,Math.round(x),Math.round(y),64,64);            
    }

    setUpdate(update_function) {
        this.update_function = update_function;
    }

    setDraw(draw_function) {
        this.draw_function = draw_function;
    }    
}