import * as Space from "./space.js";
import {Coord} from "./space.js";
import {Viewport} from "./utils.js"

const SPACE_X1 = -0.5e7; // 10.000 km
const SPACE_Y1 = 0.5e7;
const SPACE_X2 = 0.5e7;
const SPACE_Y2 = -0.5e7;
const STEP_X = 1e6; // 1.000 km
const STEP_Y = 1e6;

class Board {
    /**
     * Creates a board object
     * @constructor
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        /**
         * @name Board#ctx
         * @type {CanvasRenderingContext2D}
         * @readonly
         */
        Object.defineProperty(this, "ctx", {
            value: canvas.getContext("2d", {
                alpha: false
            })
        });

        /**
         * @name Board#width
         * @type {Number}
         * @readonly
         */
        Object.defineProperty(this, "width", {
            value: canvas.width
        });

        /**
         * @name Board#height
         * @type {Number}
         * @readonly
         */
        Object.defineProperty(this, "height", {
            value: canvas.height
        });

        this._massiveObjects = [];
        this._lightObjects = [];
        this._positions = new Map();
        this._viewport = new Viewport(
            new Coord(SPACE_X1, SPACE_Y1), new Coord(SPACE_X2, SPACE_Y2),
            this.width, this.height
        );

        window.requestAnimationFrame((t) => this.onRefreshFrame(t));
    }

    drawBackground() {
        this.ctx.save();
        this.ctx.fillStyle = '#EEEEEE';
        this.ctx.strokeStyle = '#EEEEEE';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.restore();
    }

    drawAxes() {
        let abscissaX1 = this._viewport.projectX(SPACE_X1);
        let abscissaY1 = this._viewport.projectY(0);

        let abscissaX2 = this._viewport.projectX(SPACE_X2);
        let abscissaY2 = this._viewport.projectY(0);

        let ordinateX1 = this._viewport.projectX(0);
        let ordinateY1 = this._viewport.projectY(SPACE_Y1);

        let ordinateX2 = this._viewport.projectX(0);
        let ordinateY2 = this._viewport.projectY(SPACE_Y2);

        // Draw Axes
        this.ctx.save();
        this.ctx.strokeStyle = '#BBBBBB';
        this.ctx.beginPath();
        this.ctx.moveTo(abscissaX1, abscissaY1);
        this.ctx.lineTo(abscissaX2, abscissaY2);
        this.ctx.moveTo(ordinateX1, ordinateY1);
        this.ctx.lineTo(ordinateX2, ordinateY2);
        this.ctx.stroke();

        this.ctx.strokeStyle = '#BBBBBB';

        this.ctx.beginPath();
        for (let tickX = SPACE_X1; tickX < SPACE_X2; tickX += STEP_X) {
            let abscissaX = this._viewport.projectX(tickX);

            this.ctx.moveTo(abscissaX, abscissaY1 - 2);
            this.ctx.lineTo(abscissaX, abscissaY1 + 2);
        }
        for (let tickY = SPACE_Y2; tickY < SPACE_Y1; tickY += STEP_Y) {
            let ordinateY = this._viewport.projectY(tickY);

            this.ctx.moveTo(ordinateX1 - 2, ordinateY);
            this.ctx.lineTo(ordinateX1 + 2, ordinateY);
        }
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawMassive() {
        let centerX = 0, centerY = 0, radius = 0;

        for (let body of this._massiveObjects) {
            centerX = this._viewport.projectX(this._positions.get(body.key).x);
            centerY = this._viewport.projectY(this._positions.get(body.key).y);
            radius = this._viewport.projectLength(body.radius);

            const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0.0, '#FFFEFA');
            gradient.addColorStop(0.2, '#FFFEFA');
            gradient.addColorStop(0.9, '#FDFADF');
            gradient.addColorStop(1.0, 'gray');

            this.ctx.save();
            this.ctx.fillStyle = gradient;

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.restore();
        }
    }

    drawLight() {
        let centerX = 0, centerY = 0, radius = 0;

        for (let body of this._lightObjects) {
            centerX = this._viewport.projectX(this._positions.get(body.key).x);
            centerY = this._viewport.projectY(this._positions.get(body.key).y);

            this.ctx.save();
            this.ctx.fillStyle = "Black";

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.restore();
        }
    }

    onRefreshFrame(timestamp) {
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.clearRect(0, 0, this.width, this.height); // clear canvas

        this.drawBackground();
        this.drawMassive();
        this.drawLight();
        this.drawAxes();

        window.requestAnimationFrame((t) => this.onRefreshFrame(t));
    }

    addBody(body, coord) {
        if (!body.key) {
            throw new Error("The provided body cannot be used");
        }

        if (this._positions.has(body.key)) {
            throw new Error("The provided body has been already used");
        }

        this._positions.set(body.key, coord);

        if (body.isMassive) {
            this._massiveObjects.push(body);
        } else {
            this._lightObjects.push(body);
        }
    }
}

/**
 * Creates the Moon body using data from input elements
 * @returns {Moon}
 */
export function createMoon() {
    const weight = document.getElementById("moonWeightInput").valueAsNumber;
    const radius = document.getElementById("moonRadiusInput").valueAsNumber;

    return new Space.Moon(weight, radius);
}

export function createSatellite() {
    const weight = document.getElementById("satWeightInput").valueAsNumber;

    return new Space.Satellite(weight);
}

export function createBoard(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        throw new Error(`Cannot find a canvas element with Id ${canvasId}`);
    }
    if (!canvas.getContext) {
        throw new Error("Canvas is not supported on this browser");
    }

    return new Board(canvas);
}
