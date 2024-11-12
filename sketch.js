let numParticles = 200; // Number of particles for each polygon
let particles = []; // Array to store particles

class Particle {
  constructor(x, y, polygon) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1); // Random velocity in X direction
    this.vy = random(-1, 1); // Random velocity in Y direction
    this.polygon = polygon;
  }

  update() {
    // Update position based on velocity
    this.x += this.vx;
    this.y += this.vy;

    // Check if the particle is within its polygon; if not, reverse direction
    if (!isPointInPolygon(this.x, this.y, this.polygon)) {
      this.vx *= -1;
      this.vy *= -1;
      this.x += this.vx; // Move back within bounds
      this.y += this.vy;
    }
  }

  display() {
    noStroke();
    fill(255); // Particle color
    ellipse(this.x, this.y, 1.5, 1.5); // Make particles slightly bigger
  }
}

function setup() {
  createCanvas(1682, 1190); // Double the canvas size
  background(0); // Clear background to black
  stroke(75, 0, 130); // Stroke color to bluish purple (RGB: 75, 0, 130)
  strokeWeight(0.5); // Stroke width to match SVG

  // Calculate the center of the polygons
  let centerX = 0;
  let centerY = 0;
  let totalPoints = 0;

  polygons.forEach(polygon => {
    polygon.forEach(vertex => {
      centerX += vertex[0];
      centerY += vertex[1];
      totalPoints++;
    });
  });

  centerX /= totalPoints;
  centerY /= totalPoints;

  // Calculate the offset to move everything to the center
  let offsetX = width / 2 - centerX * 2;
  let offsetY = height / 2 - centerY * 2;

  // Generate particles for each polygon
  polygons.forEach(polygon => {
    for (let i = 0; i < numParticles; i++) {
      let p = createParticleInPolygon(polygon, offsetX, offsetY);
      if (p !== null) {
        particles.push(p);
      }
    }
  });
}

function draw() {
  background(255); // Clear the background to white every frame

  // Calculate the smaller offset for all polygons
  let offsetY = sin(frameCount * 0.07) * 5; // Keep this for movement, doubled

  // Apply the translation for centering
  translate(-100,-200); // Center the canvas
  
  // Draw all polygons
  polygons.forEach((polygon, i) => {
    fill(0); // Set fill color to black for all polygons
    stroke(255); // Ensure stroke color is bluish purple for all polygons
    beginShape();
    polygon.forEach(vertexCoord => {
      let animatedY = vertexCoord[1] * 2 + ((i % 2 === 0) ? offsetY : -offsetY); // Scale Y-coordinates and animate
      let animatedX = vertexCoord[0] * 2; // Scale X-coordinates
      vertex(animatedX, animatedY); // Use scaled coordinates
    });
    endShape(CLOSE);
  });

  // Display and update particles
  particles.forEach(p => {
    p.update(); // Update particle position
    p.display(); // Display particle
  });
}

// Function to create a particle within the bounds of a polygon
function createParticleInPolygon(polygon, offsetX, offsetY) {
  // Create a bounding box for the polygon
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  polygon.forEach(vertex => {
    minX = min(minX, vertex[0] * 2); // Scale the x-coordinate
    minY = min(minY, vertex[1] * 2); // Scale the y-coordinate
    maxX = max(maxX, vertex[0] * 2); // Scale the x-coordinate
    maxY = max(maxY, vertex[1] * 2); // Scale the y-coordinate
  });

  // Generate random position within the bounding box
  let x = random(minX, maxX); // Scale the random x-coordinate
  let y = random(minY, maxY); // Scale the random y-coordinate

  // Apply the offset to the particle position
  x += offsetX;
  y += offsetY;

  // Check if the generated point is inside the polygon
  if (isPointInPolygon(x, y, polygon)) {
    return new Particle(x, y, polygon); // Return a new particle with scaled coordinates
  }
  return null; // Return null if not inside the polygon
}

// Function to check if a point is inside a polygon using the ray-casting algorithm
function isPointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i][0] * 2, yi = polygon[i][1] * 2; // Scale vertices
    let xj = polygon[j][0] * 2, yj = polygon[j][1] * 2; // Scale vertices
    
    let intersect = ((yi > y) != (yj > y)) &&
                    (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
}

// Define polygons using arrays of vertex coordinates
let polygons = [
  [ [511.78, 310.71], [476.03, 326.9], [441.18, 310.87], [477.6, 294.02], [511.78, 310.71] ], // Polygon 0
  [ [548.5, 284.97], [512.75, 301.16], [477.89, 285.12], [514.31, 268.28], [548.5, 284.97] ], // Polygon 1
  [ [511.91, 262.98], [476.15, 279.16], [441.3, 263.13], [477.72, 246.29], [511.91, 262.98] ], // Polygon 2
  [ [476.08, 238.41], [441.13, 254.51], [441.05, 247.83], [414.01, 234.42], [441.89, 221.72], [476.08, 238.41] ], // Polygon 3
  [ [440.62, 247.66], [405.67, 263.75], [405.59, 257.08], [378.55, 243.67], [406.44, 230.97], [440.62, 247.66] ], // Polygon 4
  [ [403.94, 257.24], [368.99, 273.33], [368.91, 266.66], [341.87, 253.25], [369.75, 240.55], [403.94, 257.24] ], // Polygon 5
  [ [368.33, 265.8], [333.38, 281.89], [333.3, 275.22], [306.26, 261.81], [334.14, 249.11], [368.33, 265.8] ], // Polygon 6
  [ [332.39, 275.25], [311.96, 284.31], [297.54, 277.1], [289.51, 280.98], [270.31, 271.27], [298.2, 258.56], [332.39, 275.25] ], // Polygon 7
  [ [260.41, 267.76], [225.36, 284.23], [261.34, 301.72], [261.34, 294.67], [288.16, 280.5], [260.41, 267.76] ], // Polygon 8
  [ [295.99, 278.62], [260.95, 295.09], [296.93, 312.57], [296.93, 305.52], [323.74, 291.35], [295.99, 278.62] ], // Polygon 9
  [ [332, 288.69], [296.95, 305.16], [332.93, 322.65], [332.93, 315.6], [359.75, 301.43], [332, 288.69] ], // Polygon 10
  [ [367.59, 299], [332.54, 315.47], [368.52, 332.95], [368.52, 325.9], [395.34, 311.73], [367.59, 299] ], // Polygon 11
  [ [404.81, 308.78], [369.76, 325.25], [405.74, 342.74], [405.74, 335.69], [432.56, 321.52], [404.81, 308.78] ], // Polygon 12
  [ [477.38, 239.07], [441.44, 255.12], [441.44, 262.82], [477.25, 245.87], [477.38, 239.07] ], // Polygon 13
  [ [512.88, 263.22], [476.67, 279.67], [476.87, 285.27], [512.68, 268.32], [512.88, 263.22] ], // Polygon 14
  [ [476.62, 327.8], [440.88, 311.06], [440.99, 318.56], [477.11, 335.61], [476.62, 327.8] ], // Polygon 15
  [ [512.71, 302.7], [476.97, 285.96], [477.08, 293.46], [513.2, 310.51], [512.71, 302.7] ], // Polygon 16
  [ [476.04, 335.33], [440.29, 351.51], [405.43, 335.48], [441.85, 318.64], [476.04, 335.33] ]  // Polygon 17
];

