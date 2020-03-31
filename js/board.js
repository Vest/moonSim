import * as Space from "./space.js";
import {Coord} from "./space.js";
import {Viewport} from "./utils.js"

const SPACE_X1 = -1e7; // 10.000 km
const SPACE_Y1 = 1e7;
const SPACE_X2 = 1e7;
const SPACE_Y2 = -1e7;
const STEP_X = 1e6; // 1.000 km
const STEP_Y = 1e6;

class Board {
    constructor(canvas) {
        Object.defineProperties(this, {
            ctx: {value: canvas.getContext("2d", {alpha: false})}, // type: CanvasRenderingContext2D
            width: {value: canvas.width},
            height: {value: canvas.height}
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
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawMassive() {
        for (let body of this._massiveObjects) {

        }
    }

    onRefreshFrame(timestamp) {
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.clearRect(0, 0, this.width, this.height); // clear canvas

        this.drawBackground();
        this.drawAxes();
        this.drawMassive();

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
