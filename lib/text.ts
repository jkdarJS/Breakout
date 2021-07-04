import { Vector2DConfig } from "./config.js";
import { Drawer } from "./draw.js";
import { Vector2D } from "./math.js";
import { Node } from "./node.js";

export class Text extends Node {
    text: string;
    constructor(position: Vector2D | Vector2DConfig, text: string) {
        super(position);
        this.text = text;
        this.style.fillColor = "rgb(255, 255, 255)";
    }

    draw(drawer: Drawer) {
        var ctx = drawer.ctx;
        ctx.font = "bold 48px serif";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}
