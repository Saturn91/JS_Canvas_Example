//Example ussage
class Player {
    constructor() {
        this.x = GameEnvironement.graphics.resolutionX/2 - 4;
        this.y = GameEnvironement.graphics.resolutionY/2 - 4;
        this.w = 8;
        this.h = 8;
        this.speed = 40;
        this.sprite = 0;
        this.score = 0;
    }
}

class Coin {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 8;
        this.h = 8;
        this.sprite = 1;
    }
}

let player;
let coin;

function spanCoin() {
    coin.x = Math.round(Math.random() * (GameEnvironement.graphics.resolutionX-8));
    coin.y = Math.round(Math.random() * (GameEnvironement.graphics.resolutionY-8));
}

function init() {
    player = new Player();
    coin = new Coin();
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
        spanCoin();
        player.score += 1;
    }
}

function drawObject(canvasHandler, object) {
    canvasHandler.drawSprite(object.sprite, object.x, object.y);
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();
    
    drawObject(canvasHandler, player);
    drawObject(canvasHandler, coin);
    canvasHandler.drawText("fps: " + Math.round(GameEnvironement.properties.actual_fps), 2, 7, 1, 100)
    canvasHandler.drawText("score: " + player.score, 135, 7, 1, 100)
}

GameEnvironement.gameName = 'Saturn91 - coin Collector';
GameEnvironement.functions.update = UpdateGame;
GameEnvironement.functions.draw = DrawGame;
GameEnvironement.functions.init = init;

GameEnvironement.graphics.pixelPerfect = false;

GameEnvironement.graphics.fps = 60;

const engine = new Engine();

