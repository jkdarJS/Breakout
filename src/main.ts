import { Circle } from "../lib/circle.js";
import { Vector2DConfig } from "../lib/config.js";
import { Group } from "../lib/group.js";
import { Size, Vector2D } from "../lib/math.js";
import { Node } from "../lib/node.js";
import { RoundRect } from "../lib/rectangle.js";
import { Scene } from "../lib/scene.js";
import { Paddle } from "../paddel.js";


var canvas: HTMLCanvasElement;
var scene: Scene;
var group: Group;
var game: Group;
var ball: Paddle;
var start: boolean = false;

function init() {
    canvas = document.querySelector("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    scene = new Scene(canvas);

    group = new Group(new Vector2D(0, 0), new Size(canvas.width, canvas.height));
    group.style.fillColor = "rgb(0, 0, 0)";

    game = getGame();
    
    var rect = game.children[0] as RoundRect
    var paddelX = rect.position.x + rect.size.width /2;
    var paddelY = rect.position.y - 15;

    ball = new Paddle(new Vector2D(paddelX, paddelY), 15);
    ball.style.fillColor = "rgb(20, 200, 200)";
    ball.setVel(rect);

    game.add(ball);

    group.add(game);
    scene.add(group);

    scene.show();

    game.event.onClick(() => {
        start = true;
    })

    function update() {
        scene.hide();
        if(start) {
            ball.update(rect);
        }
        scene.show();
        requestAnimationFrame(update);
    }

    update();

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

    var playerX = (config.size.width - 100) /2;
    var playerY = config.size.height - 50;
    let playerCfg = {
        pos: new Vector2D(playerX, playerY), 
        size: new Size(100, 25),
        color: "rgb(0, 255, 0)"
    }

    var game: Group;
    var player: RoundRect;
    var particulars: RoundRect[];
    var paddels: Circle[];

    function initGame() {
        particulars = [];
        paddels = [];

        game = new Group(config.pos, config.size);
        game.style.borderColor = config.color;
        game.style.borderWidth = 2;

        player = new RoundRect(playerCfg.pos, playerCfg.size);
        player.style.fillColor = playerCfg.color;

        game.event.onMove((e: MouseEvent) => {
            
            const MOUSE_POS = {x: e.clientX, y: e.clientY};
            
            const gamePos = {
                x1: game.position.x + player.size.width/2 + 10,
                x2: game.position.x + game.size.width - player.size.width/2 - 10
            }

            if(MOUSE_POS.x > gamePos.x1 && MOUSE_POS.x < gamePos.x2) {
                player.position.x = MOUSE_POS.x - game.position.x - player.size.width/2;
            }
        });

        game.add(player);
    }

    initGame();

    return game;
}

init();
