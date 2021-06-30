import { Node } from "./node.js";
export class Circle extends Node {
    constructor(position, radius) {
        super(position);
        this.radius = radius;
    }
    getPath() {
        var cir = new Path2D();
        var pos = this.getPositionToScene();
        cir.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2, false);
        return cir;
    }
}
