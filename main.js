let player;
let map;

function init() {
    player = new Player();
    camera = new Camera();
    map = new MapManager();   
    camera.setTarget(player);
}

function UpdateGame(deltaTime) {
    player.update(deltaTime);
    camera.update();
}

function drawObject(canvasHandler, object) {
    canvasHandler.drawSprite(object.sprite, 'char1_sprites',  object.x, object.y);
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();

    map.drawBehindPlayer(canvasHandler, player);
    player.draw(canvasHandler);
    map.drawInFrontOfPlayer(canvasHandler, player);

    canvasHandler.drawText("fps: " + Math.round(GameEnvironement.properties.actual_fps), 2, 7, '#ffffff', 100);
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
GameEnvironement.graphics.clearColor = '#00E436';

MapObject.showCollider = true;

initSpriteSheets();

const engine = new Engine();
