

const GameEnvironement = {
    gameName: "Saturn91-Engine",
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
        clearColor: 0,
        pixelPerfect: false,
        maps: {}
    },  

    functions: {
        init: undefined,
        update: undefined,
        draw: undefined
    },  

    input: {
        cmdsOnKeys: [
            {name: 'up', keys: ['w', 'ArrowUp']},
            {name: 'right', keys: ['d', 'ArrowRight']},
            {name: 'down', keys: ['s', 'ArrowDown']},
            {name: 'left', keys: ['a', 'ArrowLeft']},
            {name: 'jump', keys: [' ', 'x']},
            {name: 'fire', keys: ['c']}
        ],
        cmdsUp: {},
        keyMap: {},
        cmdDown: {}
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

        document.getElementById('game-name').innerText = GameEnvironement.gameName;
        document.title = GameEnvironement.gameName;

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
        
        updateControls();
        
        window.requestAnimationFrame(GameEnvironement.loop)
    }

    start() {        
        GameEnvironement.properties.actual_fps = GameEnvironement.graphics.fps;
        GameEnvironement.internaly.lastUpdate = 0
        SetupControls();
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

    setMap(mapName, mapData) {
        GameEnvironement.internaly.canvas.loadMapAsResource(mapName, mapData);
    }
}

function updateControls() {
    for(let i = 0; i < GameEnvironement.input.cmdsOnKeys.length; i++) {
        let oldValue = GameEnvironement.input.cmdDown[GameEnvironement.input.cmdsOnKeys[i].name];
        let value = false;
        for(let j = 0; j < GameEnvironement.input.cmdsOnKeys[i].keys.length; j++) {
            value = GameEnvironement.input.keyMap[GameEnvironement.input.cmdsOnKeys[i].keys[j]] || value;
        }
        GameEnvironement.input.cmdDown[GameEnvironement.input.cmdsOnKeys[i].name] = value;
        oldValue &! value ? GameEnvironement.input.cmdsUp[GameEnvironement.input.cmdsOnKeys[i].name] = true: GameEnvironement.input.cmdsUp[GameEnvironement.input.cmdsOnKeys[i].name] = false;
    }
}

onkeydown = onkeyup = function(e){
    GameEnvironement.input.keyMap[e.key] = e.type == 'keydown';
}

function SetupControls() {
    
    document.addEventListener('keydown', (e) => {
        onkeydown(e);
    });

    document.addEventListener('keyup', (e) => {
        onkeyup(e);
    });
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

function clearAllCMS() {
    GameEnvironement.input.cmdsOnKeys = [];
}

function AddCMD(cmdName, keyCodes) {
    let cmd = undefined;
    for(let i = 0; i < GameEnvironement.input.cmdsOnKeys.length; i++) {
        if(GameEnvironement.input.cmdsOnKeys[i]. name === cmdName) {
            cmd = GameEnvironement.input.cmdsOnKeys[i];
            break;
        }
    }

    if(!cmd) {
        GameEnvironement.input.cmdsOnKeys.push({name: cmdName, keys: keyCodes});
    } else {
        for(let i = 0; i < keyCodes.length; i++) {
            let exists = false;
            for(let j = 0; j < cmd.keys.length; j++) {
                if(cmd.keys[j] === keyCodes[i]) {
                    exists = true;
                    console.warn('cmd: ' + cmd.keys[j] + ' does already exist in ' + cmd.name);
                    break;
                }
            }

            if(!exists) GameEnvironement.input.cmdsOnKeys.push(keyCodes[i]);
        }
    }
}

function RemCMD(cmdName) {
    for(let i = 0; i < GameEnvironement.input.cmdsOnKeys.length; i++) {
        if(GameEnvironement.input.cmdsOnKeys[i].name === cmdName) {
            GameEnvironement.input.cmdsOnKeys.splice(i,1);
            return;
        }
    }
    let definedCMDs = '[';
    for(let i = 0; i < GameEnvironement.input.cmdsOnKeys.length; i++) {
        definedCMDs += GameEnvironement.input.cmdsOnKeys[i].name + ','
    }
    definedCMDs += ']';

    console.error('cmd: ' + cmdName + ' does not exist, or was already removed... defined cmds: ' + definedCMDs);
}
