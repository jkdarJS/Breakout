import { SceneConfig } from "./config.js";
import { Drawer } from "./draw.js";
import { Group } from "./group.js";
import { Node } from "./node.js";

export class Scene {
    config: SceneConfig;

    constructor(canvas: HTMLCanvasElement) {
        this.config = {
            canvas: canvas,
            children: [],
            drawer: new Drawer(canvas.getContext("2d"))
        };
    }

    add(group: Group) {
        this.config.children.push(group);
    }

    getDrawer(): Drawer {
        return this.config.drawer;
    }

    getAllNodes(): Node[] {
        var nodes: Node[] = [];

        function get(array: Node[]) {
            array.forEach(node => {
                nodes.push(node);
                if(node instanceof Group) {
                    get(node.children);
                }
            });
        }

        get(this.config.children);

        return nodes;
    }

    private draw(): void {
        var nodes: Node[] = this.getAllNodes();
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