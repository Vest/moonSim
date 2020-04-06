const G = 6.67408e-11 // m³/(kg·s²) - gravitational constant

class Universe {
    constructor() {
        Object.defineProperty(this, "massBodies", {
            value: []
        });

        Object.defineProperty(this, "lightBodies", {
            value: []
        });

        this._isRunning = false;
    }

    addBody(body, startPosition, startVelocity) {
        const b = new Body(body, startPosition, startVelocity);

        if (body.isMassive) {
            b.velocity = new Velocity(0, 0); // massive bodies do not fly
            this.massBodies.push(b);
        } else {
            this.lightBodies.push(b);
        }

        return b;
    }

    makeStep() {
        if (!this._isRunning) {
            return;
        }
        console.log("step");
        const moonState = this.massBodies[0];
        const satState = this.lightBodies[0];

        const dx = satState.position.x - moonState.position.x;
        const dy = satState.position.y - moonState.position.y;
        const alpha = Math.atan2(dy, dx);
        const distSquared = dx * dx + dy * dy;
        const orbit = Math.sqrt(distSquared) - moonState.body.radius;
        const acc = G * moonState.body.weight / distSquared;

        satState.acc.ax = -acc * Math.cos(alpha); //direction toward the Moon
        satState.acc.ay = -acc * Math.sin(alpha);

        satState.velocity.vx += satState.acc.ax;
        satState.velocity.vy += satState.acc.ay;

        console.log(`Angle between dy & dx is ${alpha * 180 / Math.PI} deg`);
        console.log(`Lunar orbit: ${orbit} m`);

        satState.position.x += satState.velocity.vx;
        satState.position.y += satState.velocity.vy;

        //  debugger
    }

    start() {
        this._isRunning = true;
        console.log("World, start!");
    }

    stop() {
        this._isRunning = stop;
        console.log("World, stop!");
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
/*
function getAngle(dx, dy) {
    const EPSILON = 0.000001;
    const tan = Math.abs(dy / dx);
    let alpha = 0;

    if (Math.abs(dx) < EPSILON && dy > 0)
        alpha = -Math.PI / 2;
    else if (Math.abs(dx) < EPSILON && dy < 0)
        alpha = Math.PI / 2;
    else {
        alpha = Math.atan(tan);

        if (dx > 0 && dy < 0)
            alpha = alpha;
        else if (dx < 0 && dy > 0)
            alpha -= Math.PI;
        else if (dx < 0 && dy < 0)
            alpha = Math.PI - alpha;
        else if (dx > 0 && dy > 0)
            alpha *= -1;
        else if (dx > 0 && Math.abs(dy) < EPSILON)
            alpha = 0;
        else if (dx < 0 && Math.abs(dy) < EPSILON)
            alpha = Math.PI;
    }

    return alpha;
}


 */
