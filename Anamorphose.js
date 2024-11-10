//let shape1, shape2;
//let layer1_1, layer1_2, layer1_3;
//let layer2_1, layer2_2, layer2_3;

//let lastSwitchTime = 0;
//let showFirstImage = true;
//let glitchMode = false;
//let glitchDuration = 200; // Duration of glitch effect in milliseconds

//const canvas = document.getElementById('anamorphoseCanvas');
//const context = canvas.getContext('2d');

//canvas.width = 841;
//canvas.height = 595;

//function preload() {
  // Load the SVG shapes from the new location
  //shape1 = loadSVG('Assets/Ana1.svg');
  //shape2 = loadSVG('Assets/Ana2.svg');
//}

//function setup() {
  //createCanvas(841, 595); // p5.js canvas
  //canvas = document.getElementById('anamorphoseCanvas'); // Getting the custom canvas by ID
  //context = canvas.getContext('2d'); // Get context for 2D operations
  
  // Get the specific layers from each shape
  //layer1_1 = shape1.getChild('Layer_1');
  //layer1_2 = shape1.getChild('Layer_2');
  //layer1_3 = shape1.getChild('Layer_3');

  //layer2_1 = shape2.getChild('Layer_1');
  //layer2_2 = shape2.getChild('Layer_2');
  //layer2_3 = shape2.getChild('Layer_3');
//}

//function draw() {
  // p5.js canvas for drawing shapes
  //background(0);
  //translate(width / 2, height / 2);
  //scale(0.75);

 // if (millis() - lastSwitchTime > 2000) {
   // showFirstImage = !showFirstImage;
   // lastSwitchTime = millis();
   // glitchMode = true;
  //}

  //if (glitchMode && millis() - lastSwitchTime < glitchDuration) {
    //applyGlitchEffect();
  //} else {
   // if (showFirstImage) {
   //   displayShape(shape1, layer1_1, layer1_2, layer1_3);
   // } else {
   //   displayShape(shape2, layer2_1, layer2_2, layer2_3);
   // }
  //}
//}

//function displayShape(shape, layer1, layer2, layer3) {
  //let centerX = -shape.width / 2;
  //let centerY = -shape.height / 2;

  // Layer 1
  //layer1.disableStyle();
  //noFill();
  //stroke(0, 255, 0);
 // strokeWeight(0.5);
  //shape(layer1, centerX, centerY); // Render layer1

  // Layer 2
  //layer2.disableStyle();
  //fill(0, 255, 0);
  //stroke(0, 255, 0);
  //shape(layer2, centerX, centerY); // Render layer2

  // Layer 3
  //layer3.disableStyle();
 // noFill();
  //stroke(0);
  //shape(layer3, centerX, centerY); // Render layer3
//}

//function applyGlitchEffect() {
  //let centerX = -shape1.width / 2;
  //let centerY = -shape1.height / 2;

  // Adjust horizontal displacement for left-to-right glitch effect
 // for (let i = 0; i < 3; i++) {
    //let currentLayer = showFirstImage ? shape1.getChild('Layer_' + (i + 1)) : shape2.getChild('Layer_' + (i + 1));

    //currentLayer.disableStyle();

    // Random fill and stroke color for glitch effect
    //fill(random(100, 255), random(100, 255), random(100, 255), 100);
   // stroke(random(100, 255), random(100, 255), random(100, 255), 150);
   // strokeWeight(random(0.5, 1.5));

    // Create an increasing x-offset for a horizontal glitch effect
    //let offsetX = map(i, 0, 2, -10, 10); // gradually shifts layers from left to right
    //let offsetY = random(-5, 5); // minimal vertical displacement for a left-to-right effect

   // // Apply the glitch effect by drawing the layer with the random offsets
   // shape(currentLayer, centerX + offsetX, centerY + offsetY);
 // }
//}
