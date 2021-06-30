import { Vector2DConfig } from "./config.js";
import { Vector2D } from "./math.js";
import { Node } from "./node.js";

export class Circle extends Node {
    radius: number;
    constructor(position: Vector2D | Vector2DConfig, radius: number) {
        super(position);
        this.radius = radius;
    }

    getPath(): Path2D {
        var cir = new Path2D();
        var pos = this.getPositionToScene();
        cir.arc(pos.x, pos.y, this.radius, 0, Math.PI*2, false);
        return cir;
    }
}