import { Button } from "./button.js";
import { Size, Vector2D } from "./math.js";
import { Node } from "./node.js";
import { RoundRect } from "./rectangle.js";
import { Scene } from "./scene.js";

export class Group extends RoundRect {
    children: Node[] = [];
    constructor(position: Vector2D, size: Size, scene: Scene) {
        super(position, size);
        this.scene = scene;
        this.style.borderRadius = 0;
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
        
        if(this.scene != null) {
            node.scene = this.scene;
        }
    }

    update(): void{

    }
}