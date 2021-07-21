function is2Component(value) {
    let log = Math.log(value) / Math.log(2);
    let pow = Math.pow(2, Math.round(log));
    return pow == value;
}

class CanvasHandler {
    constructor(canvasID, windowWidth,  windowHeight) {

        this.canvas = document.getElementById(canvasID);        

        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('resize', () => {
            this.resizeCanvas(this);
        });
        
        this.resizeCanvas(this);

        this.setBackgroundColor(GameEnvironement.graphics.clearColor);
        
        this.loadOriginalSpriteSheet = new Image();
        
        GameEnvironement.initialized.canvas = false;

        if(GameEnvironement.properties.debug) console.log(`Canvas: [${this.windowWidth}x${this.windowHeight}] initialized!`);
        GameEnvironement.internaly.canvas = this;
        GameEnvironement.internaly.canvas.loadResources(() => {
            GameEnvironement.initialized.canvas = true;
        })
    }

    resizeCanvas(canvas) {
        if(!is2Component(GameEnvironement.graphics.tileSize) || GameEnvironement.graphics.tileSize > 64) console.warn('Tile size should be [1,2,4,8,16,32 or 64!]: but is ' + GameEnvironement.graphics.tileSize)

        if(GameEnvironement.graphics.windowWidth == undefined) { GameEnvironement.graphics.windowWidth = window.innerWidth-4 }
        if(GameEnvironement.graphics.windowHeight == undefined) { GameEnvironement.graphics.windowHeight = window.innerHeight-4 }

        if(GameEnvironement.graphics.autoFitScreen) {
            if (window.innerWidth > window.innerHeight) {
                let scale = Math.round((window.innerHeight-200)/GameEnvironement.graphics.resolutionY);
                GameEnvironement.graphics.windowHeight = scale * GameEnvironement.graphics.resolutionY
                GameEnvironement.graphics.windowWidth = scale * GameEnvironement.graphics.resolutionX
            } else {
                let scale = Math.round((window.innerWidth-50)/GameEnvironement.graphics.resolutionX);
                GameEnvironement.graphics.windowHeight = scale * GameEnvironement.graphics.resolutionY
                GameEnvironement.graphics.windowWidth = scale * GameEnvironement.graphics.resolutionX
            }
        }

        if(Math.abs(GameEnvironement.graphics.windowWidth / GameEnvironement.graphics.resolutionX-GameEnvironement.graphics.windowHeight / GameEnvironement.graphics.resolutionY) > 0.01) {
            console.warn('resolutionX / windowWithd should be the same value as resolutionY / windowHeight! elswhise the image gets stretched!')
        }

        canvas.setCanvasSize(GameEnvironement.graphics.windowWidth,GameEnvironement.graphics.windowHeight);
        canvas.ctx.scale(GameEnvironement.graphics.windowWidth / GameEnvironement.graphics.resolutionX, GameEnvironement.graphics.windowHeight / GameEnvironement.graphics.resolutionY)
        canvas.ctx.imageSmoothingEnabled = false;
        canvas.ctx.font = '6px serif';
    }

    loadResources(callBack) {   
        this.loadSpriteSheet(callBack);
    }

