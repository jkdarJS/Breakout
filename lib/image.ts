import { Vector2DConfig } from "./config.js";
import { Drawer } from "./draw.js";
import { Size, Vector2D } from "./math.js";
import { Node } from "./node.js";

export class Image extends Node {
    size: Size;
    img: HTMLImageElement;
    src: string;
    constructor(src: string, position: Vector2D | Vector2DConfig, size?: Size) {
        super(position);
        this.src = src;
        this.size = size;
        this.img = document.createElement("img");
        var self = this;
        this.img.onload = function() {
            self.size = size || new Size(self.img.width, self.img.height);
        }
        this.img.src = this.src;
    }

    getPath(): Path2D {
        var path = new Path2D();
        var pos = this.getPositionToScene();
        path.rect(pos.x, pos.y, this.size.width, this.size.height);
        return path;
    }

    draw(drawer: Drawer) {
        drawer.ctx.fill(this.getPath());
        drawer.ctx.clip(this.getPath());
        drawer.drawImage(this);
        if(this.style.borderWidth > 0) {
            drawer.ctx.stroke(this.getPath());
        }
    }
}