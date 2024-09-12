Could plants start growing on the cube when mouse is moved: let vertices = [];
let baseSize = 700; // Base size of the cube
let explosionIntensity = 2.0; // Increase this for a more pronounced effect

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Use windowWidth and windowHeight for full viewport
  // Define vertices of the cube
  vertices[0] = createVector(-baseSize, -baseSize, -baseSize);
  vertices[1] = createVector(baseSize, -baseSize, -baseSize);
  vertices[2] = createVector(baseSize, baseSize, -baseSize);
  vertices[3] = createVector(-baseSize, baseSize, -baseSize);
  vertices[4] = createVector(-baseSize, -baseSize, baseSize);
  vertices[5] = createVector(baseSize, -baseSize, baseSize);
  vertices[6] = createVector(baseSize, baseSize, baseSize);
  vertices[7] = createVector(-baseSize, baseSize, baseSize);
}

function draw() {
  background(255); // Set background to white
  
  // Rotate the cube based on the mouse position
  rotateX(radians(mouseY / 2)); // Slow down rotation
  rotateY(radians(mouseX / 2)); // Slow down rotation
  
  stroke(0);
  noFill();
  
  let distance = dist(mouseX, mouseY, width / 2, height / 2) / 100;
  
  // Draw edges of the cube
  for (let i = 0; i < 4; i++) {
    let next = (i + 1) % 4;
    
    // Apply explosion effect and draw edges
    let v1 = applyExplosion(vertices[i], distance);
    let v2 = applyExplosion(vertices[next], distance);
    let v3 = applyExplosion(vertices[i + 4], distance);
    let v4 = applyExplosion(vertices[next + 4], distance);

    line(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    line(v3.x, v3.y, v3.z, v4.x, v4.y, v4.z);
    line(v1.x, v1.y, v1.z, v3.x, v3.y, v3.z);
    line(v2.x, v2.y, v2.z, v4.x, v4.y, v4.z);
  }
}

// Apply explosion effect to a vertex
function applyExplosion(vertex, distance) {
  // Calculate explosion factor
  let factor = 1 / (1 + distance * explosionIntensity); // Reverse the scaling factor
  // Apply the factor to the vertex
  return createVector(vertex.x * factor, vertex.y * factor, vertex.z * factor);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}