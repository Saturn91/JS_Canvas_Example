class MapManager {
    constructor() {
        this.objects = [];
        this.initMaps();        
    }

    drawInFrontOfPlayer(canvasHandler, player) {
        this.objects.forEach(object => {
            if(object.y + object.height >= player.y+player.height) {
                object.draw(canvasHandler);
            }
        });
    }

    drawBehindPlayer(canvasHandler, player) {
        this.objects.forEach(object => {
            if(object.y + object.height < player.y+player.height) {
                object.draw(canvasHandler);
            }
        });
    }

    /**
     * Create multipleSprite object as Map from Spritesheet
     * @param {string} objectName 
     * @param {string} objectSpriteSheet 
     * @param {number} startSpriteX 
     * @param {number} startSpriteY 
     * @param {number} tilesInX 
     * @param {number} tilesInY 
     */
    initObject(objectName, objectSpriteSheet, startSpriteX, startSpriteY, tilesInX, tilesInY) {
        let objectMap = [tilesInY];

        for(let y = startSpriteY; y < startSpriteY + tilesInY; y++) {
            objectMap[y] = [tilesInX];
            let spriteSheetTilesInX = GameEnvironement.graphics.spriteSheets[objectSpriteSheet].data.numSpriteX;
            for(let x = startSpriteX; x < startSpriteX + tilesInX; x++) {
                objectMap[y-startSpriteY][x-startSpriteX] = y*spriteSheetTilesInX + x;
            }
        }

        engine.addMap(objectName, objectSpriteSheet, objectMap);
    }

    initMaps() {
        this.initObject('tree1', 'tree1', 0, 0, 4, 5);
        let tree = new MapObject(20,40,4*16,5*16);
        tree.setDraw((canvasHandler, x, y) => {
            canvasHandler.drawMap('tree1', x, y);
        })
        this.objects.push(tree);
    }
}
