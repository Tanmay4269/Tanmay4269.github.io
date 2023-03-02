class Drop {
    constructor(pos, vel, dist) {
        this.pos = pos;
        this.vel = vel;

        // dist => min = 0; max = 10
        //this.len = map(dist, 0, 10, 35, 10);
        this.len = map(dist, 0, 10, 20, 5);
        this.color = lerpColor(color(105, 24, 131), color(239, 187, 255), map(dist, 0, 10, 0, 1));
        //this.color = lerpColor(color(105, 24, 131), color(190, 42, 236), map(dist, 0, 10, 0, 1));
        this.weight = map(dist, 0, 10, 5, 2);
        this.angle = -(this.vel.angleBetween(createVector(1, 0)));
        //this.angle = p5.Vector.angleBetween(this.vel, p5.Vector(1, 0));
    }

    run() {
        this.show();
        this.update();
    }

    show() {
        strokeWeight(this.weight);
        strokeCap(ROUND);
        stroke(this.color);
        line(this.pos.x - this.len/2 * cos(this.angle), this.pos.y - this.len/2 * sin(this.angle), 
            this.pos.x + this.len/2 * cos(this.angle), this.pos.y + this.len/2 * sin(this.angle));
    }

    update() {
        this.pos.add(this.vel);

        this.vel.x += 0.1;
    }
}