import { Circle } from "./lib/circle.js";
export class Paddle extends Circle {
    constructor(position, radius) {
        super(position, radius);
        this.velX = 0;
        this.velY = 0;
        this.dir = Dir.RIGHT_UP;
    }
    colliedPlayer(rect) {
        var distX, distY;
        distX = Math.abs(this.position.x - rect.x);
        distY = Math.abs(this.position.y - rect.y);
        if (distX > (rect.width / 2 + this.radius)) {
            return false;
        }
        if (distY > (rect.height / 2 + this.radius)) {
            return false;
        }
        if (distX <= (rect.width / 2)) {
            return true;
        }
        if (distY <= (rect.height / 2)) {
            return true;
        }
        var cornerDistanceSq = Math.sqrt(distX - rect.width / 2) +
            Math.sqrt(distY - rect.height / 2);
        return (cornerDistanceSq >= (Math.sqrt(this.radius)));
    }
    collied(rect) {
        var circle = {
            x: this.position.x,
            y: this.position.y,
            r: this.radius
        };
        // temporary variables to set edges for testing
        var testX = circle.x;
        var testY = circle.y;
        // which edge is closest?
        if (circle.x < rect.x) {
            testX = rect.x; // test left edge
        }
        else if (circle.x > rect.x + rect.w) {
            testX = rect.x + rect.w; // right edge
        }
        if (circle.y < rect.y) {
            testY = rect.y; // top edge
        }
        else if (circle.y > rect.y + rect.h) {
            testY = rect.y + rect.h; // bottom edge
        }
        // get distance from closest edges
        var distX = circle.x - testX;
        var distY = circle.y - testY;
        var distance = Math.sqrt((distX * distX) + (distY * distY));
        // if the distance is less than the radius, collision!
        if (distance <= circle.r) {
            return true;
        }
        return false;
    }
    colliedGroup(rect) {
        const pos = {
            x1: this.position.x - this.radius,
            y1: this.position.y - this.radius,
            x2: this.position.x + this.radius,
            y2: this.position.y + this.radius
        };
        if (pos.x1 <= 0 || pos.y1 <= 0 || pos.x2 >= rect.width || pos.y2 >= rect.height) {
            return true;
        }
        return false;
    }
    getVelocity(player) {
        var vel = { x: 0, y: 0 };
        var playerX = player.position.x + (player.size.width / 2);
        var playerY = player.position.y + (player.size.height / 2);
        var distX = this.position.x - playerX;
        var distY = this.position.y - playerY;
        var c = Math.sqrt(distX * distX + distY * distY);
        vel.x = Math.cos(c);
        vel.y = Math.sin(c);
        return c;
    }
    setVel(player) {
        this.velocity = this.getVelocity(player);
        this.velX = Math.cos(this.velocity);
        this.velY = Math.sin(this.velocity);
    }
    update(player) {
        var playerRect = {
            x: player.position.x,
            y: player.position.y,
            w: player.size.width,
            h: player.size.height
        };
        var parentRect = {
            x: this.parent.getPositionToScene().x,
            y: this.parent.getPositionToScene().y,
            width: this.parent.size.width,
            height: this.parent.size.height
        };
        if (this.position.x - this.radius <= 0) {
            this.velX = -this.velX;
        }
        else if (this.position.x + this.radius >= parentRect.width) {
            this.velX = -this.velX;
        }
        if (this.position.y - this.radius <= 0) {
            this.velY = -this.velY;
        }
        else if (this.position.y + this.radius >= parentRect.height) {
            this.velY = -this.velY;
        }
        if (this.collied(playerRect)) {
            this.setVel(player);
        }
        this.position.x += this.velX * 10;
        this.position.y -= this.velY * 10;
    }
}
var Dir;
(function (Dir) {
    Dir[Dir["RIGHT_UP"] = 0] = "RIGHT_UP";
    Dir[Dir["LEFT_UP"] = 1] = "LEFT_UP";
    Dir[Dir["RIGHT_DOWN"] = 2] = "RIGHT_DOWN";
    Dir[Dir["LEFT_DOWN"] = 3] = "LEFT_DOWN";
})(Dir || (Dir = {}));
