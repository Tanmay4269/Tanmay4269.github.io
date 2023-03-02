// returns an array of position vectors
function poissonDiskSampling(width, height, r, k = 30) {
  let result = [];
  let grid = [];
  let active = [];
  let cols = floor(width / (r / sqrt(2)));
  let rows = floor(height / (r / sqrt(2)));
  let w = r / sqrt(2);

  for (let i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  let x = random(width);
  let y = random(height);
  let i = floor(x / w);
  let j = floor(y / w);
  let pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);

  while (active.length > 0) {
    let randIndex = floor(random(active.length));
    let pos = active[randIndex];
    let found = false;
    for (let n = 0; n < k; n++) {
      let sample = p5.Vector.random2D();
      let mag = random(r, 2 * r);
      sample.setMag(mag);
      sample.add(pos);
      let col = floor(sample.x / w);
      let row = floor(sample.y / w);
      if (
        col > -1 &&
        row > -1 &&
        col < cols &&
        row < rows &&
        !grid[col + row * cols]
      ) {
        let ok = true;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            let index = col + i + (row + j) * cols;
            let neighbor = grid[index];
            if (neighbor) {
              let d = p5.Vector.dist(sample, neighbor);
              if (d < r) {
                ok = false;
              }
            }
          }
        }
        if (ok) {
          found = true;
          grid[col + row * cols] = sample;
          active.push(sample);
          result.push(sample);
        }
      }
    }
    if (!found) {
      active.splice(randIndex, 1);
    }
  }

  return result;
}

// creates a distorted circle
class Blob {
  constructor(x, y, radius, f) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.f = f;

    noiseSeed(random(100));

    this.show();
  }

  show() {
    let sides = 50;

    push();
    translate(this.x, this.y);
    beginShape();
    for (let i = 0; i < sides; i++) {
      const a = TWO_PI * (i / sides);
      const r = this.r + 20 * customNoise(a * this.f, TWO_PI * this.f);
      vertex(r * cos(a), r * sin(a));
    }
    endShape(CLOSE);
    pop();
  }
}

// the above (blob class) code uses this
function customNoise(a, a_max) {
  let t = map(a, 0, a_max, 0, TWO_PI);
  let x = map(cos(t), -1, 1, 0, 0.5);
  let y = map(sin(t), -1, 1, 0, 0.5);
  let noiseVal = noise(x, y);
  return map(noiseVal, 0, 1, -1, 1);
}
