import { Drawer } from "./draw.js";
import { Size, Vector2D } from "./math.js";
import { Node } from "./node.js";
import { Parent } from "./parent.js";
import { Scene } from "./scene.js";

export interface SceneConfig {
    canvas: HTMLCanvasElement;
    children: Parent[];
    drawer: Drawer
}

export interface ParentConfig {
    scene: Scene;
    children: Node[];
}

export interface NodeConfig {
    position?: Vector2D,
    relativPositionToScene?: Vector2D,
    parent?: Parent,
    scene?: Scene
}

export interface StyleConfig {
    fillColor?: string | CanvasGradient | CanvasPattern;
    borderColor?: string | CanvasGradient | CanvasPattern;
    borderWidth?: number;
}

export interface RectConfig extends NodeConfig{
    size: Size
}
export interface CircleConfig extends NodeConfig{
    radius: number
}
