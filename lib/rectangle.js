import { Node } from "./node.js";
export class Rectangle extends Node {
    constructor(position, size) {
        super(position);
        this.size = size;
    }
    getPath() {
        var rect = new Path2D();
        var pos = this.getPositionToScene();
        rect.rect(pos.x, pos.y, this.size.width, this.size.height);
        return rect;
    }
}
export class RoundRect extends Node {
    constructor(position, size) {
        super(position);
        this.size = size;
        this.style.borderRadius = 5;
    }
    getPath() {
        var rect = new Path2D();
        var pos = this.getPositionToScene();
        var x = pos.x + this.style.borderRadius;
        var y = pos.y;
        var r = this.style.borderRadius;
        var w = this.size.width - (r * 2), h = this.size.height - (r * 2);
        rect.moveTo(x, y);
        rect.lineTo(x + w, y);
        rect.arcTo(x + w + r, y, x + w + r, y + r, r);
        rect.lineTo(x + w + r, y + r + h);
        rect.arcTo(x + w + r, y + r + h + r, x + w, y + r + h + r, r);
        rect.lineTo(x, y + r + h + r);
        rect.arcTo(x - r, y + r + h + r, x - r, y + r + h, r);
        rect.lineTo(x - r, y + r);
        rect.arcTo(x - r, y, x, y, r);
        return rect;
    }
}
