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

    /**
     * Projects the x-coordinate to the canvas
     * @param {Number} x
     * @returns {Number} x-coordinate on the canvas
     */
    projectX(x) {
        return (x - this.viewport.topLeft.x) * this.projection.width / (this.viewport.bottomRight.x - this.viewport.topLeft.x);
    }

    /**
     * Projects the y-coordinate to the canvas
     * @param {Number} y
     * @returns {Number} y-coordinate on the canvas
     */
    projectY(y) {
        return (y - this.viewport.topLeft.y) * this.projection.height / (this.viewport.bottomRight.y - this.viewport.topLeft.y);
    }

    /**
     * Projects the length to the canvas coordinates to the abscissa
     * @param {Number} d
     * @returns {Number} the length on the canvas
     */
    projectLength(d) {
        return d * this.projection.width / (this.viewport.bottomRight.x - this.viewport.topLeft.x);
    }
}

export {
    Viewport
};
