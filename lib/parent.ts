import { ParentConfig } from "./config.js";
import { Node } from "./node.js";
import { Scene } from "./scene.js";

export class Parent {
    config: ParentConfig;
    constructor(scene: Scene) {
        this.config = {
            scene: scene,
            children: []
        }
    }

    add(node: Node) {
        this.config.children.push(node);
    }
}