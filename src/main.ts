// import { StartGui } from "./gui/start_gui.js";

import { Size, Vector2D } from "../lib/math.js";
import { Parent } from "../lib/parent.js";
import { Rectangle } from "../lib/rectangle.js";
import { Scene } from "../lib/scene.js";


var canvas: HTMLCanvasElement;
var scene: Scene;
var pane: Parent;
var rect: Rectangle;

function init() {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    canvas.getContext("2d").fillStyle 

    scene = new Scene(canvas);

    pane = new Parent(scene);

    rect = new Rectangle(new Vector2D(0, 0), new Size(100, 100));

    pane.add(rect);
}
