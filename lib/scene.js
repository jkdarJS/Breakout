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
    remove(group) {
        console.log(this.config.children);
        for (let i = 0; i < this.config.children.length; i++) {
            const elem = this.config.children[i];
            if (elem != group)
                continue;
            this.config.children.splice(i, 1);
            break;
        }
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
            for (let i = 0; i < array.length; i++) {
                const node = array[i];
                if (!node.visibility)
                    continue;
                nodes.push(node);
                if (node instanceof Group) {
                    get(node.children);
                }
            }
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
    hide() {
        this.getDrawer().clear();
    }
}
