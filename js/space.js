let key = 0;

function getKey() {
    return key++;
}

class Moon {
    constructor(weight, radius) {
        Object.defineProperties(this, {
            weight: {value: weight},
            radius: {value: radius},
            key: {value: getKey()},
        });
    }
}

Moon.prototype.isMassive = true;

class Satellite {
    constructor(weight) {
        Object.defineProperties(this, {
            weight: {value: weight},
            key: {value: getKey()}
        });
    }
}

Satellite.prototype.isMassive = false;

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export {
    Moon, Satellite, Coord
};
