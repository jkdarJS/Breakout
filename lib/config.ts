import { Drawer } from "./draw.js";
import { Event } from "./event.js";
import { Group } from "./group.js";
import { Size, Vector2D } from "./math.js";
import { Node } from "./node.js";
import { Scene } from "./scene.js";
import { Style } from "./style.js";

export interface SceneConfig {
    canvas: HTMLCanvasElement;
    children: Group[];
    drawer: Drawer
}

export interface ParentConfig {
    scene: Scene;
    children: Node[];
}

export interface NodeConfig {
    position?: Vector2D;
    relativPositionToScene?: Vector2D;
    style: Style;
    parent?: Group;
    scene?: Scene;
    event: Event;
}

export interface Vector2DConfig {
    x: number;
    y: number;
}

export interface SizeConfig {
    width: number;
    height: number;
}

export interface StyleConfig {
    fillColor: string | CanvasGradient | CanvasPattern;
    borderColor: string | CanvasGradient | CanvasPattern;
    borderWidth: number;
}

export interface RectConfig extends NodeConfig{
    size: Size
}
export interface CircleConfig extends NodeConfig{
    radius: number
}
