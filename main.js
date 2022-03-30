let player;
let testNPC;
let map;

function init() {
    player = new Player(GameEnvironement.graphics.resolutionX/2 - 8, GameEnvironement.graphics.resolutionY/2 - 16);
    testNPC = new TestNPC(32,32);
    camera = new Camera();
    map = new MapManager();  
    map.addObject(player);
    map.addObject(testNPC);
    camera.setTarget(player);
    AddCMD('interact', 'e');
    engine.addAudio('bump', './assets/bump.wav');
    engine.addAudio('baaaoooo', './assets/synth.wav');
}

function UpdateGame(deltaTime) {
    map.update();
    player.update(deltaTime);
    camera.update();
}

function drawObject(canvasHandler, object) {
    canvasHandler.drawSprite(object.sprite, 'char1_sprites',  object.x, object.y);
}

function DrawGame(canvasHandler) {
    canvasHandler.cls();

    map.draw(canvasHandler);

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

initSpriteSheets();

const engine = new Engine();
