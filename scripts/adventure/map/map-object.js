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

    draw(canvasHandler) {
        if(this.drawMethode) this.drawMethode(canvasHandler, this.x, this.y);
    }
}