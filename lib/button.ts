import { Vector2DConfig } from "./config.js";
import { Size, Vector2D } from "./math.js";
import { RoundRect } from "./rectangle.js";
import { Text } from "./text.js";

export class Button extends RoundRect {
    text: Text;
    constructor(position: Vector2D | Vector2DConfig, size: Size, value: string = "Click") {
        super(position, size);
    }
}