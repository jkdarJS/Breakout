import { Group } from "../lib/group.js";
import { Size, Vector2D } from "../lib/math.js";
import { Scene } from "../lib/scene.js";
import { Game, GameState } from "./game.js";
var canvas;
var scene;
var group;
var game;
function init() {
    canvas = document.querySelector("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    scene = new Scene(canvas);
    group = new Group(new Vector2D(0, 0), new Size(canvas.width, canvas.height));
    group.style.fillColor = "rgb(0, 0, 0)";
    game = new Game(new Vector2D((canvas.width - 400) / 2, (canvas.height - 800) / 2), new Size(400, 800));
    group.add(game);
    scene.add(group);
    scene.show();
    function update() {
        scene.hide();
        if (game.GAME_STATE == GameState.RUNNING) {
            game.update();
        }
        scene.show();
        requestAnimationFrame(update);
    }
    update();
}
init();
