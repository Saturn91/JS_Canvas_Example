class MapManager {
    constructor() {
        this.initMaps();
    }

    update(timeDelta) {

    }

    draw(canvasHandler) {
        canvasHandler.drawMap('tree1', 10, 40);
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
    }
}
