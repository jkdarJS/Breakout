import { Group } from "../lib/group.js";
import { Size, Vector2D } from "../lib/math.js";
import { Scene } from "../lib/scene.js";
import { Game, GameState } from "./game.js";


var canvas: HTMLCanvasElement;
var scene: Scene;
var group: Group;
var game: Game;

function init() {
    canvas = document.querySelector("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    scene = new Scene(canvas);

    group = new Group(new Vector2D(0, 0), new Size(canvas.width, canvas.height));
    group.style.fillColor = "rgb(0, 0, 0)";

    game = new Game(new Vector2D((canvas.width-400)/2, (canvas.height-700)/2), new Size(400, 700));
    
    group.add(game);
    scene.add(group);

    scene.show();

    function update() {
        scene.hide();
        if(game.GAME_STATE == GameState.RUNNING) {
            game.update();
        }
        scene.show();
        requestAnimationFrame(update);
    }

    update();
}

init();
