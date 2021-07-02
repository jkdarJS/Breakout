import { Group } from "../lib/group.js";
import { Image } from "../lib/image.js";
import { Size, Vector2D } from "../lib/math.js";
import { RoundRect } from "../lib/rectangle.js";
import { Ball, ColliedDir } from "./ball.js";

export class Game extends Group{

    balls: Ball[] = [];
    particulars: RoundRect[] = [];
    paddel: RoundRect;
    arrow: Image;
    GAME_STATE: number = GameState.UNPLAYED;

    constructor(position: Vector2D, size: Size) {
        super(position, size);
        this.style.borderColor = "rgb(0, 255, 255)";
        this.style.borderWidth = 2;

        //init Paddel
        var playerX = (this.size.width - 100) /2;
        var playerY = this.size.height - 35;
        this.paddel = new RoundRect(new Vector2D(playerX, playerY), new Size(100, 25));
        this.paddel.style.fillColor = "rgb(0, 255, 0)";

        //init Ball
        const BALL_RADIUS = 10;
        var ballX = this.paddel.position.x + this.paddel.size.width /2;
        var ballY = this.paddel.position.y - BALL_RADIUS;
        var ball = new Ball(new Vector2D(ballX, ballY), BALL_RADIUS);
        ball.style.fillColor = "rgb(20, 200, 200)";

        //init Arrow Up icone
        const SIZE = 45;
        const arrowX = this.paddel.position.x + this.paddel.size.width/2 - SIZE/2;
        const arrowY = this.paddel.position.y - SIZE - BALL_RADIUS*3;
        this.arrow = new Image("../assets/arrowUp.svg.png", new Vector2D(arrowX, arrowY), new Size(SIZE, SIZE));
        this.arrow.style.rotation = -85;
        this.arrow.style.rotateAngel = new Vector2D(this.arrow.size.width/2, this.arrow.size.height);

        //add Ball to Balls
        this.balls.push(ball);

        //add Paddel to Game
        this.add(this.paddel);

        const MAX_WIDTH = this.size.width;
        const MAX_HEIGHT = this.size.height/2;

        const MARGIN = 10;
        const SPACE = 5;
        const NUM_COLUMNS = 8;
        const NUM_ROWS = 15;

        const PARTICULARS_WIDTH = (MAX_WIDTH - MARGIN*2 - SPACE*(NUM_COLUMNS+1)) / NUM_COLUMNS;
        const PARTICULARS_HEIGHT = (MAX_HEIGHT - MARGIN*2 - SPACE*(NUM_ROWS+1)) / NUM_ROWS;

        const START_X = SPACE + MARGIN;
        const START_Y = SPACE + MARGIN;

        //Create new Particulars
        for (let x = 0; x < NUM_COLUMNS; x++) {
            for (let y = 0; y < NUM_ROWS; y++) {
                var px = x * PARTICULARS_WIDTH + START_X + (SPACE * x);
                var py = y * PARTICULARS_HEIGHT + START_Y + (SPACE * y);
                var pos = new Vector2D(px, py);
                var partic = new RoundRect(pos, new Size(PARTICULARS_WIDTH, PARTICULARS_HEIGHT));
                partic.style.fillColor = "rgb(255, 0, 0)";
                this.particulars.push(partic);
                this.add(partic);
            }
        }

        //add Balls to Game
        this.balls.forEach(ball => {
            this.add(ball);
        });

        //add Image of ArrowUp
        this.add(this.arrow);

        //move Paddel
        this.event.onMove((e: MouseEvent) => {
            if(this.GAME_STATE == GameState.RUNNING) {
                const MOUSE_POS = {x: e.clientX, y: e.clientY};
                
                const gamePos = {
                    x1: this.position.x + this.paddel.size.width/2 + 10,
                    x2: this.position.x + this.size.width - this.paddel.size.width/2 - 10
                }
    
                if(MOUSE_POS.x > gamePos.x1 && MOUSE_POS.x < gamePos.x2) {
                    this.paddel.position.x = MOUSE_POS.x - this.position.x - this.paddel.size.width/2;
                }
            }
            if(this.GAME_STATE == GameState.UNPLAYED) {
                var arrowX = this.position.x + this.arrow.size.width/2;
                var arrowY = this.position.y + this.arrow.size.height/2;
                var MOUSE = this.getMousePosToNode(e);
                
                var distX = Math.abs(arrowX - MOUSE.x);
                var distY = Math.abs(arrowY - MOUSE.y);
                var c = Math.sqrt(distX * distX + distY * distY);
                var degree = Math.acos(distX/c) * (180/Math.PI);
                // console.log(degree);
                
                this.arrow.style.rotation = degree;
            }
        });
        
        this.event.onClick(() => {
            this.GAME_STATE = GameState.RUNNING;
            this.remove(this.arrow);
        });
    }

    switchDir(ball: Ball) {
        switch(ball.collidDir) {
            case ColliedDir.RIGHT:
            case ColliedDir.LEFT:
                ball.velX = -ball.velX;
                break;
            case ColliedDir.DOWN:
            case ColliedDir.UP:
                ball.velY = -ball.velY;
                break;
        }
    }

    ballColiedsParticulars(ball: Ball) {
        for (let i = 0; i < this.particulars.length; i++) {
            const partic = this.particulars[i];
            if(ball.collied(partic)) {
                this.switchDir(ball);
                this.particulars.splice(i, 1);
                this.remove(partic);
                ball.update(this.paddel);
                i--;
            }
        }
    }

    update() {
        this.balls.forEach(ball => {
            ball.update(this.paddel);
            this.ballColiedsParticulars(ball);
        });
    }
}

export enum GameState {
    UNPLAYED, RUNNING, PAUSE
}
