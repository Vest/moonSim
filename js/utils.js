class Viewport {
    constructor(topLeft, bottomRight, projWidth, projHeight) {
        this.viewport = {
            topLeft: topLeft,
            bottomRight: bottomRight
        };

        this.projection = {
            width: projWidth,
            height: projHeight
        };
    }

    isPointVisible(coord) {
        if (coord.x < this.viewport.topLeft.x) {
            return false;
        } else if (coord.x > this.viewport.bottomRight.x) {
            return false;
        } else if (coord.y > this.viewport.topLeft.y) {
            return false;
        } else if (coord.y < this.viewport.bottomRight.y) {
            return false;
        } else {
            return true;
        }
    }

    projectX(x) {
        return (x - this.viewport.topLeft.x) * this.projection.width / (this.viewport.bottomRight.x - this.viewport.topLeft.x);
    }

    projectY(y) {
        return (y - this.viewport.topLeft.y) * this.projection.height / (this.viewport.bottomRight.y - this.viewport.topLeft.y);
    }
}

export {
    Viewport
};
