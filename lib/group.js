import { Rectangle } from "./rectangle.js";
export class Group extends Rectangle {
    constructor(position, size) {
        super(position, size);
        this.children = [];
    }
    add(node) {
        this.children.push(node);
        node.parent = this;
    }
}
