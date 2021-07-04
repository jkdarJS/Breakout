import { RoundRect } from "./rectangle.js";
export class Group extends RoundRect {
    constructor(position, size, scene) {
        super(position, size);
        this.children = [];
        this.scene = scene;
        this.style.borderRadius = 0;
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
        if (this.scene != null) {
            node.scene = this.scene;
        }
    }
    update() {
    }
}
