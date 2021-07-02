import { Size } from "./math.js";
import { Node } from "./node.js";
export class Image extends Node {
    constructor(src, position, size) {
        super(position);
        this.src = src;
        this.size = size;
        this.img = document.createElement("img");
        var self = this;
        this.img.onload = function () {
            self.size = size || new Size(self.img.width, self.img.height);
        };
        this.img.src = this.src;
    }
}
