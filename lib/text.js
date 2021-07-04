import { Node } from "./node.js";
export class Text extends Node {
    constructor(position, text) {
        super(position);
        this.text = text;
        this.style.fillColor = "rgb(255, 255, 255)";
        this.fontFamily = "Arial";
        this.fontSize = 30;
        this.font = "bold " + this.fontSize + "px " + this.fontFamily;
        this.textAlign = "center";
        this.textBaseline = "middle";
    }
    draw(drawer) {
        this.font = this.fontSize + "px " + this.fontFamily;
        var ctx = drawer.ctx;
        ctx.font = this.font;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        var pos = this.getPositionToScene();
        ctx.fillText(this.text, pos.x, pos.y);
    }
}
