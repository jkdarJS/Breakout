export class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
    }
    setStyle(node) {
        const style = node.style;
        this.ctx.save();
        this.ctx.lineWidth = style.borderWidth;
        this.ctx.fillStyle = style.fillColor;
        this.ctx.strokeStyle = style.borderColor;
        const parent = node.parent;
        if (parent != null) {
            this.ctx.clip(parent.getPath());
        }
    }
    draw(node) {
        const style = node.style;
        const path = node.getPath();
        this.setStyle(node);
        this.ctx.fill(path);
        if (style.borderWidth > 0) {
            this.ctx.stroke(path);
        }
        this.ctx.restore();
    }
}
