import { Node } from "./node.js";
export class Text extends Node {
    constructor(position, text) {
        super(position);
        this.text = text;
        this.style.fillColor = "rgb(255, 255, 255)";
    }
    draw(drawer) {
        var ctx = drawer.ctx;
        ctx.font = "bold 48px serif";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}
