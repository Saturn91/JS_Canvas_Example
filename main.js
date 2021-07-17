//Example ussage
class Player{
    constructor() {
        this.x = 10;
        this.y = 10;
        this.speed = 20;
    }
}

let player;

function init() {
    player = new Player();
    debug("test", "init()");
}

function UpdateGame(deltaTime) {
    let right = GameEnvironement.input.keysDown['right'];
    let left = GameEnvironement.input.keysDown['left'];
    if((right &! left) || (left &! right)) {
        if(right) {
            player.x += player.speed * deltaTime/1000;
        }
        if(left) {
            player.x -= player.speed * deltaTime/1000;
        }
    }

    let up = GameEnvironement.input.keysDown['up'];
    let down = GameEnvironement.input.keysDown['down'];
    if((up &! down) || (down &! up)) {
        if(up) {
            player.y -= player.speed * deltaTime/1000;
        }
        if(down) {
            player.y += player.speed * deltaTime/1000;
        }
    }
    
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();
    
    canvasHandler.drawSprite(1, 64, 0);
    canvasHandler.drawSprite(1, 64.5, 8);
    canvasHandler.drawSprite(8, 64, 16);
    canvasHandler.drawSprite(0, player.x, player.y);
    canvasHandler.drawText("fps: " + Math.round(GameEnvironement.properties.actual_fps), 2, 7, 1, 100)
}

GameEnvironement.functions.update = UpdateGame;
GameEnvironement.functions.draw = DrawGame;
GameEnvironement.functions.init = init;

GameEnvironement.graphics.fps = 60;

const engine = new Engine();

