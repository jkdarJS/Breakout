import { Size, Vector2D } from "./math.js";
import { Node } from "./node.js";
import { Rectangle } from "./rectangle.js";

export class Group extends Rectangle {
    children: Node[] = [];
     
    constructor(position: Vector2D, size: Size) {
        super(position, size);
    }

    remove(node: Node) {
        for (let i = 0; i < this.children.length; i++) {
            const elem = this.children[i];
            if(elem != node) continue;
            this.children.splice(i, 1);
            break;
        }
    }

    add(node: Node) {
        this.children.push(node);
        node.parent = this;
    }

    update(): void{

    }
}