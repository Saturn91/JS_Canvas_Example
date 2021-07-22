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
        GameEnvironement.graphics.ready = GameEnvironement.graphics.spriteSheetNames.length;
        for(let i = 0; i < GameEnvironement.graphics.spriteSheetNames.length; i++) {
            let currentID = GameEnvironement.graphics.spriteSheetNames[i];
            GameEnvironement.graphics.spriteSheets[currentID].data.original = new Image();
            GameEnvironement.graphics.spriteSheets[currentID].data.original.onload = () => {
                /*
                The following code imports the original spritesheet and adds a 2 pixel gap between the different sprites.
                this gap gets filled with the pixels on the border of the original sprites.
                (you can check the result by calling: canvasHandler.ctx.drawImage(canvasHandler.spriteSheet,0,0); ),
                without this it can happen that a small portion of the neibouring tile's pixel appear as a line on the border of a drawn sprite, by adding the
                equally collorized gap this "line" has the same color as the sprite itself, which hides this side effect completly            
                */
                this.spriteSheet = document.createElement('img');
                let canvas = document.createElement('canvas');
    
                let originalImageWidth = GameEnvironement.graphics.spriteSheets[currentID].data.original.width;
                let originalImageHeight = GameEnvironement.graphics.spriteSheets[currentID].data.original.height;

                let tileNumX = originalImageWidth / GameEnvironement.graphics.spriteSheets[currentID].data.tileSize;
                let tileNumY = originalImageHeight / GameEnvironement.graphics.spriteSheets[currentID].data.tileSize;
                
                canvas.width = originalImageWidth + (tileNumX-1)*2 + 2;
                canvas.height = originalImageHeight + (tileNumX-1)*2 + 2;

                GameEnvironement.graphics.spriteSheets[currentID].data.numSpriteX = tileNumX;
                GameEnvironement.graphics.spriteSheets[currentID].data.numSpriteY = tileNumY;
    
                let spriteSheetCTX = canvas.getContext('2d');
    
                let tileSize = GameEnvironement.graphics.spriteSheets[currentID].data.tileSize;
                   
                for(let x = 0; x < tileNumX; x++) {
                    for(let y = 0; y < tileNumY; y++) {

                        let posInSheetx = x*tileSize;
                        let posInSheety = y*tileSize;
    
                        let posXOnCanvas = x*(tileSize+2)+1;
                        let posYOnCanvas = y*(tileSize+2)+1;
    
                        //left
                        spriteSheetCTX.drawImage(
                            GameEnvironement.graphics.spriteSheets[currentID].data.original,
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
                            GameEnvironement.graphics.spriteSheets[currentID].data.original,
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
                            GameEnvironement.graphics.spriteSheets[currentID].data.original,
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
                            GameEnvironement.graphics.spriteSheets[currentID].data.original,
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
                            GameEnvironement.graphics.spriteSheets[currentID].data.original,
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
    
                GameEnvironement.graphics.spriteSheets[currentID].data.spriteSheet = canvas;
                
                GameEnvironement.graphics.ready --;
                if(GameEnvironement.graphics.ready <= 0) {
                    callBack();
                }
            }

            GameEnvironement.graphics.spriteSheets[currentID].data.original.src = GameEnvironement.graphics.spriteSheets[currentID].path;
        }
    }

    loadMapAsResource(name, mapData, spriteSheetName) {
        let mapCanvas = document.createElement('canvas');

        let tileSize = GameEnvironement.graphics.spriteSheets[spriteSheetName].data.tileSize;

        mapCanvas.width = mapData[0].length*tileSize;
        mapCanvas.height = mapData.length*tileSize;

        let mapContext = mapCanvas.getContext('2d');
        
        for(let x = 0; x < mapData[0].length; x++) {
            for( let y = 0; y < mapData.length; y++) {
                if (mapData[y][x] >= 0) { 
                    let spriteData = this.getSpriteData(mapData[y][x], spriteSheetName);      

                    this.drawSpriteOnContext(mapContext, spriteSheetName, spriteData, x*tileSize, y*tileSize);
                }             
            }
        }
        GameEnvironement.graphics.maps[name] = {
            texture: mapCanvas,
            spriteSheetName: spriteSheetName,
            mapData: mapData
        }
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

    drawSprite(sprite, spriteSheetName, x, y) { 
        
        let xPos = x;
        let yPos = y;

        if(GameEnvironement.graphics.pixelPerfect) {
            xPos = Math.round(x);
            yPos = Math.round(y)
        }

        this.drawSpriteOnContext(this.ctx, spriteSheetName, this.getSpriteData(sprite, spriteSheetName), xPos, yPos);
    }

    drawSpriteOnContext(context, spriteSheetName, spriteData, x, y) {
        context.drawImage(
            GameEnvironement.graphics.spriteSheets[spriteSheetName].data.spriteSheet,
            spriteData.spriteOffX,
            spriteData.spriteOffY,
            spriteData.tileSize,
            spriteData.tileSize,
            x,
            y,
            spriteData.tileSize,
            spriteData.tileSize);
    }

    getSpriteData(sprite, spriteSheetName) {
        let tileSize = GameEnvironement.graphics.spriteSheets[spriteSheetName].data.tileSize;

        let spritesInX = GameEnvironement.graphics.spriteSheets[spriteSheetName].data.numSpriteX;
        
        return {
            tileSize: tileSize,
            spriteOffX: (sprite%(spritesInX))*(tileSize+2)+1,
            spriteOffY: ((sprite-(sprite%(spritesInX)))/spritesInX)*(tileSize+2)+1
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
            GameEnvironement.graphics.maps[mapName].texture,
            screenX,
            screenY);
    }
}