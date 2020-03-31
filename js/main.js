import * as BoardUtils from "./board.js";

window.addEventListener("load", function (e) {
    console.time("Init");

    const moon = BoardUtils.createMoon();
    const sat = BoardUtils.createSatellite();
    const board = BoardUtils.createBoard("spaceCanvas");


    console.timeEnd("Init");
});

