import { SceneConfig } from "./config.js";
import { Drawer } from "./draw.js";

export class Scene {
    config: SceneConfig;
    constructor(canvas: HTMLCanvasElement) {
        this.config = {
            canvas: canvas,
            children: [],
            drawer: new Drawer(canvas.getContext("2d"))
        };
    }

    getDrawer(): Drawer {
        return this.config.drawer;
    }

    show() {

    }
}