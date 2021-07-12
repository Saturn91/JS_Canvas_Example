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
}

function UpdateGame(deltaTime) {
    player.x += deltaTime / 1000 * player.speed;
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();
    canvasHandler.fillRect(player.x,player.y,50,50,1)
}

GameEnvironement.functions.update = UpdateGame;
GameEnvironement.functions.draw = DrawGame;
GameEnvironement.functions.init = init;

const engine = new Engine();

