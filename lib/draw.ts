import { Node } from "./node.js";

export class Drawer {
    ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    setStyle(node: Node): void{
        const style = node.style;

        this.ctx.save();

        this.ctx.lineWidth = style.borderWidth;
        this.ctx.fillStyle = style.fillColor;
        this.ctx.strokeStyle = style.borderColor;

        const parent = node.parent;
        if(parent != null) {
            this.ctx.clip(parent.getPath());
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw(node: Node): void{
        const style = node.style;
        const path = node.getPath();
        this.setStyle(node);
        this.ctx.fill(path);
        if(style.borderWidth > 0) {
            this.ctx.stroke(path);
        }
        this.ctx.restore();
    }
}