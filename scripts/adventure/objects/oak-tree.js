class OakTree extends MapObject {
    constructor(x, y) {
        super(x,y,4*16,5*16);
        super.setDraw((canvasHandler, x, y) => {
            canvasHandler.drawMap('tree1', x, y);
        });
    }
}