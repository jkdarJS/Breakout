import { Circle } from "../lib/circle.js";
import { Group } from "../lib/group.js";
import { Size, Vector2D } from "../lib/math.js";
import { RoundRect } from "../lib/rectangle.js";
import { Scene } from "../lib/scene.js";


var canvas: HTMLCanvasElement;
var scene: Scene;
var group: Group;
var game: Group;

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

function getGame(): Group{

    const SCREEN = {
        width: canvas.width, height: canvas.height
    }

    let config = {
        pos: new Vector2D((SCREEN.width - 500) /2, (SCREEN.height - 800) /2), 
        size: new Size(500, 800),
        color: "rgb(0, 0, 255)"
    }

    const GAME_POS = {
        x1: config.pos.x,
        y1: config.pos.y,
        x2: config.pos.x + config.size.width,
        y2: config.pos.y + config.size.height
    }

    let playerCfg = {
        pos: new Vector2D((config.size.width - 100) /2, config.size.height - 50), 
        size: new Size(100, 25),
        color: "rgb(0, 255, 0)"
    }

    var game: Group;
    var player: RoundRect;
    var particulars: RoundRect[];
    var bullet: Circle[];

    function initGame() {
        particulars = [];
        bullet = [];

        game = new Group(config.pos, config.size);
        game.style.borderColor = config.color;
        game.style.borderWidth = 2;

        player = new RoundRect(playerCfg.pos, playerCfg.size);
        player.style.fillColor = playerCfg.color;

        game.event.onMove((e: MouseEvent) => {
            const MOUSE_POS = game.getMousePosToNode(e);
            const playerPos = {
                x1: player.position.x,
                y1: player.position.y,
                x2: player.position.x + player.size.width,
                y2: player.position.y + player.size.height
            }
        });

        game.add(player);
    }

    initGame();

    return game;
}

init();
