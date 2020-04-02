import * as BoardUtils from "./board.js";
import {Coord} from "./space.js";
import {Universe, Velocity} from "./universe.js";

window.addEventListener("load", function (e) {
    console.time("Init");

    /** @type Moon */
    const moon = BoardUtils.createMoon();
    const sat = BoardUtils.createSatellite();
    const board = BoardUtils.createBoard("spaceCanvas");
    const universe = new Universe();

    for (let i = 0; i < 6; i++) {
        const zoomBtn = document.getElementById(`btnZoom${i}`);
        zoomBtn.addEventListener("click", () => {
            board.changeZoom(zoomBtn.dataset.level);
        });
    }
    document.getElementById("btnZoom3").click(); // default zoom level to avoid FF page state caching

    universe.addBody(moon, new Coord(0, 0));
    universe.addBody(sat, new Coord(moon.radius + 100, 0), new Velocity(2, 0));

    board.addBody(universe.massBodies[0].body, universe.massBodies[0].position);
    board.addBody(universe.lightBodies[0].body, universe.lightBodies[0].position);


    console.timeEnd("Init");
});

