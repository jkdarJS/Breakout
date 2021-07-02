import { Image } from "./image.js";
export class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
    }
    setStyle(node) {
        const style = node.style;
        const pos = node.getPositionToScene();
        const rotateAngel = node.style.rotateAngel;
        this.ctx.save();
        this.ctx.lineWidth = style.borderWidth;
        this.ctx.fillStyle = style.fillColor;
        this.ctx.strokeStyle = style.borderColor;
        this.ctx.translate(pos.x + rotateAngel.x, pos.y + rotateAngel.y);
        this.ctx.rotate(this.degrees(style.rotation));
        this.ctx.translate(-(pos.x + rotateAngel.x), -(pos.y + rotateAngel.y));
        const parent = node.parent;
        if (parent != null) {
            this.ctx.clip(parent.getPath());
        }
    }
    degrees(degrees) {
        return degrees * Math.PI / 180;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    drawImage(img) {
        var pos = img.getPositionToScene();
        var size = img.size;
        this.ctx.drawImage(img.img, pos.x, pos.y, size.width, size.height);
    }
    draw(node) {
        const style = node.style;
        const path = node.getPath();
        this.setStyle(node);
        this.ctx.fill(path);
        if (node instanceof Image) {
            this.drawImage(node);
        }
        if (style.borderWidth > 0) {
            this.ctx.stroke(path);
        }
        this.ctx.restore();
    }
}
