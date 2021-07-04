import { Vector2DConfig } from "./config.js";
import { Group } from "./group.js";
import { Size, Vector2D } from "./math.js";
import { Node } from "./node.js";
import { Scene } from "./scene.js";

export class Grid extends Group {
    grid: GridColumn[] = [];
    private columnWidth: number;
    private columnHeight: number;
    columnNum: number;
    rowNum: number;
    innerSpace: number = 5;

    constructor(position: Vector2D | Vector2DConfig, size: Size, 
        scene: Scene, columnWidth?: number, columnHeight?: number) {
        super(position, size, scene);
        this.columnWidth = columnWidth;
        this.columnHeight = columnHeight;
    }

    setColumnSize(width: number, height: number) {
        if(this.columnWidth == null){
            this.columnWidth = width;
        }
        if(this.columnHeight == null) {
            this.columnHeight = height;
        }
    }

    add(node: Node, column?: number, row?: number) {
        
        this.grid.push({
            node: node,
            column: column,
            row: row
        });

        node.position.x = column * (this.columnWidth + this.innerSpace*2) + this.innerSpace;
        node.position.y = row * (this.columnHeight + this.innerSpace*2) + this.innerSpace;

        this.children.push(node);
        node.parent = this;
        if(this.scene != null) {
            node.scene = this.scene;
        }
    }
}

interface GridColumn {
    node: Node,
    column: number,
    row: number
}
