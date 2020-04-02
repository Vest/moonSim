const ZOOM_LEVELS = [
    { // Min - 0
        SPACE_X1: -4e7,
        SPACE_Y1: 4e7,
        SPACE_X2: 4e7,
        SPACE_Y2: -4e7,
        STEP_X: 1e6,
        STEP_Y: 1e6
    }, { // 1
        SPACE_X1: -2e7,
        SPACE_Y1: 2e7,
        SPACE_X2: 2e7,
        SPACE_Y2: -2e7,
        STEP_X: 1e6,
        STEP_Y: 1e6
    }, { // 2
        SPACE_X1: -1e7,
        SPACE_Y1: 1e7,
        SPACE_X2: 1e7,
        SPACE_Y2: -1e7,
        STEP_X: 1e6,
        STEP_Y: 1e6
    }, { // 3 - default
        SPACE_X1: -0.5e7,
        SPACE_Y1: 0.5e7,
        SPACE_X2: 0.5e7,
        SPACE_Y2: -0.5e7,
        STEP_X: 1e6,
        STEP_Y: 1e6
    }, { // 4
        SPACE_X1: -0.3e7,
        SPACE_Y1: 0.3e7,
        SPACE_X2: 0.3e7,
        SPACE_Y2: -0.3e7,
        STEP_X: 1e5,
        STEP_Y: 1e5
    }, { // Max - 5
        SPACE_X1: -2e6,
        SPACE_Y1: 2e6,
        SPACE_X2: 2e6,
        SPACE_Y2: -2e6,
        STEP_X: 1e5,
        STEP_Y: 1e5
    }
];

class ViewportParams {
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
    ViewportParams, ZOOM_LEVELS
};
