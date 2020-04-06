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

    const lunarOrbit = document.getElementById("satOrbitInput").valueAsNumber;
    const satSpeed = document.getElementById("satStartVelocityInput").valueAsNumber;

    let massiveBody = universe.addBody(moon, new Coord(0, 0));
    board.addBody(massiveBody.body, massiveBody.position);

    let lightBody = universe.addBody(sat, new Coord(moon.radius + lunarOrbit, 0), new Velocity(0, satSpeed));
    board.addBody(lightBody.body, lightBody.position);

    const btnStart = document.getElementById("btnStart");
    const btnStop = document.getElementById("btnStop");
    let stepIntervalHandle;
    btnStart.addEventListener("click", () => {
        btnStart.disabled = true;
        btnStop.disabled = false;
        universe.start();

        stepIntervalHandle = window.setInterval(() => {
            universe.makeStep();
        }, 1);

    });
    btnStop.addEventListener("click", () => {
        btnStart.disabled = false;
        btnStop.disabled = true;
        clearInterval(stepIntervalHandle);
        universe.stop();
    });

    console.timeEnd("Init");
});

