import { StyleConfig } from "./config";

export class Style implements StyleConfig{
    fillColor: string | CanvasGradient | CanvasPattern;
    borderColor: string | CanvasGradient | CanvasPattern;
    borderWidth: number;
    borderRadius: number;
    constructor(style: StyleConfig) {
        this.fillColor = style.fillColor || "rgb(0, 0, 0)";
        this.borderColor = style.borderColor || "rgb(0, 0, 0)";
        this.borderWidth = style.borderWidth || 0;
        this.borderRadius = 0;
    }
}