    loadSpriteSheet(callBack) {  
        
        GameEnvironement.internaly.canvas.spriteSheet = new Image();

        this.loadOriginalSpriteSheet.onload = () => {
            /*
            The following code imports the original spritesheet and adds a 2 pixel gap between the different sprites.
            this gap gets filled with the pixels on the border of the original sprites.
            (you can check the result by calling: canvasHandler.ctx.drawImage(canvasHandler.spriteSheet,0,0); ),
            without this it can happen that a small portion of the neibouring tile's pixel appear as a line on the border of a drawn sprite, by adding the
            equally collorized gap this "line" has the same color as the sprite itself, which hides this side effect completly            
            */
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
                    
                    let posInSheetx = (scaleFactor)*tileSize;
                    let posInSheety = ((x+y*tileSize)-scaleFactor);

                    let posXOnCanvas = x*(tileSize+2)+1;
                    let posYOnCanvas = y*(tileSize+2)+1;

                    //left
                    spriteSheetCTX.drawImage(
                        this.loadOriginalSpriteSheet,
                        posInSheetx,
                        posInSheety,
                        1,
                        tileSize,
                        posXOnCanvas-1,
                        posYOnCanvas,
                        1,
                        tileSize);
                    
                    //right
                    spriteSheetCTX.drawImage(
                        this.loadOriginalSpriteSheet,
                        posInSheetx+tileSize-1,
                        posInSheety,
                        1,
                        tileSize,
                        posXOnCanvas+tileSize,
                        posYOnCanvas,
                        1,
                        tileSize);

                    //top
                    spriteSheetCTX.drawImage(
                        this.loadOriginalSpriteSheet,
                        posInSheetx,
                        posInSheety,
                        tileSize,
                        1,
                        posXOnCanvas,
                        posYOnCanvas-1,
                        tileSize,
                        1);

                     //down
                     spriteSheetCTX.drawImage(
                        this.loadOriginalSpriteSheet,
                        posInSheetx,
                        posInSheety+tileSize-1,
                        tileSize,
                        1,
                        posXOnCanvas,
                        posYOnCanvas+tileSize,
                        tileSize,
                        1);
                    
                    //draw original
                    spriteSheetCTX.drawImage(
                        this.loadOriginalSpriteSheet,
                        posInSheetx,
                        posInSheety,
                        tileSize,
                        tileSize,
                        posXOnCanvas,
                        posYOnCanvas,
                        tileSize,
                        tileSize);
                }
            }

            GameEnvironement.internaly.canvas.spriteSheet = canvas;
            callBack();
        }   
        
        this.loadOriginalSpriteSheet.src = './assets/spriteSheet.png'; 
    }

    loadMapAsResource(name, mapData) {
        let mapCanvas = document.createElement('canvas');

        mapCanvas.width = mapData[0].length*GameEnvironement.graphics.tileSize;
        mapCanvas.height = mapData.length*GameEnvironement.graphics.tileSize;

        let mapContext = mapCanvas.getContext('2d');
        
        for(let x = 0; x < mapData[0].length; x++) {
            for( let y = 0; y < mapData.length; y++) {
                if (mapData[y][x] >= 0) {
                    let spriteData = this.getSpriteData(mapData[y][x]);
                    
                    this.drawSpriteOnContext(mapContext, this.getSpriteData(mapData[y][x]), x*GameEnvironement.graphics.tileSize, y*GameEnvironement.graphics.tileSize);
                }             
            }
        }

        GameEnvironement.graphics.maps[name] = mapCanvas;
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
        
        let xPos = x;
        let yPos = y;

        if(GameEnvironement.graphics.pixelPerfect) {
            xPos = Math.round(x);
            yPos = Math.round(y)
        }

        this.drawSpriteOnContext(this.ctx, this.getSpriteData(sprite), xPos, yPos);
    }

    drawSpriteOnContext(context, spriteData, x, y) {
        context.drawImage(
            this.spriteSheet,
            spriteData.spriteOffX,
            spriteData.spriteOffY,
            spriteData.tileSize,
            spriteData.tileSize,
            x,
            y,
            spriteData.tileSize,
            spriteData.tileSize);    
    }

    getSpriteData(sprite) {
        let tileSize = GameEnvironement.graphics.tileSize
        let scaleFactor = 64/tileSize;
        return {
            tileSize: tileSize,
            spriteOffX: (sprite%(scaleFactor))*(tileSize+2)+1,
            spriteOffY: (sprite-(sprite%(scaleFactor)))/scaleFactor*(tileSize+2)+1
        }
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
    
    drawMap(mapName, screenX, screenY, mapWidth, mapHeight) {
        this.ctx.drawImage(
            GameEnvironement.graphics.maps[mapName],
            screenX,
            screenY);
    }
}