import { Node } from "./node.js";

export class Drawer {
    ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    setStyle(node: Node): void{
        
    }

    draw(node: Node): void{
        this.setStyle(node);
    }
}