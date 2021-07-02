import { StyleConfig } from "./config.js";
import { Vector2D } from "./math.js";

export class Style implements StyleConfig{
    fillColor: string | CanvasGradient | CanvasPattern;
    borderColor: string | CanvasGradient | CanvasPattern;
    borderWidth: number;
    borderRadius: number;
    rotation: number;
    rotateAngel: Vector2D;
    constructor(style: StyleConfig) {
        this.fillColor = style.fillColor || "rgb(0, 0, 0)";
        this.borderColor = style.borderColor || "rgb(0, 0, 0)";
        this.borderWidth = style.borderWidth || 0;
        this.borderRadius = 0;
        this.rotation = 0;
        this.rotateAngel = new Vector2D(0, 0);
    }
}