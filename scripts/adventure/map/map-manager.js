const level_0_0_mapData = [
    [0,0,33,0,0,0,0,0,0,0,33,0,0,0,0,0,0,0,0,0,33,0,0,0,0,0,33,0,0,0],
    [0,48,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,50,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,33,0],
    [0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0],
    [33,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,33,0],
    [0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0],
    [33,64,0,0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,33,0],
    [0,64,0,0,0,0,0,0,0,0,0,40,0,0,0,13,46,46,46,46,46,15,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,1,0,0,0,29,21,21,14,37,0,31,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,1,0,33,0,29,21,21,30,37,0,31,0,0,0,0,0,66,33,0],
    [0,64,0,0,0,0,0,0,0,0,0,1,0,16,17,29,21,21,37,37,0,31,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,1,0,32,33,45,46,43,44,46,46,47,0,33,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,1,10,10,10,10,10,10,12,0,0,0,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,3,3,4,0,0,0,0,0,0,0,67,68,68],
    [0,64,0,0,0,0,0,0,0,0,0,1,0,0,0,0,18,19,19,19,4,0,0,0,0,0,0,0,0,0],
    [0,64,0,0,0,0,0,0,0,0,1,1,1,0,0,0,34,35,35,35,36,0,33,0,0,1,1,1,1,1],
    [0,64,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,64,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [33,64,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,51,52,52],
    [0,64,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0],
    [0,64,0,0,0,0,33,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,33,0,0,66,0,0],
    [0,64,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,33,0,0,0,0,0,0,0,66,33,0],
    [0,64,0,33,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0],
    [33,80,81,81,81,81,81,81,81,53,1,1,1,51,81,81,81,81,81,81,81,81,81,81,81,81,81,82,0,0],
    [0,0,0,33,0,0,0,0,33,64,1,1,1,66,0,0,33,0,0,0,0,0,0,0,33,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]; //use mapData in engine.addMap('level_0_0', 'main-terrain' , yourMapData)

class MapManager {
    constructor() {
        this.objects = [];
        this.initMaps();        
    }

    draw(canvasHandler) {
        canvasHandler.drawMap('level_0_0', Camera.Singleton.calcOffsetX(0), Camera.Singleton.calcOffsetY(0));
        this.objects.sort(this.sortObjectInY);
        this.objects.forEach(object => {
            object.draw(canvasHandler);           
        });
    }

    sortObjectInY(a, b) {
        return (a.y + a.yOffsetHeightSort) - (b.y + b.yOffsetHeightSort);
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
        engine.addMap('level_0_0', 'main-terrain' , level_0_0_mapData)
        let mapWidth = 30*16;
        let mapHeight = 30*16;
        Camera.Singleton.setBoundries(new Vector2f(0,0), new Vector2f(mapWidth,mapHeight));
        this.initTrees();
        
    }

    initTrees() {
        this.initObject('tree1', 'tree1', 0, 0, 4, 5);
        //read out trees from map (Tile 33 with no tile 17 on top)
        for(let y = 0; y < level_0_0_mapData.length; y++) {
            for(let x = 0; x < level_0_0_mapData[0].length; x++) {
                if(level_0_0_mapData[y][x] == 33) {
                    if(y-1 < 0 || level_0_0_mapData[y-1][x] != 17) {
                        engine.setMap('level_0_0', x, y, 0);
                        let tree = new OakTree((x-2)*16, (y-4)*16);
                        this.objects.push(tree);
                    }
                }                
            }
        }       
    }

    addObject(mapObject) {
        this.objects.push(mapObject);
    }
}
