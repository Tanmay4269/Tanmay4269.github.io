drops = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(239, 187, 255);
  frameRate(120);

  if (true) {
    for (let i = 0; i < 5; i++) spawn();
  }

  let dropsToRemove = [];
  for (let drop of drops) {
    drop.run();
    if (drop.pos.y > height + 50) dropsToRemove.push(drop);
  }

  for (let drop of dropsToRemove) {
    drops.splice(drops.indexOf(drop), 1);
  }
}

function spawn() {
  const pos = createVector(random(-width, width), 0);
  const vel = createVector(1, 2);
  vel.normalize();

  const speed = random(10, 16);
  vel.mult(speed);

  const dist = map(speed, 10, 16, 10, 0);
  drops.push(new Drop(pos, vel, dist));
}
