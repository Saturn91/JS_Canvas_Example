class SpriteAnimation {
    /**
     * Create Animation
     * @param {string} animationName 
     * @param {Array} sprites Array of Sprites (class Sprite)
     * @param {Array} durations Array of durations in ms per Sprite
     * @returns new Animation
     */
    constructor(animationName, sprites, durations) {
        this.animationName = animationName;
        if(sprites.length != durations.length) {
            debug('sprites.length and duration.lengths must be equals in: ' + animationName + "! Cancel creating animation...");
            return;
        }
        this.sprites = sprites;
        this.durations = durations;
        this.currentFrame = 0;
        this.playing = true;
        this.loop = false;
        this.lastUpdate = 0;
        this.durationMultiplier = 1;
    }

    /**
     * Call this function once every frame as long as the animation is playing
     */
    update() {
        if(this.playing && GameEnvironement.time - this.lastUpdate >= this.durations[this.currentFrame] / this.durationMultiplier) {
            this.currentFrame += 1
            if(this.currentFrame >= this.sprites.length) {
                this.currentFrame = 0;
            }

            this.lastUpdate = GameEnvironement.time;
        }
    }

    /**
     * call this function in GameEnvironement.functions.draw to dra the animation
     * @param {CanvasHandler} canvasHandler canvashandler parameter of the draw function
     * @param {number} x Coordinate on Screen
     * @param {number} y Coordinate on Screen
     */
    draw(canvasHandler, x, y) {
        this.sprites[this.currentFrame].draw(canvasHandler,x,y);
    }
    /**
     * start animation playing
     * @param {boolean} loop: keep animation playing until stop() is called
     * @param {number} frame: at which frame to start
     */
    play(loop, frame) {
        this.loop = loop;

        if(!this.playing) {
            if(frame) {
                this.currentFrame = clamp(frame, 0, this.sprites.length-1);
            } else {
                frame = 0;
            }
            this.lastUpdate = GameEnvironement.time;
            this.playing = true;
        }        
    }

    /**
     * stop animation from playing
     * @returns last fram which was active
     */
    stop() {
        this.playing = false;
        return this.currentFrame;
    }

    /**
     * Set the duration multiplier i.e. for a character with different speeds on the same animation, default value is 1
     * @param {number} multiplier 
     */
    setDurationMultiplier(multiplier) {
        this.durationMultiplier = multiplier;
    }
}