class Player extends Character {
    constructor(x, y) {
        super(x, y, 'char1_sprites');
    }
    

    update(deltaTime) {
        
        let transformX = 0;
        let transformY = 0;

        let up = GameEnvironement.input.cmdDown['up'];
        let down = GameEnvironement.input.cmdDown['down'];
        if((up &! down) || (down &! up)) {
            transformY += up ? -this.speed * deltaTime/1000 : this.speed * deltaTime/1000;
        }

        let right = GameEnvironement.input.cmdDown['right'];
        let left = GameEnvironement.input.cmdDown['left'];
        if((right &! left) || (left &! right)) {
            transformX += right ? this.speed * deltaTime/1000 : -this.speed * deltaTime/1000
        }


        super.update(deltaTime, transformX, transformY)
    }
}