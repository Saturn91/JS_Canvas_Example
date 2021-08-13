class OakTree extends MapObject {
    constructor(x, y) {
        super(x,y,4*16,5*16, 4.75*16, new Rect(1.25*16, 4.5*16, 1.5*16, 0.5*16));
        super.setDraw((canvasHandler, x, y) => {
            canvasHandler.drawMap('tree1', x, y);
        });
    }
}