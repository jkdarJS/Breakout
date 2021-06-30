import { Size, Vector2D } from "./math.js";
import { Node } from "./node.js";
import { Rectangle } from "./rectangle.js";

export class Group extends Rectangle {
    children: Node[] = [];
    constructor(position: Vector2D, size: Size) {
        super(position, size);
    }

    add(node: Node) {
        this.children.push(node);
        node.parent = this;
    }
}