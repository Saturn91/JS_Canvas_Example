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
    player.x += (deltaTime/1000) * player.speed;
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();
    
    canvasHandler.drawSprite(1, 64, 0);
    canvasHandler.drawSprite(1, 64.5, 8);
    canvasHandler.drawSprite(8, 64, 16);
    canvasHandler.drawSprite(0, player.x,24);
    canvasHandler.drawText("fps: " + Math.round(GameEnvironement.properties.actual_fps), 2, 7, 1, 100)
}

GameEnvironement.functions.update = UpdateGame;
GameEnvironement.functions.draw = DrawGame;
GameEnvironement.functions.init = init;

GameEnvironement.graphics.fps = 60;

const engine = new Engine();

