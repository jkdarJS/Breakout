import { SceneConfig } from "./config.js";
import { Drawer } from "./draw.js";
import { Grid } from "./grid.js";
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

    remove(group: Group) {
        console.log(this.config.children);
        for (let i = 0; i < this.config.children.length; i++) {
            const elem = this.config.children[i];
            if(elem != group) continue;
            this.config.children.splice(i, 1);
            break;
        }
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
            for (let i = 0; i < array.length; i++) {
                const node = array[i];
                if(!node.visibility) continue;
                nodes.push(node);
                if(node instanceof Group) {
                    get(node.children);
                }
            }
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