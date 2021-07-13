const GameEnvironement = {
    name: "myGame",
    canvasID: 'canvasObject',

    initialized: {
        ready: false,
        canvas: false
    },

    graphics: {
        windowWidth: 640,
        windowHeight: 512,
        resolutionX: 160,
        resolutionY: 128,
        fps: 60,
        tileSize: 8,
        clearColor: 0
    },  

    functions: {
        init: undefined,
        update: undefined,
        draw: undefined  
    },  

    properties: {
        debug: false,
        actual_fps: 0,
        fps_update_rate_ms: 1000,
        last_fps_update: 0
    },

    internaly: {
        loop: undefined,
        lastUpdate: 0,
        canvas: undefined,
        engine: undefined
    }
}

class Engine {
    constructor() {
        new CanvasHandler(GameEnvironement.canvasID, GameEnvironement.graphics.windowWidth, GameEnvironement.graphics.windowHeight)
        GameEnvironement.loop = this.loop;
        if(GameEnvironement.graphics.fps > 60) {
            console.warn('60 fps is the maximal value possible [' + GameEnvironement.graphics.fps + "] gets clamped to 60!");
        }
        setTimeout(this.waitForInitialization(), 100);

        GameEnvironement.internaly.engine = this;
    }

    loop(timestamp) {
        let inputFPS = 120;
        if(GameEnvironement.graphics.fps < 60) {
            inputFPS = GameEnvironement.graphics.fps;
        }
        
        if(timestamp - GameEnvironement.internaly.lastUpdate >= 1000/(inputFPS)) {
            let timeDelta = timestamp - GameEnvironement.internaly.lastUpdate
            if(GameEnvironement.functions.update) GameEnvironement.functions.update(timeDelta)
            GameEnvironement.internaly.canvas.ctx.save();
            if(GameEnvironement.functions.draw) GameEnvironement.functions.draw(GameEnvironement.internaly.canvas)
            GameEnvironement.internaly.canvas.ctx.restore();
            GameEnvironement.internaly.lastUpdate = timestamp

            GameEnvironement.properties.actual_fps = ((GameEnvironement.properties.actual_fps-1) * 0.99 + 0.01 *  1000/timeDelta)+1; 

            if(timestamp - GameEnvironement.properties.last_fps_update > GameEnvironement.properties.fps_update_rate_ms && GameEnvironement.properties.debug) {
                GameEnvironement.properties.last_fps_update = timestamp;
                console.log("actual fps: " + Math.floor(GameEnvironement.properties.actual_fps) + " last timeDelta: " + Math.floor(timeDelta) + "ms");
            }
        }  
        
        
        window.requestAnimationFrame(GameEnvironement.loop)
    }

    start() {        
        GameEnvironement.properties.actual_fps = GameEnvironement.graphics.fps;
        GameEnvironement.internaly.lastUpdate = 0
        if(GameEnvironement.functions.init) GameEnvironement.functions.init();
        window.requestAnimationFrame(GameEnvironement.loop)
    }

    waitForInitialization() {
        GameEnvironement.initialized.ready = GameEnvironement.initialized.canvas;

        if(!GameEnvironement.initialized.ready) {
            if(GameEnvironement.properties.debug) {
                console.log('loading resources');
            }
            setTimeout(this.waitForInitialization, 100);
        } else {
            if(GameEnvironement.properties.debug) {
                console.log('Engine initialized!');
            }            
            GameEnvironement.internaly.engine.start();
        }        
    }
}

function debug(msg, component, type) {
    if(!component) {
        console.warn('please set componentName!');
        component = 'unknown Component!';
    }
    let output = component + ': ' + msg;
    if(!type && GameEnvironement.properties.debug)
    {
        console.log(output);
        return;
    } 
    if(type==='warning') {
        console.warn(output);
        return
    }
    if(type==='error') {
        console.error(output);
        return
    }
}
  