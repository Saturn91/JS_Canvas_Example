let map = [];

let player;

function init() {
    player = new Player();
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
}

function drawObject(canvasHandler, object) {
    canvasHandler.drawSprite(object.sprite, 'main',  object.x, object.y);
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();

    drawObject(canvasHandler, player);

    canvasHandler.drawText("fps: " + Math.round(GameEnvironement.properties.actual_fps), 2, 7, 1, 100)    
}

GameEnvironement.gameName = 'An Adventure!';
GameEnvironement.functions.update = UpdateGame;
GameEnvironement.functions.draw = DrawGame;
GameEnvironement.functions.init = init;
GameEnvironement.graphics.pixelPerfect = false;
GameEnvironement.graphics.fps = 60;
GameEnvironement.graphics.autoFitScreen = true;
GameEnvironement.graphics.resolutionX = 200;
GameEnvironement.graphics.resolutionY = 150;

addSpriteSheet('main', './assets/char_1_sheet.png', undefined, 16);

const engine = new Engine();
