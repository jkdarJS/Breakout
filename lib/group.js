import { Rectangle } from "./rectangle.js";
export class Group extends Rectangle {
    constructor(position, size) {
        super(position, size);
        this.children = [];
    }
    remove(node) {
        for (let i = 0; i < this.children.length; i++) {
            const elem = this.children[i];
            if (elem != node)
                continue;
            this.children.splice(i, 1);
            break;
        }
    }
    add(node) {
        this.children.push(node);
        node.parent = this;
    }
    update() {
    }
}
