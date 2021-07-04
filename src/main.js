import { ButtonImage } from "../lib/button.js";
import { Group } from "../lib/group.js";
import { Size, Vector2D } from "../lib/math.js";
import { Scene } from "../lib/scene.js";
import { Game, GameState } from "./game.js";
import { Gui } from "./gui.js";
var canvas;
var scene;
var group;
var gui;
var game;
var setting;
var grid;
function init() {
    canvas = document.querySelector("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    scene = new Scene(canvas);
    group = new Group(new Vector2D(0, 0), new Size(canvas.width, canvas.height), scene);
    group.style.fillColor = "rgb(30, 30, 30)";
    game = new Game(new Vector2D((canvas.width - 350) / 2, (canvas.height - 650) / 2), new Size(350, 700), scene);
    gui = new Gui(new Vector2D(0, 0), group.size, scene, game);
    gui.visibility = false;
    setting = new ButtonImage(new Vector2D(10, 25), new Size(50, 50), "../assets/setting-filled.png");
    setting.style.borderWidth = 0;
    setting.event.onClick(() => {
        if (game.GAME_STATE != GameState.PAUSE) {
            game.GAME_STATE = GameState.PAUSE;
            game.add(game.startText);
        }
    });
    // group.add(game);
    group.add(setting);
    group.add(gui);
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
