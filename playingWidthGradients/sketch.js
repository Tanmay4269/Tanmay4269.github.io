function setup() {
  createCanvas(400, 400);
  pixelDensity(1);

  loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height/2; j++) {
      const index = 4 * (i + j * width);

      let p = map(j, 0, height/2, 1, 0); // percent lerp for lerpColor

      if (i < width* 1/6) {
        
      } else if (i > width* 1/6 && i < width* 2/6) {
        p = smoothstep(p);
      } else if (i > width* 2/6 && i < width * 3/6){
        p = smootherstep(p);
      } else if (i > width* 3/6 && i < width * 4/6) {
        p = inverse_smoothstep(p);
      } else if (i > width* 4/6 && i < width * 5/6) {
        p = sqrt(p);
      } else {
        p = 1 - (1-p)**2
      }
      

      let c = lerpColor(color(0), color(0, 173, 239), p);

      pixels[index+0] = red(c);
      pixels[index+1] = green(c);
      pixels[index+2] = blue(c);
      pixels[index+3] = alpha(c);
    }
  }
  updatePixels();
}

function smoothstep(t) {
  let v1 = t**2;
  let v2 = 1 - (1 - t)**2;
  return lerp(v1, v2, t);
}

function smootherstep(t) {
  if (t < 0) {
    return 0;
  } else if (t > 1) {
    return 1;
  } else {
    return 6*t**5 - 15*t**4 + 10*t**3;
  }
}

function inverse_smoothstep(x) {
  return 0.5 - sin(asin(1.0 - 2.0 * x) / 3.0);
}
