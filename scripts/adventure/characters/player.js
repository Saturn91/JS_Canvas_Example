class Player {
    constructor() {
        this.x = GameEnvironement.graphics.resolutionX/2 - 4;
        this.y = GameEnvironement.graphics.resolutionY/2 - 4;
        this.w = 8;
        this.h = 8;
        this.speed = 40;
        this.sprite = 4;
        this.animations = {};
        this.actualAnimation = 'idle';
        this.lastAnimation = this.actualAnimation;
        this.defineAnimations();
    }

    defineAnimations() {
        this.animations['idle'] = new SpriteAnimation('player-idle', [
            new Sprite(4, 'char1_sprites'),
            new Sprite(5, 'char1_sprites')
        ],
        [
            500,
            500
        ]
        );
        this.animations['idle'].play(true);

        this.animations['walk_right'] = new SpriteAnimation('player-walk-right', 
        [
            new Sprite(0, 'char1_sprites'),
            new Sprite(2, 'char1_sprites'),
            new Sprite(0, 'char1_sprites'),
            new Sprite(3, 'char1_sprites')],
        [   200,
            200,
            200,
            200]
        );

        this.animations['walk_left'] = new SpriteAnimation('player-walk-left', 
        [
            new Sprite(0, 'char1_sprites', true),
            new Sprite(2, 'char1_sprites', true),
            new Sprite(0, 'char1_sprites', true),
            new Sprite(3, 'char1_sprites', true)],
        [   200,
            200,
            200,
            200]
        );

        this.animations['walk_up'] = new SpriteAnimation('player-walk-up', 
        [
            new Sprite(8, 'char1_sprites', true),
            new Sprite(10, 'char1_sprites', true),
            new Sprite(8, 'char1_sprites', true),
            new Sprite(11, 'char1_sprites', true)],
        [   200,
            200,
            200,
            200]
        );

        this.animations['walk_down'] = new SpriteAnimation('player-walk-down', 
        [
            new Sprite(4, 'char1_sprites', true),
            new Sprite(6, 'char1_sprites', true),
            new Sprite(4, 'char1_sprites', true),
            new Sprite(7, 'char1_sprites', true)],
        [   200,
            200,
            200,
            200]
        );
    }

    draw(canvasHandler) {
        if(this.actualAnimation != this.lastAnimation) {
            this.animations[this.actualAnimation].play(true);
        }
        this.lastAnimation = this.actualAnimation;

        this.animations[this.actualAnimation].draw(canvasHandler, this.x, this.y)
    }

    update(deltaTime) {
        //move player
        let right = GameEnvironement.input.cmdDown['right'];
        let left = GameEnvironement.input.cmdDown['left'];

        this.actualAnimation = 'idle'

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

        this.animations[this.actualAnimation].update();
    }
}