let img;

function preload() {
    img = loadImage('https://images.squarespace-cdn.com/content/v1/57a64231b8a79b2fec260383/1719338118160-CFQEBSOHGDV7O0OYN8DK/image-asset.jpeg?format=2500w');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    img.resize(windowWidth, windowHeight);
    noLoop(); // Stops draw from looping automatically
    drawScene();
}

function drawScene() {
    clear();
    image(img, 0, 0);
    applyGrain();
}

function glitchEffect() {
    let numGlitches = int(random(5, 15));

    for (let i = 0; i < numGlitches; i++) {
        let sliceHeight = int(random(5, 30));
        let y = int(random(height));
        let glitchOffset = int(random(-50, 50));

        let slice = img.get(0, y, width, sliceHeight);
        image(slice, glitchOffset, y);
    }
}

function applyGrain() {
    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4;
            let grain = random(-40, 50);
            pixels[index] += grain;
            pixels[index + 1] += grain;
            pixels[index + 2] += grain;
        }
    }
    updatePixels();
}

function mouseMoved() {
    drawScene();
    glitchEffect();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    img.resize(windowWidth, windowHeight);
    drawScene();
}
