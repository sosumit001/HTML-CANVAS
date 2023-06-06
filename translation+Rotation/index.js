var canvas = document.getElementById('canvas')

const _width = canvas.width = 500,
      _height = canvas.height = 400
var ctx = canvas.getContext('2d')

function getWheelCoordinates(Xc, Yc, R) {

    const coordinates = [];
    for (let x = Xc - R; x <= Xc + R; x++) {
      for (let y = Yc - R; y <= Yc + R; y++) {
        if (Math.pow(x - Xc, 2) + Math.pow(y - Yc, 2) === Math.pow(R, 2)) {
          const A = Math.atan2(y - (Yc + R), x - Xc);
         
          coordinates.push({ angle:A });
        }
      }
    }
    return coordinates;
  }
let time = 0;
let t = 0.09
let _x = 250;
let _y = 200;
let _sign = 1


let angles = getWheelCoordinates(250,200,50);

const draw_structure = (A) => {

  _x = _x + t;

  if(_x >= 450 || _x <= 50) {t = -t; _sign = - _sign}
  ctx.beginPath()
  ctx.arc(_x + 25*(Math.sin(2*A)),_y - _sign*25*Math.cos(2*A),25,0,2*Math.PI)
  ctx.lineWidth = 3
  ctx.stroke();
}

function Animate(){
  time = time + 0.01;
  
  ctx.clearRect(0,0,_width,_height);
 
  angles.forEach((v,index) => {
    draw_structure(v.angle)
    if(v.angle >= Math.PI){
      v.angle = 0;
    }
    v.angle = v.angle + 0.01;
  })
  // console.log(angles)
 requestAnimationFrame(Animate)
}
Animate();



createWheel();
