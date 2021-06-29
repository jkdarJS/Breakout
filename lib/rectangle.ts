import { Size, Vector2D } from "./math.js";
import { Node } from "./node.js";

export class Rectangle extends Node {
    size: Size;
    constructor(position: Vector2D, size: Size) {
        super(position);
        this.size = size;
    }
}