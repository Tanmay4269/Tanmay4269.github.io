class Particle {
    constructor(x, y, speed, lifeSpan) { // lifespan in sec
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();

        this.r = 2;

        this.bornTime = millis() / 1000;
        this.lifeSpan = lifeSpan;
        this.clockOfLife = 0;
        this.alpha = 255;

        this.vel.mult(speed);
        this.acc.set(0, 0.1)
    }

    run() {
        this.show();
        this.update();
    }

    show() {
        noStroke();
        fill(255, this.alpha);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    update() {
        this.clockOfLife = millis() / 1000 - this.bornTime;

        this.pos.add(this.vel);
        this.vel.add(this.acc);

        this.alpha = map(this.clockOfLife, 0, this.lifeSpan, 255, 0);
    }

    isDead() {
        if (this.clockOfLife > this.lifeSpan) {
            return true; 
        }
        else return false;
    }
}