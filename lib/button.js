import { Group } from "./group.js";
import { Image } from "./image.js";
import { Vector2D } from "./math.js";
import { Text } from "./text.js";
export class Button extends Group {
    constructor(position, size, value = "Click") {
        super(position, size, null);
        this.style.fillColor = "rgb(100, 100, 100)";
        this.style.borderRadius = 5;
        this.style.borderWidth = 2;
        this.style.borderColor = "rgb(255, 255, 255)";
        this.text = new Text(new Vector2D(this.size.width / 2, this.size.height / 2), value);
        this.text.fontSize = 20;
        this.text.scene = this.scene;
        this.text.parent = this;
        this.add(this.text);
        this.event.onEnter(() => {
            if (this.scene != null) {
                var canvas = this.scene.config.canvas;
                canvas.style.cursor = "Pointer";
            }
        });
        this.event.onOut(() => {
            if (this.scene != null) {
                var canvas = this.scene.config.canvas;
                canvas.style.cursor = "default";
            }
        });
    }
}
export class ButtonImage extends Group {
    constructor(position, size, src) {
        super(position, size, null);
        this.style.borderRadius = 5;
        this.style.borderWidth = 2;
        this.style.borderColor = "rgb(255, 255, 255)";
        this.src = src;
        this.img = new Image(this.src, new Vector2D(0, 0), this.size);
        this.add(this.img);
        this.event.onEnter(() => {
            if (this.scene != null) {
                var canvas = this.scene.config.canvas;
                canvas.style.cursor = "Pointer";
            }
        });
        this.event.onOut(() => {
            if (this.scene != null) {
                var canvas = this.scene.config.canvas;
                canvas.style.cursor = "default";
            }
        });
    }
}
