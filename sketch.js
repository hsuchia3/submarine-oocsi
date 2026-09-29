let lightOn = false;
let centerX, centerY;
let lightDiameter = 400;
let ringDiameter = 520;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  centerX = width / 2;
  centerY = height / 2;

  // connect to OOCSI server
  let clientName = "p5_Receiver_team12_" + floor(random(10000));
  OOCSI.connect("wss://oocsi.id.tue.nl/ws", clientName);
  
  OOCSI.subscribe("OOCSI-things/team-12", function(msg) {
    if (msg.data.hasOwnProperty("lampo_toggle")) {
      lightOn = msg.data.lampo_toggle;
      
      console.log(lightOn);
      
      /*if you want to clicking a button to turn on the light and click again to turn off, please use this code:
      let isPressed = msg.data.lampo_toggle;
      if (isPressed === true) {
        lightOn = !lightOn;
      }
      */
    }
  });
}
//design of the submarine

function draw() {
  // Background
  background(92, 70, 25);
  drawMetalBackground();

  // Outer metal ring
  stroke(35);
  strokeWeight(7);
  fill(150, 105, 25);
  ellipse(centerX, centerY, ringDiameter, ringDiameter);

  // Inner outline of the metal ring
  stroke(210, 155, 45);
  strokeWeight(3);
  noFill();
  ellipse(centerX, centerY, ringDiameter - 20, ringDiameter - 20);

  // Draw the screws
  drawScrews();

  // Main light
  stroke(20);
  strokeWeight(10);

  if (lightOn) {
    fill(255, 250, 220);
  } else {
    fill(10);
  }
  ellipse(centerX, centerY, lightDiameter, lightDiameter);

  // Glow while the light is on
  if (lightOn) {
    noFill();
    stroke(255, 240, 170, 100);
    strokeWeight(8);
    ellipse(centerX, centerY, lightDiameter + 15, lightDiameter + 15);

    stroke(255, 240, 170, 50);
    strokeWeight(12);
    ellipse(centerX, centerY, lightDiameter + 30, lightDiameter + 30);
  }
}

// --------------------------------
// MOUSE INTERACTION
// --------------------------------

function mousePressed() {
  if (mouseIsOverLight()) {
    lightOn = true;
  }
}

function mouseReleased() {
  lightOn = false;
}

function mouseIsOverLight() {
  let distanceFromCentre = dist(mouseX, mouseY, centerX, centerY);
  return distanceFromCentre < lightDiameter / 2;
}

// --------------------------------
// SCREWS
// --------------------------------

function drawScrews() {
  let screwCount = 8;
  let screwRadius = ringDiameter / 2 - 28;

  for (let i = 0; i < screwCount; i++) {
    let angle = TWO_PI / screwCount * i;
    let x = centerX + cos(angle) * screwRadius;
    let y = centerY + sin(angle) * screwRadius;
    drawScrew(x, y);
  }
}

function drawScrew(x, y) {
  // Screw head
  stroke(15);
  strokeWeight(3);
  fill(55);
  ellipse(x, y, 24, 24);

  // Cross on the screw
  stroke(10);
  strokeWeight(3);
  line(x - 6, y - 6, x + 6, y + 6);
  line(x + 6, y - 6, x - 6, y + 6);
}

// --------------------------------
// METAL BACKGROUND
// --------------------------------

function drawMetalBackground() {
  // Central metal panel
  noStroke();
  fill(110, 82, 25, 100);
  rect(80, 0, width - 160, height);

  // Panel edges
  stroke(50, 40, 15);
  strokeWeight(3);
  line(80, 0, 80, height);
  line(width - 80, 0, width - 80, height);

  // Metal texture / rust spots
  randomSeed(5);
  noStroke();

  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let spotSize = random(2, 9);

    fill(
      random(40, 90),
      random(25, 55),
      random(10, 25),
      random(30, 100)
    );
    
    ellipse(x, y, spotSize, spotSize);
  }
}