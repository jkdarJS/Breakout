import { Vector2DConfig } from "../lib/config.js";
import { Group } from "../lib/group.js";
import { Size, Vector2D } from "../lib/math.js";
import { Game } from "./game.js";

export class Gui extends Group {
    game: Game;
    constructor(position: Vector2D | Vector2DConfig, size: Size, game: Game) {
        super(position, size);
        this.game = game;
    }
}
