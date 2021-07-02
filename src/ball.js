import { Circle } from "../lib/circle.js";
import { RoundRect } from "../lib/rectangle.js";
export class Ball extends Circle {
    constructor(position, radius) {
        super(position, radius);
        this.collidDir = -1;
        this.velX = 0;
        this.velY = 0;
    }
    collied(rect) {
        var borderRadius = 0;
        if (rect instanceof RoundRect) {
            borderRadius = rect.style.borderRadius;
        }
        var rectPos = {
            x1: rect.position.x,
            y1: rect.position.y,
            x2: rect.position.x + rect.size.width,
            y2: rect.position.y + rect.size.height,
            x3: rect.position.x + borderRadius,
            y3: rect.position.y + borderRadius,
            x4: rect.position.x + rect.size.width - borderRadius,
            y4: rect.position.y + rect.size.height - borderRadius,
            middelX: rect.position.x + rect.size.width / 2,
            middelY: rect.position.y + rect.size.height / 2
        };
        var circPos = {
            x: this.position.x,
            y: this.position.y,
            r: this.radius
        };
        function dist(x1, y1, x2, y2) {
            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);
            return Math.sqrt(dx * dx + dy * dy);
        }
        if (dist(rectPos.x3, rectPos.y3, circPos.x, circPos.y) <= circPos.r + borderRadius) {
            this.collidDir = ColliedDir.UP;
            return true;
        }
        if (dist(rectPos.x3, rectPos.y4, circPos.x, circPos.y) <= circPos.r + borderRadius) {
            this.collidDir = ColliedDir.DOWN;
            return true;
        }
        if (dist(rectPos.x4, rectPos.y3, circPos.x, circPos.y) <= circPos.r + borderRadius) {
            this.collidDir = ColliedDir.UP;
            return true;
        }
        if (dist(rectPos.x4, rectPos.y4, circPos.x, circPos.y) <= circPos.r + borderRadius) {
            this.collidDir = ColliedDir.DOWN;
            return true;
        }
        if (circPos.y >= rectPos.y1 && circPos.y <= rectPos.y2) {
            if (circPos.x + circPos.r >= rectPos.x1 && circPos.x - circPos.r <= rectPos.middelX) {
                this.collidDir = ColliedDir.LEFT;
                return true;
            }
            if (circPos.x + circPos.r >= rectPos.middelX && circPos.x - circPos.r <= rectPos.x2) {
                this.collidDir = ColliedDir.RIGHT;
                return true;
            }
        }
        if (circPos.x >= rectPos.x1 && circPos.x <= rectPos.x2) {
            if (circPos.y + circPos.r >= rectPos.middelY && circPos.y - circPos.r <= rectPos.y2) {
                this.collidDir = ColliedDir.DOWN;
                return true;
            }
            if (circPos.y + circPos.r >= rectPos.y1 && circPos.y - circPos.r <= rectPos.middelY) {
                this.collidDir = ColliedDir.UP;
                return true;
            }
        }
        return false;
    }
    debugLine(player) {
        var middelX = player.getPositionToScene().x + player.size.width / 2;
        var middelY = player.getPositionToScene().y + player.size.height / 2;
        var path = new Path2D();
        path.moveTo(middelX, middelY);
        path.lineTo(this.getPositionToScene().x, this.getPositionToScene().y);
        path.lineTo(this.getPositionToScene().x, middelY);
        path.lineTo(middelX, middelY);
        return path;
    }
    getVelocity(player) {
        var x = 1;
        var y = 1;
        var xPercent = 50;
        var yPercent = 50;
        var playerX = player.position.x + (player.size.width / 2);
        var width = player.size.width / 2 + this.radius;
        if (this.position.x < playerX || this.position.x > playerX) {
            var distX = this.position.x - playerX;
            var distY = Math.abs(playerX - this.position.x);
            xPercent = 100 / width * distX;
            yPercent = 100 - (100 / width * distY);
        }
        else {
            xPercent = 0;
            yPercent = 100;
        }
        var speed = { x: x * xPercent / 8, y: y * yPercent / 8 };
        return speed;
    }
    update(player) {
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
        if (this.collied(player)) {
            var vel = this.getVelocity(player);
            this.velX = vel.x;
            this.velY = vel.y;
        }
        this.position.x += this.velX;
        this.position.y -= this.velY;
    }
}
export var ColliedDir;
(function (ColliedDir) {
    ColliedDir[ColliedDir["RIGHT"] = 0] = "RIGHT";
    ColliedDir[ColliedDir["LEFT"] = 1] = "LEFT";
    ColliedDir[ColliedDir["DOWN"] = 2] = "DOWN";
    ColliedDir[ColliedDir["UP"] = 3] = "UP";
})(ColliedDir || (ColliedDir = {}));
