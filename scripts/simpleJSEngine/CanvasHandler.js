function is2Component(value) {
    let log = Math.log(value) / Math.log(2);
    let pow = Math.pow(2, Math.round(log));
    return pow == value;
}

class CanvasHandler {
    constructor(canvasID, windowWidth,  windowHeight) {

        this.canvas = document.getElementById(canvasID);        
        
        if(!is2Component(GameEnvironement.graphics.tileSize) || GameEnvironement.graphics.tileSize > 64) console.warn('Tile size should be [1,2,4,8,16,32 or 64!]: but is ' + GameEnvironement.graphics.tileSize)

        if(GameEnvironement.graphics.windowWidth == undefined) { GameEnvironement.graphics.windowWidth = window.innerWidth-4 }
        if(GameEnvironement.graphics.windowHeight == undefined) { GameEnvironement.graphics.windowHeight = window.innerHeight-4 }

        if(Math.abs(this.scaleX-this.scaleY) > 0.01) {
            console.warn('resolutionX / windowWithd should be the same value as resolutionY / windowHeight! elswhise the image gets stretched!')
        }

        this.setCanvasSize(GameEnvironement.graphics.windowWidth,GameEnvironement.graphics.windowHeight)

        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.font = '6px serif';

        this.ctx.scale(GameEnvironement.graphics.windowWidth / GameEnvironement.graphics.resolutionX, GameEnvironement.graphics.windowHeight / GameEnvironement.graphics.resolutionY)

        this.setBackgroundColor(GameEnvironement.graphics.clearColor);
        
        this.loadOriginalSpriteSheet = new Image();
        
        GameEnvironement.initialized.canvas = false;

        if(GameEnvironement.properties.debug) console.log(`Canvas: [${this.windowWidth}x${this.windowHeight}] initialized!`);
        GameEnvironement.internaly.canvas = this;
        GameEnvironement.internaly.canvas.loadResources(() => {
            GameEnvironement.initialized.canvas = true;
        })
    }

    loadResources(callBack) {   
        this.loadSpriteSheet(callBack);
    }

    loadSpriteSheet(callBack) {  
        
        GameEnvironement.internaly.canvas.spriteSheet = new Image();
        GameEnvironement.internaly.canvas.spriteSheet.width = 64;
        GameEnvironement.internaly.canvas.spriteSheet.height = 64;

        this.loadOriginalSpriteSheet.onload = () => {
            this.spriteSheet = document.createElement('img');
            let canvas = document.createElement('canvas');
            
            let tileNum = 64 / GameEnvironement.graphics.tileSize;
            
            canvas.width = 64 + (tileNum-1)*2 + 2;
            canvas.height = 64 + (tileNum-1)*2 + 2;

            let spriteSheetCTX = canvas.getContext('2d');

            let tileSize = GameEnvironement.graphics.tileSize;    

            for(let x = 0; x < 64 / tileNum; x++) {
                for(let y = 0; y < 64 / tileNum; y++) {
                    let scaleFactor = (x+y*tileSize)%(64/tileSize);
                    spriteSheetCTX.drawImage(
                        this.loadOriginalSpriteSheet,
                        (scaleFactor)*tileSize,
                        ((x+y*tileSize)-scaleFactor),
                        tileSize,
                        tileSize,
                        x*(tileSize+2)+1,
                        y*(tileSize+2)+1,
                        tileSize,
                        tileSize);
                }
            }

            GameEnvironement.internaly.canvas.spriteSheet = canvas;
            callBack();
        }   
        
        this.loadOriginalSpriteSheet.src = './assets/spriteSheet.png'; 
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
        this.ctx.fillRect(Math.round(x),Math.round(y),w,h);
    }

    drawSprite(sprite, x, y) {        
        let tileSize = GameEnvironement.graphics.tileSize; 
        let scaleFactor = sprite%(64/tileSize);

        let xPos = x;
        let yPos = y;

        if(GameEnvironement.graphics.pixelPerfect) {
            xPos = Math.round(x);
            yPos = Math.round(y)
        }

        this.ctx.drawImage(
            this.spriteSheet,
            (scaleFactor)*tileSize,
            (sprite-scaleFactor),
            tileSize,
            tileSize,
            xPos,
            yPos,
            tileSize,
            tileSize);            
    }

    drawText(text, x, y, colorNum, maxWidth) {
        this.ctx.fillStyle = Colors[colorNum].color;
        this.ctx.fillText(text, x, y, maxWidth)
    }

    setUpdate(update_function) {
        this.update_function = update_function;
    }

    setDraw(draw_function) {
        this.draw_function = draw_function;
    }    
}