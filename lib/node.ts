import { NodeConfig, Vector2DConfig } from "./config.js";
import { Drawer } from "./draw.js";
import { Event } from "./event.js";
import { Group } from "./group.js";
import { Vector2D } from "./math.js";
import { Scene } from "./scene.js";
import { Style } from "./style.js";

export class Node implements NodeConfig{

    position?: Vector2D | Vector2DConfig;
    relativPositionToScene?: Vector2D | Vector2DConfig;
    style: Style;
    parent?: Group;
    scene?: Scene;
    event: Event;
    
    constructor(position: Vector2D | Vector2DConfig) {
        this.position = position;
        this.style = new Style({
            fillColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0
        });
        this.event = new Event(this);
    }

    getPositionToScene(): Vector2D | Vector2DConfig{
        var pos = new Vector2D(this.position.x, this.position.y);
        if(this.parent != null) {
            var parentPos = this.parent.getPositionToScene();
            pos.x += parentPos.x;
            pos.y += parentPos.y;
        }
        return pos;
    }

    getPath(): Path2D {
        var path = new Path2D();
        return path;
    }

    getMousePosToNode(e: MouseEvent): Vector2D {
        var nodePos = this.position;
        var pos = new Vector2D()
        pos.x = e.clientX - nodePos.x;
        pos.y = e.clientY - nodePos.y;
        return pos;
    }

    draw(drawer: Drawer) {
        drawer.ctx.fill(this.getPath());
        if(this.style.borderWidth > 0) {
            drawer.ctx.stroke(this.getPath());
        }
    }
}