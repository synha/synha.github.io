Ant[] ants = new Ant[25];

float maxV = 0.3;
int backgroundColor = 255;
int radius = 10;

void setup() {
  size(window.innerWidth, 100);
  background(backgroundColor);
  noStroke();
  smooth();
  fill(150);
  
  for (int i = 0; i < ants.length; i++) {
    ants[i] = new Ant(random(radius, width-radius), random(radius, height-radius), 
                        nonZeroRand(-maxV, maxV), nonZeroRand(-maxV, maxV));
  }
}

float nonZeroRand(float low, float high) { 
  float val = 0;
  while (val == 0) {
    val = random(low, high);
  }
  return val;
}

void draw() {
  background(backgroundColor);
  
  for (int i = 0; i < ants.length; i++) {
    for (int j = i+1; j < ants.length; j++) {
      // test for collisions
      if (ants[i].collidedWithAtDistance(ants[j], 10)) {
        ants[i].collided = true;
        ants[j].collided = true;
      }
    }
    ants[i].update(); // update position and draw
  }
}

class Ant {
  float x, y, dx, dy;
  int r = radius;
  boolean collided = false;
  
  Ant(float x, float y, float dx, float dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  } 
  
  void update() {
    x += dx;
    y += dy;
    
    // bounce off walls
    if (x <= r || x >= width-r) { dx = -dx; }
    if (y <= r || y >= height-r) { dy = -dy; } 
  
    // mouse interaction
    if (mousePressed && isMouseOver()) {
      x = mouseX;
      y = mouseY;
    }
    
    // change colors
    noStroke();
    if (collided) {
      fill(30, 155, 230);
      collided = false;
    } else {
      fill(230);
    }
    ellipse(x, y, r, r);
  }
  
  boolean isMouseOver() {
    return (abs(mouseX - x) < r && abs(mouseY - y) < r);
  }
  
  boolean collidedWithAtDistance(Ant other, int distance) {
    if ( sq(other.x - x) + sq((other.y - y)) <= distance*(r * other.r) ) {
      stroke(150);
      line(x, y, other.x, other.y);
      return true;
    } else {
      return false;
    }
  }
}
