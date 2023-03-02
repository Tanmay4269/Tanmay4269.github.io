particles = [];

let explodeQtty = 50;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  background(0, 40);
  frameRate(120);

  for (let particle of particles) {
    particle.show();
    particle.update();
    if (particle.isDead()) {
      particles.splice(particle, 1);
    }
  }
}

function mousePressed() {
  explode(mouseX, mouseY, explodeQtty);
}

function mouseDragged() {
  explode(mouseX, mouseY, explodeQtty);
}

function explode(x, y, qtty) {
  for (let i = 0; i < qtty; i++) {
    const speed = random(1, 2);
    const lifeSpan = 1;
    particles.push(new Particle(x, y, speed, lifeSpan));
  }
}
