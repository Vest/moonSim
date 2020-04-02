const G = 6.67408e-11 // m³/(kg·s²) - gravitational constant

class Universe {
    constructor() {
        Object.defineProperty(this, "massBodies", {
            value: []
        });

        Object.defineProperty(this, "lightBodies", {
            value: []
        });
    }

    addBody(body, startPosition, startVelocity) {
        const b = new Body(body, startPosition, startVelocity);

        if (body.isMassive) {
            b.velocity = new Velocity(0, 0); // massive bodies do not fly
            this.massBodies.push(b);
        } else {
            this.lightBodies.push(b);
        }
    }

}

class Body {
    constructor(body, position, velocity) {
        this.body = body;
        this.position = position;
        this.velocity = velocity;
        this.acc = new Acceleration(0, 0); // acceleration
    }
}

class Velocity {
    constructor(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }
}

class Acceleration {
    constructor(ax, ay) {
        this.ax = ax;
        this.ay = ay;
    }
}

export {
    Universe, Velocity
};
