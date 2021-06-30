import { Circle } from "../lib/circle.js";
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
    const GAME_POS = {
        x1: config.pos.x,
        y1: config.pos.y,
        x2: config.pos.x + config.size.width,
        y2: config.pos.y + config.size.height
    };
    let playerCfg = {
        pos: new Vector2D((config.size.width - 100) / 2, config.size.height - 50),
        size: new Size(100, 25),
        color: "rgb(0, 255, 0)"
    };
    var paddelX = playerCfg.pos.x + playerCfg.size.width / 2;
    var paddelY = playerCfg.pos.y - 15;
    let paddelCfg = {
        pos: new Vector2D(paddelX, paddelY),
        radius: 15,
        color: "rgb(20, 200, 200)",
        velX: 1,
        velY: 1
    };
    let PaddelDir;
    (function (PaddelDir) {
        PaddelDir[PaddelDir["RIGHT_UP"] = 0] = "RIGHT_UP";
        PaddelDir[PaddelDir["LEFT_UP"] = 1] = "LEFT_UP";
        PaddelDir[PaddelDir["RIGHT_DOWN"] = 2] = "RIGHT_DOWN";
        PaddelDir[PaddelDir["LEFT_DOWN"] = 3] = "LEFT_DOWN";
    })(PaddelDir || (PaddelDir = {}));
    class Paddel extends Circle {
        constructor(position, radius) {
            super(position, radius);
        }
    }
    var game;
    var player;
    var particulars;
    var paddels;
    var paddel;
    function initGame() {
        particulars = [];
        paddels = [];
        game = new Group(config.pos, config.size);
        game.style.borderColor = config.color;
        game.style.borderWidth = 2;
        paddel = new Circle(paddelCfg.pos, paddelCfg.radius);
        paddel.style.fillColor = paddelCfg.color;
        paddels.push(paddel);
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
        game.add(paddel);
    }
    function movePaddels() {
    }
    initGame();
    return game;
}
init();
