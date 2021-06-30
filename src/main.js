import { Group } from "../lib/group.js";
import { Size, Vector2D } from "../lib/math.js";
import { RoundRect } from "../lib/rectangle.js";
import { Scene } from "../lib/scene.js";
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
    game = getGame();
    group.add(game);
    scene.add(group);
    scene.show();
}
function getGame() {
    const SCREEN = {
        width: canvas.width, height: canvas.height
    };
    let config = {
        pos: new Vector2D((SCREEN.width - 500) / 2, (SCREEN.height - 800) / 2),
        size: new Size(500, 800),
        color: "rgb(0, 0, 255)"
    };
    let playerCfg = {
        pos: new Vector2D((config.size.width - 100) / 2, config.size.height - 50),
        size: new Size(100, 25),
        color: "rgb(0, 255, 0)"
    };
    var game;
    var player;
    var particulars;
    var bullet;
    function initGame() {
        particulars = [];
        bullet = [];
        game = new Group(config.pos, config.size);
        game.style.borderColor = config.color;
        game.style.borderWidth = 2;
        player = new RoundRect(playerCfg.pos, playerCfg.size);
        player.style.fillColor = playerCfg.color;
        game.event.onMove((e) => {
            const MOUSE_POS = game.getMousePosToNode(e);
            const playerPos = {
                x1: player.position.x,
                y1: player.position.y,
                x2: player.position.x + player.size.width,
                y2: player.position.y + player.size.height
            };
        });
        game.add(player);
    }
    initGame();
    return game;
}
init();
