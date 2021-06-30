import { Drawer } from "./draw.js";
import { Group } from "./group.js";
export class Scene {
    constructor(canvas) {
        this.config = {
            canvas: canvas,
            children: [],
            drawer: new Drawer(canvas.getContext("2d"))
        };
    }
    add(group) {
        this.config.children.push(group);
    }
    getDrawer() {
        return this.config.drawer;
    }
    getAllNodes() {
        var nodes = [];
        function get(array) {
            array.forEach(node => {
                nodes.push(node);
                if (node instanceof Group) {
                    get(node.children);
                }
            });
        }
        get(this.config.children);
        return nodes;
    }
    draw() {
        var nodes = this.getAllNodes();
        nodes.forEach(node => {
            this.config.drawer.draw(node);
        });
    }
    show() {
        this.draw();
    }
}
