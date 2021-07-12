const GameEnvironement = {
    name: "myGame",
    canvasID: 'canvasObject',
    graphics: {
        width: undefined,
        height: undefined,
        fps: 60,
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
        canvas: undefined
    }
}

class Engine {
    constructor() {
        GameEnvironement.internaly.canvas = new CanvasHandler(GameEnvironement.canvasID, GameEnvironement.graphics.width, GameEnvironement.graphics.height)
        GameEnvironement.loop = this.loop;
        if(GameEnvironement.graphics.fps > 60) {
            console.warn('60 fps is the maximal value possible [' + GameEnvironement.graphics.fps + "] gets clamped to 60!");
        }
        setTimeout(this.waitForInitialization(), 100);
    }

    loop(timestamp) {
        let inputFPS = 120;
        if(GameEnvironement.graphics.fps < 60) {
            inputFPS = GameEnvironement.graphics.fps;
        }

        if(timestamp - GameEnvironement.internaly.lastUpdate >= 1000/(inputFPS)) {
            let timeDelta = timestamp - GameEnvironement.internaly.lastUpdate
    
            if(GameEnvironement.functions.update) GameEnvironement.functions.update(timeDelta)
            if(GameEnvironement.functions.draw) GameEnvironement.functions.draw(GameEnvironement.internaly.canvas)
        
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

    waitForInitialization(){
        if(!GameEnvironement.internaly.canvas) {
            console.log('nope...');
            setTimeout(this, 100);
        } else {
            if(GameEnvironement.properties.debug) {
                console.log('Engine initialized!');
            }            
            this.start();
        }        
    }

    debug(msg, component, type) {
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
        if(type='warning') {
            console.warn(output);
            return
        }
        if(type='error') {
            console.error(output);
            return
        }
    }
}
  