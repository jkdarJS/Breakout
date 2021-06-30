export class Parent {
    constructor(scene) {
        this.config = {
            scene: scene,
            children: []
        };
    }
    add(node) {
        this.config.children.push(node);
    }
}
