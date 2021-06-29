import { Vector2D } from "./math.js";
import { Node } from "./node.js";

export class Circle extends Node {
    radius: number;
    constructor(position: Vector2D, radius: number) {
        super(position);
        this.radius = radius;
    }
}