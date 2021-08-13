class MapObject {
    static showCollider = false;
    constructor(xPos, yPos, width, height, collider) {
        this.x = xPos;
        this.y = yPos;
        this.width = width;
        this.height = height;
        this.drawMethode = undefined;
        this.collider = collider;
    }

    setDraw(drawMethode) {
        this.drawMethode = drawMethode;
    }

    draw(canvasHandler, x, y) {
        if(this.drawMethode){
            if(!x) x = this.x;
            if(!y) y = this.y;
            this.drawMethode(canvasHandler, Camera.Singleton.calcOffsetX(x), Camera.Singleton.calcOffsetY(y));
            if(MapObject.showCollider && this.collider) this.drawCollider(canvasHandler, x, y);
        } 
    }

    drawCollider(canvasHandler, x, y) {
        let c = this.getCollider(x,y);
        canvasHandler.fillRect(Camera.Singleton.calcOffsetX(c.x), Camera.Singleton.calcOffsetY(c.y), c.width, c.height, '#ff000099');
    }

    collidesWidth(rect, x, y) {
        return collide(rect, this.getCollider(x, y));
    }

    getCollider(x, y) {
        if(!x) x = this.x;
        if(!y) y = this.y;
        return new Rect(x + this.collider.x, y + this.collider.y, this.collider.width, this.collider.height);
    }
}