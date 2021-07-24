//Example ussage
class Player {
    constructor() {
        this.x = GameEnvironement.graphics.resolutionX/2 - 4;
        this.y = GameEnvironement.graphics.resolutionY/2 - 4;
        this.w = 8;
        this.h = 8;
        this.speed = 40;
        this.sprite = 4;
        this.score = 0;
    }
}

class Coin {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 8;
        this.h = 8;
        this.sprite = 7;
    }
}

let map = [];

let player;
let coin;

/**
 * Generate a 2d array which contains sprite numbers [y][x]
 */
function createMap() {
    let mapWidth = 20;
    let mapHeight = 16;
    map = [mapHeight];
    for(let y = 0; y < mapHeight; y++) {
        map[y] = [mapWidth];
        for(let x = 0; x < mapWidth; x++) {
            if( x == 0 || x == mapWidth-1) {
                if(y == 0) {
                    if (x == 0) {
                        map[y][x] = 0; 
                    } else {
                        map[y][x] = 3;
                    }                    
                } else if ( y == mapHeight -1) { 
                    if (x == 0) {
                        map[y][x] = 32; 
                    } else {
                        map[y][x] = 35;
                    } 
                } else if (x == 0) {
                    map[y][x] = 16;
                } else {
                    map[y][x] = 19;
                }              
            } else {
                if (y == 0 || y == mapHeight -1) {
                    map[y][x] = 1
                } else {
                    map[y][x] = -1; //empty
                }                
            }
        }
    }
}

function spanCoin() {
    coin.x = Math.round(Math.random() * (GameEnvironement.graphics.resolutionX-16)+8);
    coin.y = Math.round(Math.random() * (GameEnvironement.graphics.resolutionY-16)+8);
}

function init() {
    player = new Player();
    coin = new Coin();

    createMap();
    engine.addMap('main-map', 'main', map);

    engine.addAudio('collect', 'assets/audio/collect_coin.wav');

    spanCoin();    
}

function collide(obj1, obj2) {
    if (obj1.y + obj1.h < obj2.y
        || obj1.y > obj2.y + obj2.h
        || obj1.x + obj1.w < obj2.x
        || obj1.x > obj2.x + obj2.w) return false;
     return true;
}

function UpdateGame(deltaTime) {
    //move player
    let right = GameEnvironement.input.cmdDown['right'];
    let left = GameEnvironement.input.cmdDown['left'];

    if((right &! left) || (left &! right)) {
        if(right) {
            player.x += player.speed * deltaTime/1000;
        }
        if(left) {
            player.x -= player.speed * deltaTime/1000;
        }
    }

    let up = GameEnvironement.input.cmdDown['up'];
    let down = GameEnvironement.input.cmdDown['down'];
    if((up &! down) || (down &! up)) {
        if(up) {
            player.y -= player.speed * deltaTime/1000;
        }
        if(down) {
            player.y += player.speed * deltaTime/1000;
        }
    } 
    
    //check if player is ontop of coin
    if(collide(player, coin)) {

        GameEnvironement.sounds.sfx['collect'].play();
        spanCoin();

        player.score += 1;
    }
}

function drawObject(canvasHandler, object) {
    canvasHandler.drawSprite(object.sprite, 'main',  object.x, object.y);
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();

    canvasHandler.drawMap('main-map', 0, 0);
    canvasHandler.drawSprite(20, 'main', 20, 20, true)
    canvasHandler.drawSprite(20, 'main', 20, 28, false)
    canvasHandler.drawSprite(20, 'main', 28, 20, false, true)

    drawObject(canvasHandler, player);
    drawObject(canvasHandler, coin);

    canvasHandler.drawText("fps: " + Math.round(GameEnvironement.properties.actual_fps), 5, 14, 1, 100)
    canvasHandler.drawText("score: " + player.score, 130, 14, 1, 100)
    
}

GameEnvironement.gameName = 'Saturn91 - get the woman!';
GameEnvironement.functions.update = UpdateGame;
GameEnvironement.functions.draw = DrawGame;
GameEnvironement.functions.init = init;
GameEnvironement.graphics.pixelPerfect = false;
GameEnvironement.graphics.fps = 60;
GameEnvironement.graphics.autoFitScreen = true;

addSpriteSheet('main', './assets/spriteSheet.png'); //spritesheet made by: https://opengameart.org/content/mini-roguelike-8x8-tiles

const engine = new Engine();
