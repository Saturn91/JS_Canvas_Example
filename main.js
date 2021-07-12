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
    player.x += deltaTime / 1000 * player.speed;
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();
    
    canvasHandler.drawSprite(1, 64, 0);
    canvasHandler.drawSprite(8, 64, 64);

    canvasHandler.drawSprite(0, player.x,player.y);
}

GameEnvironement.functions.update = UpdateGame;
GameEnvironement.functions.draw = DrawGame;
GameEnvironement.functions.init = init;
GameEnvironement.properties.debug = true;
GameEnvironement.graphics.tileSize = 8

const engine = new Engine();

