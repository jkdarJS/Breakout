export class Style {
    constructor(style) {
        this.fillColor = style.fillColor || "rgb(0, 0, 0)";
        this.borderColor = style.borderColor || "rgb(0, 0, 0)";
        this.borderWidth = style.borderWidth || 0;
        this.borderRadius = 0;
    }
}
