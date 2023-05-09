let a = [];
let cn = [];
let cd = [];
let s = 0;
let sz = 8;

let cam;

function setup() {
	
	createCanvas(windowWidth, windowHeight);
	noStroke();
	cam = createCapture({video: {width: {min: 640}, height: {min: 480}}});
	cam.hide();
  c = createImage(640, 480);
	
	pg = createGraphics(10, 10);
	pg.fill(0);
	pg.noStroke();
	pg.textFont('monospace', 10);
	for (let f = 0; f < 8; f++) {
		ch = f + 32;
		append(cn, char(ch));
		pg.background(255);
		pg.text(char(ch), 2, 7.5);
		for (let y = 0; y < pg.height; y++) {
			for (let x = 0; x < pg.width; x++) {
				let c = pg.get(x, y);
				let b = int(pg.brightness(c) / 100);
				append(a, b);
				b = 0;
			}
		}
		for (let i = 0; i < a.length; i++) {
			s += a[i];
		}
		append(cd, createVector(char(ch), s/10));
		a = [];
		s = 0;
	}
	
	cd.sort(function(a, b) {
    return a.y - b.y;
  });
	
	if (width < height) {
		
		sz = 12;

	}

}

function draw() {

	background(0);

	if (cam.width > 0) {
		w = cam.width;
		h = cam.height;
	}
	
  c = createImage(w, h);
	
	bg = createGraphics(w, h);
	bg.noStroke();
	bg.textFont('monospace', sz);

	if (width / height >= w / h) {

		nW = width;
		nH = width / (w / h);
		oX = 0;
		oY = (height - nH) / 2;

	} else {

		nW = height * (w / h);
		nH = height;
		oX = (width - nW) / 2;
		oY = 0;

	}
	
	bg.background(30);

  cam.loadPixels();
  c.loadPixels();
  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
        let i = (y * cam.width + x) * 4;
        let j = (y * cam.width + (cam.width - x - 1)) * 4;
        c.pixels[j] = cam.pixels[i];
        c.pixels[j + 1] = cam.pixels[i + 1];
        c.pixels[j + 2] = cam.pixels[i + 2];
        c.pixels[j + 3] = cam.pixels[i + 3];
    }
	}
  c.updatePixels();
	
  c.loadPixels();
  for (let x = 0; x < cam.width; x += sz) {
    for (let y = 0; y < cam.height; y += sz) {
      i = ((y * cam.width) + x) * 4;
      r = c.pixels[i];
      g = c.pixels[i + 1];
      b = c.pixels[i + 2];
      bg.fill(225);
      d = map(b, 255, 0, 0, cd.length-1);
      v = cd[int(d)].x;
      if (v) {
        bg.text(v, x, y);
      }
    }
  }

	push();
	image(bg, oX, oY, nW, nH);
	pop();
}

function windowResized() {

	resizeCanvas(windowWidth, windowHeight);

}

function mousePressed() {
	if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
		let fs = fullscreen();
		fullscreen(!fs);
	}
}
