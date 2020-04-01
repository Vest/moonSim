import * as BoardUtils from "./board.js";
import {Coord} from "./space.js";

window.addEventListener("load", function (e) {
    console.time("Init");

    /** @type Moon */
    const moon = BoardUtils.createMoon();
    const sat = BoardUtils.createSatellite();
    const board = BoardUtils.createBoard("spaceCanvas");

    board.addBody(moon, new Coord(0, 0));
    board.addBody(sat, new Coord(moon.radius + 50, 0));

    console.timeEnd("Init");
});

