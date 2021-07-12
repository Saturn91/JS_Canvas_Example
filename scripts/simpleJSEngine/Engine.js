const GameEnvironement = {
    name: "myGame",
    canvasID: 'canvasObject',
    width: undefined,
    height: undefined,
    init: undefined,
    update: undefined,
    draw: undefined,
    fps: 60,
    clearColor: 0,
    internaly: {
        loop: undefined,
        lastUpdate: 0,
        canvas: undefined
    }
}

class Engine {
    constructor() {
        GameEnvironement.internaly.canvas = new CanvasHandler(GameEnvironement.canvasID, GameEnvironement.width, GameEnvironement.height)
        GameEnvironement.loop = this.loop;
        setTimeout(this.waitForInitialization(), 100);
    }

    loop(timestamp) {
        if(timestamp - GameEnvironement.internaly.lastUpdate > 1000/GameEnvironement.fps) {
            let timeDelta = timestamp - GameEnvironement.internaly.lastUpdate
    
            if(GameEnvironement.update) GameEnvironement.update(timeDelta)
            GameEnvironement.internaly.canvas.setBackgroundColor(0);
            if(GameEnvironement.draw) GameEnvironement.draw(GameEnvironement.internaly.canvas)
        
            GameEnvironement.internaly.lastUpdate = timestamp
        }        
        window.requestAnimationFrame(GameEnvironement.loop)
    }

    start() {        
        GameEnvironement.internaly.lastUpdate = 0
        if(GameEnvironement.init) GameEnvironement.init();
        window.requestAnimationFrame(GameEnvironement.loop)
    }

    waitForInitialization(){
        if(!GameEnvironement.internaly.canvas) {
            console.log('nope...');
            setTimeout(this, 100);
        } else {
            console.log('Engine initialized!')
            this.start();
        }        
    }
}
  