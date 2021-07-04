import { Event } from "./event.js";
import { Vector2D } from "./math.js";
import { Style } from "./style.js";
export class Node {
    constructor(position) {
        this.visibility = true;
        this.position = position;
        this.style = new Style({
            fillColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0
        });
        this.event = new Event(this);
    }
    getPositionToScene() {
        var pos = new Vector2D(this.position.x, this.position.y);
        if (this.parent != null) {
            var parentPos = this.parent.getPositionToScene();
            pos.x += parentPos.x;
            pos.y += parentPos.y;
        }
        return pos;
    }
    getPath() {
        var path = new Path2D();
        return path;
    }
    getMousePosToNode(e) {
        var nodePos = this.position;
        var pos = new Vector2D();
        pos.x = e.clientX - nodePos.x;
        pos.y = e.clientY - nodePos.y;
        return pos;
    }
    draw(drawer) {
        drawer.ctx.fill(this.getPath());
        if (this.style.borderWidth > 0) {
            drawer.ctx.stroke(this.getPath());
        }
    }
}
