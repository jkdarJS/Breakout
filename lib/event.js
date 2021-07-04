export class Event {
    constructor(node) {
        this.canvas = document.querySelector("canvas");
        this.node = node;
    }
    isPointInCanvas(mouseX, mouseY) {
        const ctx = this.canvas.getContext("2d");
        const path = this.node.getPath();
        if (!this.node.visibility) {
            return false;
        }
        if (!this.node.parent.visibility) {
            return false;
        }
        if (ctx.isPointInPath(path, mouseX, mouseY)) {
            return true;
        }
        if (ctx.isPointInStroke(path, mouseX, mouseY)) {
            return true;
        }
        return false;
    }
    addEvent(type, callback) {
        this.canvas.addEventListener(type, (event) => {
            var e = event;
            const CANVAS_POS = this.canvas.getBoundingClientRect();
            const MOUSE_POS = {
                x: e.clientX - CANVAS_POS.x,
                y: e.clientY - CANVAS_POS.y
            };
            if (this.isPointInCanvas(MOUSE_POS.x, MOUSE_POS.y)) {
                callback(e);
            }
        });
    }
    onEnter(callback) {
        var entered = false;
        this.canvas.addEventListener("mousemove", (e) => {
            const CANVAS_POS = this.canvas.getBoundingClientRect();
            const MOUSE_POS = {
                x: e.clientX - CANVAS_POS.x,
                y: e.clientY - CANVAS_POS.y
            };
            if (this.isPointInCanvas(MOUSE_POS.x, MOUSE_POS.y)) {
                if (!entered) {
                    entered = true;
                    callback(e);
                }
            }
            else {
                entered = false;
            }
        });
    }
    onOut(callback) {
        var out = true;
        this.canvas.addEventListener("mousemove", (e) => {
            const CANVAS_POS = this.canvas.getBoundingClientRect();
            const MOUSE_POS = {
                x: e.clientX - CANVAS_POS.x,
                y: e.clientY - CANVAS_POS.y
            };
            if (this.isPointInCanvas(MOUSE_POS.x, MOUSE_POS.y)) {
                out = false;
            }
            else {
                if (!out) {
                    callback(e);
                }
                out = true;
            }
        });
    }
    onClick(callback) {
        this.addEvent("click", callback);
    }
    onDown(callback) {
        this.addEvent("mousedown", callback);
    }
    onUp(callback) {
        this.addEvent("mouseup", callback);
    }
    onMove(callback) {
        this.addEvent("mousemove", callback);
    }
}
