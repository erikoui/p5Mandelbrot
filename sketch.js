//it's very slow, be patient lulz

const w=1920;
const h=1080;
const max_iter=64;
var zoom=500;
var offsetX=0;
var offsetY=0;

function setup(){
    createCanvas(w, h);
}

function setPixel(x,y,r,g,b,a = 255){
    let d = pixelDensity();
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
            // loop over
            index = 4 * ((y * d + j) * width * d + (x * d + i));
            pixels[index] = r;
            pixels[index+1] = g;
            pixels[index+2] = b;
            pixels[index+3] = a;
        }
    }
}

function mouseDragged() {
    offsetX -= mouseX-pmouseX;
    offsetY -= mouseY-pmouseY;
  }
  
  function mouseWheel(event) {
    var e = -event.delta;
  
    if (e>0) { //zoom in
        zoom=zoom+200;
      for (var i=0; i<e; i++) {
        if (tow>30*width) return; //max zoom
        offsetX += zoom * (mouseX - offsetX);
        offsetY += zoom * (mouseY - offsetY);
      }
    }
    
    if (e<0) { //zoom out
        zoom=zoom-200;
      for (var i=0; i<-e; i++) {
        if (tow<width) return; //min zoom
        offsetX -= zoom/(zoom+1) * (mouseX - offsetX); 
        offsetY -= zoom/(zoom+1) * (mouseY - offsetY);
      }
    }
  }

function mandelbrot(){
    loadPixels();
    var i,j;
    for(i=0;i<w;i++){
        for(j=0;j<h;j++){
            var x=(i+offsetX)/zoom;
            var y=(j+offsetY)/zoom;
            var re=0.0;
            var im=0.0;
            var iter=0;
            while(re**2+im**2<4 && iter<max_iter){
                   var t=re**2-im**2+x;
                   im=2*re*im+y;
                   re=t;
                   iter++;
            }
            r=iter/max_iter*255;
            g=iter/max_iter*255;
            b=iter/max_iter*255;
            setPixel(i,j,r,g,b);
        }
    }
    updatePixels();
}

function draw(){
    //clear();
    //handle_keys();
    mandelbrot();
}