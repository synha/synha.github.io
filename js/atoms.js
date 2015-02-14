var numAtoms = 25;
var maxVelocity = 0.3;
var radius = 8;

var canvas;
var ctx;
var atoms = [];
var collidedIndices;
var lineCoordinates;

// animation timer config
var fps, fpsInterval, then, now, elapsed;
requestAnimationFrame = window.requestAnimationFrame || 
						window.mozRequestAnimationFrame || 
						window.webkitRequestAnimationFrame || 
						window.msRequestAnimationFrame || 
setTimeout;

function init() {
	var width = canvas.width;
	var height = canvas.height;

 	// create a bunch of atoms
 	var i;
 	for (i = 0; i < numAtoms; i++) {
 		atoms[i] = {
 			x: Math.floor(Math.random() * (width - 2 * radius) + radius),
 			y: Math.floor(Math.random() * (height - 2 * radius) + radius),
 			dx: Math.random() * 2 * maxVelocity - maxVelocity,
 			dy: Math.random() * 2 * maxVelocity - maxVelocity,
 			collided: false
 		};
 	}

	// initialize timer settings
	fps = 24;
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;
}

function start() {
	now = Date.now();
	elapsed = now - then;

	if (elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval);
		update();
		draw();
	}

	requestAnimationFrame(start);
}

function update() {
	// update everyone's position
	var i, j;
	for (i = 0; i < atoms.length; i++) {
		atoms[i].x += atoms[i].dx;
		atoms[i].y += atoms[i].dy;

		// bounce off walls
		if (atoms[i].x <= radius || atoms[i].x >= width - radius) {
			atoms[i].dx = -atoms[i].dx;
			atoms[i].x += atoms[i].dx;
		}
		if (atoms[i].y <= radius || atoms[i].y >= height - radius) {
			atoms[i].dy = -atoms[i].dy;
			atoms[i].y += atoms[i].dy;
		}
	}

	// check for collisions
	collidedIndices = new Set();
	lineCoordinates = new Set();
	for (i = 0; i < atoms.length; i++) {
		for (j = 0; j < atoms.length; j++) {
			if (i == j) { continue; } // don't check self for collision
			if (isCollided(atoms[i], atoms[j])) {
				collidedIndices.add(i);
				collidedIndices.add(j);
				lineCoordinates.add({
					x1: atoms[i].x,
					y1: atoms[i].y,
					x2: atoms[j].x,
					y2: atoms[j].y
				});
			}
		}
	}
}

function sq(x) { return x*x; }

function isCollided(atom1, atom2) {
	var distance = 30;
	if (sq(atom2.x - atom1.x) + sq(atom2.y - atom1.y) <= distance * sq(radius)) {
		return true;
	} else {
		return false;
	}
}

function draw() {
	ctx.clearRect (0, 0, canvas.width, canvas.height);

	// draw the connecting lines
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgba(50,50,50,0.3)";
	lineCoordinates.forEach(function(coords) {
		ctx.beginPath();
		ctx.moveTo(coords.x1, coords.y1);
		ctx.lineTo(coords.x2, coords.y2);
		ctx.stroke();
	})

	// draw the uncollided atoms
	var i;
	ctx.fillStyle="rgba(230, 230, 230, 1)"
	for (i = 0; i < atoms.length; i++) {
		// this atom has collided so we'll draw it later
		if (collidedIndices.has(i)) { continue; }
		drawCircle(atoms[i].x, atoms[i].y, radius); 
	}

	// draw all the collided atoms
	ctx.fillStyle = "rgba(30, 155, 230, 1)"
	collidedIndices.forEach(function(i) {
		drawCircle(atoms[i].x, atoms[i].y, radius); 
	});
}

function drawCircle(x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true); 
	ctx.closePath();
	ctx.fill();
}

window.onload = function(){
	canvas = document.getElementById("animation");
	ctx = canvas.getContext("2d");
	ctx.canvas.width  = window.innerWidth - 10;
	ctx.canvas.height = 100;

	width = ctx.canvas.width - 10;
	height = ctx.canvas.height - 10;

	init();
	start();
};