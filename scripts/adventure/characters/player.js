class Player {
    
    constructor() {
        this.x = GameEnvironement.graphics.resolutionX/2 - 8;
        this.y = GameEnvironement.graphics.resolutionY/2 - 16;
        this.width = 8;
        this.height = 16;
        this.speed = 40;
        this.sprite = 4;
        this.animations = {};
        this.actualAnimation = 'idle';
        this.lastAnimation = this.actualAnimation;
        this.playerSpriteSheet = 'char1_sprites';
        this.defineAnimations();
    }

    defineAnimations() {
        this.animations['idle'] = new SpriteAnimation('player-idle', [
            new Sprite(4, this.playerSpriteSheet),
            new Sprite(5, this.playerSpriteSheet)
        ],
        [
            500,
            500
        ]
        );
        this.animations['idle'].play(true);

        this.animations['walk_right'] = new SpriteAnimation('player-walk-right', 
        [
            new Sprite(0, this.playerSpriteSheet),
            new Sprite(2, this.playerSpriteSheet),
            new Sprite(0, this.playerSpriteSheet),
            new Sprite(3, this.playerSpriteSheet)],
        [   200,
            200,
            200,
            200]
        );
        this.animations['walk_right'].setDurationMultiplier(1.5);

        this.animations['walk_left'] = new SpriteAnimation('player-walk-left', 
        [
            new Sprite(0, this.playerSpriteSheet, true),
            new Sprite(2, this.playerSpriteSheet, true),
            new Sprite(0, this.playerSpriteSheet, true),
            new Sprite(3, this.playerSpriteSheet, true)],
        [   200,
            200,
            200,
            200]
        );
        this.animations['walk_left'].setDurationMultiplier(1.5);

        this.animations['walk_up'] = new SpriteAnimation('player-walk-up', 
        [
            new Sprite(8, this.playerSpriteSheet, true),
            new Sprite(10, this.playerSpriteSheet, true),
            new Sprite(8, this.playerSpriteSheet, true),
            new Sprite(11, this.playerSpriteSheet, true)],
        [   200,
            200,
            200,
            200]
        );
        this.animations['walk_up'].setDurationMultiplier(1.5);

        this.animations['walk_down'] = new SpriteAnimation('player-walk-down', 
        [
            new Sprite(4, this.playerSpriteSheet, true),
            new Sprite(6, this.playerSpriteSheet, true),
            new Sprite(4, this.playerSpriteSheet, true),
            new Sprite(7, this.playerSpriteSheet, true)],
        [   200,
            200,
            200,
            200]
        );
        this.animations['walk_down'].setDurationMultiplier(1.5);
    }

    draw(canvasHandler) {
        if(this.actualAnimation != this.lastAnimation) {
            this.animations[this.actualAnimation].play(true);
        }
        this.lastAnimation = this.actualAnimation;

        this.animations[this.actualAnimation].draw(canvasHandler, Camera.Singleton.calcOffsetX(this.x), Camera.Singleton.calcOffsetY(this.y))
    }

    update(deltaTime) {
        //move player
        let right = GameEnvironement.input.cmdDown['right'];
        let left = GameEnvironement.input.cmdDown['left'];

        this.actualAnimation = 'idle'        

        let up = GameEnvironement.input.cmdDown['up'];
        let down = GameEnvironement.input.cmdDown['down'];
        if((up &! down) || (down &! up)) {
            if(up) {
                this.y -= this.speed * deltaTime/1000;
                this.actualAnimation = 'walk_up';
            }
            if(down) {
                this.y += this.speed * deltaTime/1000;
                this.actualAnimation = 'walk_down';
            }
        }

        if((right &! left) || (left &! right)) {
            if(right) {
                this.x += this.speed * deltaTime/1000;
                this.actualAnimation = 'walk_right';
            }
            if(left) {
                this.x -= this.speed * deltaTime/1000;
                this.actualAnimation = 'walk_left';
            }
        }

        this.animations[this.actualAnimation].update();
    }
}