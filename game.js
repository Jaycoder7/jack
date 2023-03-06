const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var e = 32;
var bob =0;
const amplitudeInput = document.getElementById("amplitude");
const lengthInput = document.getElementById("length");
const periodInput = document.getElementById("period");
const massInput = document.getElementById("mass");
const frictionInput = document.getElementById("friction");
const gravityInput = document.getElementById("g");
var gameState="Start";
let amplitude = parseFloat(amplitudeInput.value);
let length = parseFloat(lengthInput.value);
let period = parseFloat(periodInput.value);
let mass = parseFloat(massInput.value);
let friction = parseFloat(frictionInput.value);
 let g = parseFloat(gravityInput.value);
amplitudeInput.addEventListener("input", update);
lengthInput.addEventListener("input", update);
periodInput.addEventListener("input", update);
massInput.addEventListener("input", update);
frictionInput.addEventListener("input", update);
gravityInput.addEventListener("input", update);
let angle = amplitude * Math.PI / 180;
let angularVelocity = 0;
let angularAcceleration = 0;

function update() {
  amplitude = parseFloat(amplitudeInput.value);
  length = parseFloat(lengthInput.value);
  period = parseFloat(periodInput.value);
  mass = parseFloat(massInput.value);
  friction = parseFloat(frictionInput.value);
 g = parseFloat(gravityInput.value);
}

  
/*function start(gameState){
 ctx.clearRect(0,0, canvas.width,canvas.height);
  ctx.font = "30px Times New Roman";
length = 0;
amplitude = 0;  
  ctx.strokeText("Jack Sparrow is stuck on a island, Edit the features of the pendulum to get him across sucessfully!", 200 , 200);
  ctx.strokeText("Press Space to start", 200 , 300);
 (window).keypress(function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    console.log('Space pressed');
    //do some stuff here
   
  }
});
doument.keypress(e);
}
*/
function animate() {

  
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

 
  ctx.beginPath();
  var h = 100;
  var j = 300;
  jack=ctx.arc(75, 300, 25, 0, 2 * Math.PI);
  ctx.fill();


  let newImage = new Image();
  newImage.src = 'bob.png'

  // When it loads
  newImage.onload = () => {
      // Draw the image onto the context
      ctx.drawImage(newImage, -90, 200, 250, 208);
      
  }
  ctx.drawImage(newImage, -90, 200, 250, 208);

 
  const time = Date.now() / 1000;
  const periodTime = 2 * Math.PI * Math.sqrt(length / g);
  const timeDiff = time % periodTime;
  angle = amplitude * Math.cos(2 * Math.PI * timeDiff / period);
  angularAcceleration = -(g / length) * Math.sin(angle);
  angularVelocity += angularAcceleration;
  angularVelocity *= 1 - friction;
  const x = canvas.width / 2 + length * Math.sin(angle);
  const y = canvas.height / 2 + length * Math.cos(angle);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.beginPath();
  ball=ctx.arc(x, y, mass*2, 0, 2 * Math.PI);
  ctx.fill();
  const kineticEnergy = 0.5 * mass * length * length * angularVelocity * angularVelocity;
  const potentialEnergy = mass * g * length * (1 - Math.cos(angle));
  const totalEnergy = kineticEnergy + potentialEnergy;
  if (x < 100 && y > 300||bob==1){

bob=1;
ctx.font = "30px Times New Roman";
ctx.clearRect(0, 0, canvas.width, canvas.height);
length = 0;
amplitude = 0;  
ctx.strokeText("YOU WON!", 200 , 200);

  }
}
 //  if (gameState=="Start"){
   //  start();
 // }
//else{
animate();
//}


