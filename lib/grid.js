import { Group } from "./group.js";
export class Grid extends Group {
    constructor(position, size, scene, columnWidth, columnHeight) {
        super(position, size, scene);
        this.grid = [];
        this.innerSpace = 5;
        this.columnWidth = columnWidth;
        this.columnHeight = columnHeight;
    }
    setColumnSize(width, height) {
        if (this.columnWidth == null) {
            this.columnWidth = width;
        }
        if (this.columnHeight == null) {
            this.columnHeight = height;
        }
    }
    add(node, column, row) {
        this.grid.push({
            node: node,
            column: column,
            row: row
        });
        node.position.x = column * (this.columnWidth + this.innerSpace * 2) + this.innerSpace;
        node.position.y = row * (this.columnHeight + this.innerSpace * 2) + this.innerSpace;
        this.children.push(node);
        node.parent = this;
        if (this.scene != null) {
            node.scene = this.scene;
        }
    }
}
