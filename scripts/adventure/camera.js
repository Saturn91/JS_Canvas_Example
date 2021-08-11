class Camera {
    static Singleton;
    constructor() {
        this.target = undefined;
        this.position = new Vector2f(0,0);
        this.cameraOffset = new Vector2f();
        this.width = GameEnvironement.graphics.resolutionX;
        this.height = GameEnvironement.graphics.resolutionY;
        this.updatePosition();
        Camera.Singleton = this;
    }

    setTarget(object) {
        this.target = object;
    }

    update() {
        this.position.setValue(this.target.x+this.target.width/2, this.target.y + this.target.height/2);
        this.updatePosition();
    }

    updatePosition() {
        this.cameraOffset.setValue(this.position.x-this.width/2, this.position.y-this.height/2);
    }

    calcOffsetX(x) {
        return x - this.cameraOffset.x;
    }

    calcOffsetY(y) {
        return y - this.cameraOffset.y;
    }
}