class Sprite {
    constructor(spriteNum, spriteSheetName, flipX, flipY) {
        if(flipX && flipY) {
            console.error('flipX and flipY cannot both be true!');
            return;
        }
        this.spriteNum = spriteNum;
        this.spriteSheetName = spriteSheetName;
        this.flipX = flipX;
        this.flipY = flipY;        
    }

    draw(canvasHandler,x ,y) {
        canvasHandler.drawSprite(
            this.spriteNum, 
            this.spriteSheetName,
            x, y, 
            this.flipX, 
            this.flipY);
    }
}