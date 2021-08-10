class MapObject {
    constructor(xPos, yPos, width, height) {
        this.x = xPos;
        this.y = yPos;
        this.width = width;
        this.height = height;
        this.drawMethode = undefined;
    }

    setDraw(drawMethode) {
        this.drawMethode = drawMethode;
    }

    draw(canvasHandler, x, y) {
        if(this.drawMethode){
            if(!x) x = this.x;
            if(!y) y = this.y;
            this.drawMethode(canvasHandler, x - Camera.Singleton.cameraOffset.x, y - Camera.Singleton.cameraOffset.y);
        } 
    }
}