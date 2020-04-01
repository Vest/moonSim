let key = Date.now();

function getKey() {
    return key++;
}

/**
 * Class representing the Moon.
 * @class Moon
 * @property {Number} radius - radius of the body in m.
 * @property {Number} key - just a unique key of the object, used in hash maps.
 */
class Moon {
    /**
     * Created the Moon body
     * @constructor
     * @param {Number} [weight] - the body's weight in kg.
     * @param {Number} [radius] - radius of the body in m.
     */
    constructor(weight, radius) {
        Object.defineProperties(this, {
            weight: {value: weight},
            radius: {value: radius},
            key: {value: getKey()},
        });
    }
}

Moon.prototype.isMassive = true;

/** Class representing the Satellite (or any flying body). */
class Satellite {
    weight;
    key;

    /**
     * Created the Satellite body
     * @param {Number} weight - the body's weight in kg.
     */
    constructor(weight) {
        Object.defineProperties(this, {
            weight: {value: weight},
            key: {value: getKey()}
        });
    }
}

Satellite.prototype.isMassive = false;

/** Class representing coordinate of the point. */
class Coord {
    /**
     * Created the Coord object
     * @param {Number} [x] - coordinate X in m.
     * @param {Number} [y] - coordinate Y in m.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export {
    Moon, Satellite, Coord
};
