import { NodeConfig } from "./config.js";
import { Vector2D } from "./math.js";

export class Node {
    config: NodeConfig;
    constructor(position: Vector2D) {
        this.config = {
            position: position
        }
    }
}