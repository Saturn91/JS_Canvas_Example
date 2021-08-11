class Camera {
    static Singleton;
    constructor() {
        this.target = undefined;
        this.position = new Vector2f(0,0);
        this.cameraOffset = new Vector2f();
        this.width = GameEnvironement.graphics.resolutionX;
        this.height = GameEnvironement.graphics.resolutionY;
        this.min = undefined;
        this.max = undefined;
        this.updatePosition();
        Camera.Singleton = this;
    }

    setBoundries(min, max) {
        this.min = new Vector2f(min.x + this.width / 2, min.y + this.height / 2);
        this.max = new Vector2f(max.x - this.width / 2, max.y - this.height / 2);
    }

    setTarget(object) {
        this.target = object;
    }

    update() {
        this.position.setValue(this.target.x+this.target.width/2, this.target.y + this.target.height/2);
        this.clampPositionToMinMax();
        this.updatePosition();
    }

    updatePosition() {
        this.cameraOffset.setValue(this.private_calcOffset(this.position.x, this.width), this.private_calcOffset(this.position.y, this.height));
    }

    private_calcOffset(pos, length){
        return pos - length/2;
    }

    calcOffsetX(x) {
        return x - this.cameraOffset.x;
    }

    calcOffsetY(y) {
        return y - this.cameraOffset.y;
    }

    clampPositionToMinMax() {
        if(this.min && this.max) {
            if(this.position.x < this.min.x) this.position.x = this.min.x;
            if(this.position.x > this.max.x) this.position.x = this.max.x;

            if(this.position.y < this.min.y) this.position.y = this.min.y;
            if(this.position.y > this.max.y) this.position.y = this.max.y;
        }        
    }
}