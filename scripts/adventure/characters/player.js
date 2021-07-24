class Player {
    constructor() {
        this.x = GameEnvironement.graphics.resolutionX/2 - 4;
        this.y = GameEnvironement.graphics.resolutionY/2 - 4;
        this.w = 8;
        this.h = 8;
        this.speed = 40;
        this.sprite = 4;

        this.defineAnimations();
    }

    defineAnimations() {

    }
}