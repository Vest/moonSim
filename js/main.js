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

    for (let i = 0; i < 6; i++) {
        const zoomBtn = document.getElementById(`btnZoom${i}`);
        zoomBtn.addEventListener("click", () => {
            board.changeZoom(zoomBtn.dataset.level);
        });
    }
    document.getElementById("btnZoom3").click(); // default zoom level to avoid FF page state caching

    console.timeEnd("Init");
});

