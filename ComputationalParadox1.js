const canvas = document.getElementById('paradoxCanvas');
const context = canvas.getContext('2d');

// Animation code here

let numParticles = 100;
let particles = [];

let polygons = [
  [[511.78, 310.71], [476.03, 326.9], [441.18, 310.87], [477.6, 294.02], [511.78, 310.71]],
  [[548.5, 284.97], [512.75, 301.16], [477.89, 285.12], [514.31, 268.28], [548.5, 284.97]],
  [[511.91, 262.98], [476.15, 279.16], [441.3, 263.13], [477.72, 246.29], [511.91, 262.98]],
  [[476.08, 238.41], [441.13, 254.51], [441.05, 247.83], [414.01, 234.42], [441.89, 221.72], [476.08, 238.41]],
  [[440.62, 247.66], [405.67, 263.75], [405.59, 257.08], [378.55, 243.67], [406.44, 230.97], [440.62, 247.66]],
  [[403.94, 257.24], [368.99, 273.33], [368.91, 266.66], [341.87, 253.25], [369.75, 240.55], [403.94, 257.24]],
  [[368.33, 265.8], [333.38, 281.89], [333.3, 275.22], [306.26, 261.81], [334.14, 249.11], [368.33, 265.8]],
  [[332.39, 275.25], [311.96, 284.31], [297.54, 277.1], [289.51, 280.98], [270.31, 271.27], [298.2, 258.56], [332.39, 275.25]],
  [[260.41, 267.76], [225.36, 284.23], [261.34, 301.72], [261.34, 294.67], [288.16, 280.5], [260.41, 267.76]],
  [[295.99, 278.62], [260.95, 295.09], [296.93, 312.57], [296.93, 305.52], [323.74, 291.35], [295.99, 278.62]],
  [[332, 288.69], [296.95, 305.16], [332.93, 322.65], [332.93, 315.6], [359.75, 301.43], [332, 288.69]],
  [[367.59, 299], [332.54, 315.47], [368.52, 332.95], [368.52, 325.9], [395.34, 311.73], [367.59, 299]],
  [[404.81, 308.78], [369.76, 325.25], [405.74, 342.74], [405.74, 335.69], [432.56, 321.52], [404.81, 308.78]],
  [[477.38, 239.07], [441.44, 255.12], [441.44, 262.82], [477.25, 245.87], [477.38, 239.07]],
  [[512.88, 263.22], [476.67, 279.67], [476.87, 285.27], [512.68, 268.32], [512.88, 263.22]],
  [[476.62, 327.8], [440.88, 311.06], [440.99, 318.56], [477.11, 335.61], [476.62, 327.8]],
  [[512.71, 302.7], [476.97, 285.96], [477.08, 293.46], [513.2, 310.51], [512.71, 302.7]],
  [[476.04, 335.33], [440.29, 351.51], [405.43, 335.48], [441.85, 318.64], [476.04, 335.33]]
];

class Particle {
  constructor(x, y, polygon) {
    this.x = x;
    this.y = y;
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
    this.polygon = polygon;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (!isPointInPolygon(this.x, this.y, this.polygon)) {
      this.vx *= -1;
      this.vy *= -1;
      this.x += this.vx;
      this.y += this.vy;
    }
  }

  display() {
    noStroke();
    fill(0, 255, 0);
    ellipse(this.x, this.y, 1.2, 1.2);
  }
}

function setup() {
  createCanvas(841, 595);
  for (let polygon of polygons) {
    for (let i = 0; i < numParticles; i++) {
      let p = createParticleInPolygon(polygon);
      if (p) {
        particles.push(p);
      }
    }
  }
}

function draw() {
  background(0);

  let offsetY = sin(frameCount * 0.05) * 2;

  for (let i = 0; i < polygons.length; i++) {
    stroke(0, 255, 0);
    fill(0, 50);
    beginShape();
    for (let vert of polygons[i]) {
      let animatedY = vert[1] + (i % 2 === 0 ? offsetY : -offsetY);
      vertex(vert[0], animatedY);
    }
    endShape(CLOSE);
  }

  for (let p of particles) {
    p.update();
    p.display();
  }
}

function createParticleInPolygon(polygon) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let vert of polygon) {
    minX = min(minX, vert[0]);
    minY = min(minY, vert[1]);
    maxX = max(maxX, vert[0]);
    maxY = max(maxY, vert[1]);
  }

  let x = random(minX, maxX);
  let y = random(minY, maxY);

  if (isPointInPolygon(x, y, polygon)) {
    return new Particle(x, y, polygon);
  }
  return null;
}

function isPointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i][0], yi = polygon[i][1];
    let xj = polygon[j][0], yj = polygon[j][1];

    let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}