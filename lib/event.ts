import { Node } from "./node.js";

type ActionType = "mousedown" | "mousemove" | "mouseup" | "click";

export class Event {
    canvas: HTMLCanvasElement;
    node: Node;

    constructor(node: Node) {
        this.canvas = document.querySelector("canvas");
        this.node = node;
    }

    private isPointInCanvas(mouseX: number, mouseY: number): boolean {
        const ctx = this.canvas.getContext("2d");
        const path = this.node.getPath();

        if(!this.node.visibility) { return false; }
        if(!this.node.parent.visibility) { return false; }
        

        if(ctx.isPointInPath(path, mouseX, mouseY)) {
            return true;
        }
        if(ctx.isPointInStroke(path, mouseX, mouseY)) {
            return true;
        }
        return false;
    }

    addEvent(type: ActionType, callback: CallableFunction) {
        this.canvas.addEventListener(type, (event) => {
            var e = event as MouseEvent;
            const CANVAS_POS = this.canvas.getBoundingClientRect();
            const MOUSE_POS = {
                x: e.clientX - CANVAS_POS.x,
                y: e.clientY - CANVAS_POS.y
            };
            if(this.isPointInCanvas(MOUSE_POS.x, MOUSE_POS.y)) {
                callback(e);
            }
        });
    }
    onEnter(callback: CallableFunction) {
        var entered = false;
        this.canvas.addEventListener("mousemove", (e) => {
            const CANVAS_POS = this.canvas.getBoundingClientRect();
            const MOUSE_POS = {
                x: e.clientX - CANVAS_POS.x,
                y: e.clientY - CANVAS_POS.y
            };
            if(this.isPointInCanvas(MOUSE_POS.x, MOUSE_POS.y)) {
                if(!entered) {
                    entered = true;
                    callback(e);
                }
            }else {
                entered = false;
            }
        });
    }
    onOut(callback: CallableFunction) {
        var out = true;
        this.canvas.addEventListener("mousemove", (e) => {
            const CANVAS_POS = this.canvas.getBoundingClientRect();
            const MOUSE_POS = {
                x: e.clientX - CANVAS_POS.x,
                y: e.clientY - CANVAS_POS.y
            };
            if(this.isPointInCanvas(MOUSE_POS.x, MOUSE_POS.y)) {
                out = false;
            }else {
                if(!out) {
                    callback(e);
                }
                out = true;
            }
        });
    }
    onClick(callback: CallableFunction) {
        this.addEvent("click", callback);
    }
    onDown(callback: CallableFunction) {
        this.addEvent("mousedown", callback);
    }
    onUp(callback: CallableFunction) {
        this.addEvent("mouseup", callback);
    }
    onMove(callback: CallableFunction) {
        this.addEvent("mousemove", callback);
    }
}
