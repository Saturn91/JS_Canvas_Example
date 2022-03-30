class Character extends MapObject {
    constructor(x, y, spriteSheet) {
        super(0,0,4*16,5*16, 16, new Rect(4, 11, 8, 5));
        super.setDraw((canvasHandler) => {
            if(this.actualAnimation != this.lastAnimation) {
                this.animations[this.actualAnimation].play(true);
            }
            this.lastAnimation = this.actualAnimation;
    
            this.animations[this.actualAnimation].draw(canvasHandler, Camera.Singleton.calcOffsetX(this.x), Camera.Singleton.calcOffsetY(this.y))
        });

        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 16;
        this.speed = 40;
        this.sprite = 4;
        this.animations = {};
        this.actualAnimation = 'idle';
        this.lastAnimation = this.actualAnimation;
        this.spriteSheet = spriteSheet;
        this.defineAnimations();
    }

    defineAnimations() {
        this.animations['idle'] = new SpriteAnimation('player-idle', [
            new Sprite(4, this.spriteSheet),
            new Sprite(5, this.spriteSheet)
        ],
        [
            500,
            500
        ]
        );
        this.animations['idle'].play(true);

        this.animations['walk_right'] = new SpriteAnimation('player-walk-right', 
        [
            new Sprite(0, this.spriteSheet),
            new Sprite(2, this.spriteSheet),
            new Sprite(0, this.spriteSheet),
            new Sprite(3, this.spriteSheet)],
        [   200,
            200,
            200,
            200]
        );
        this.animations['walk_right'].setDurationMultiplier(1.5);

        this.animations['walk_left'] = new SpriteAnimation('player-walk-left', 
        [
            new Sprite(0, this.spriteSheet, true),
            new Sprite(2, this.spriteSheet, true),
            new Sprite(0, this.spriteSheet, true),
            new Sprite(3, this.spriteSheet, true)],
        [   200,
            200,
            200,
            200]
        );
        this.animations['walk_left'].setDurationMultiplier(1.5);

        this.animations['walk_up'] = new SpriteAnimation('player-walk-up', 
        [
            new Sprite(8, this.spriteSheet, true),
            new Sprite(10, this.spriteSheet, true),
            new Sprite(8, this.spriteSheet, true),
            new Sprite(11, this.spriteSheet, true)],
        [   200,
            200,
            200,
            200]
        );
        this.animations['walk_up'].setDurationMultiplier(1.5);

        this.animations['walk_down'] = new SpriteAnimation('player-walk-down', 
        [
            new Sprite(4, this.spriteSheet, true),
            new Sprite(6, this.spriteSheet, true),
            new Sprite(4, this.spriteSheet, true),
            new Sprite(7, this.spriteSheet, true)],
        [   200,
            200,
            200,
            200]
        );
        this.animations['walk_down'].setDurationMultiplier(1.5);
    }

    update(deltaTime, transformX, transformY) {
        if(!transformX) transformX = 0;
        if(!transformY) transformY = 0;

        //animate character
        this.actualAnimation = 'idle'        

        if(transformY < 0) this.actualAnimation = 'walk_up';
        if(transformY > 0) this.actualAnimation = 'walk_down';
        if(transformX < 0) this.actualAnimation = 'walk_left';
        if(transformX > 0) this.actualAnimation = 'walk_right';        

        //check position
        let result = map.isWalkable(this, transformX, transformY);
        if(result.walkableX) this.x += transformX; else engine.playAudio('bump');
        if(result.walkableY) this.y += transformY; else engine.playAudio('bump');

        this.animations[this.actualAnimation].update();
    }
}