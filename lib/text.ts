import { Vector2DConfig } from "./config.js";
import { Drawer } from "./draw.js";
import { Vector2D } from "./math.js";
import { Node } from "./node.js";

export class Text extends Node {
    text: string;
    fontFamily: string;
    fontSize: number;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    private font: string;
    
    constructor(position: Vector2D | Vector2DConfig, text: string) {
        super(position);
        this.text = text;
        this.style.fillColor = "rgb(255, 255, 255)";
        this.fontFamily = "Arial";
        this.fontSize = 30;
        this.font = "bold " + this.fontSize + "px " + this.fontFamily;
        this.textAlign = "center";
        this.textBaseline = "middle";
    }

    draw(drawer: Drawer) {
        this.font = this.fontSize + "px " + this.fontFamily;
        var ctx = drawer.ctx;
        ctx.font = this.font;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        var pos = this.getPositionToScene();
        ctx.fillText(this.text, pos.x, pos.y);
    }
}
