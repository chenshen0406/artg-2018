import * as d3 from 'd3';


/***
  Week 6: Basics of canvas API
	https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
***/

//6.1 Create canvas element
//Remember to set width and height explicitly
const canvas = d3.select('.container')
      .append('canvas')
      .attr('width',1000)
      .attr('height',500)
      .node();
      // .style('width','2000px') independent of actual pixel dimension

const ctx = canvas.getContext('2d');


//6.2 Customize fill, stroke, lineWidth
ctx.fillStyle = 'rgb(255,200,200)';

//6.3 Draw
//Primitive shapes: rectangle
ctx.fillRect(0,0,500,250);
ctx.fillStyle = 'rgb(0,0,0)';
ctx.strokeStyle = 'rgb(200,255,255)';
// ctx.fillRect(100,100,500,250);
ctx.strokeRect(100,100,500,250);

//Primitive shapes: text
ctx.fillText('hello world', 500, 250);

//Path : line
ctx.strokeStyle = 'rgba(0,0,0, .3)';
ctx.beginPath();
//..issue commands
ctx.moveTo(0,250);
ctx.lineTo(1000,250);
ctx.closePath();
ctx.fill();
ctx.stroke();

//Grid at 50px
//draw the horizontal gridelines
ctx.beginPath();
for(let y = 0; y<= 500; y += 50){
  ctx.moveTo(0,y);
  ctx.lineTo(1000,y);
}
for(let x = 0; x<= 1000; x += 50){
  ctx.moveTo(x,0);
  ctx.lineTo(x,500);
}
ctx.closePath();
ctx.stroke();

//Path : arc
ctx.beginPath();
ctx.fillStyle = 'rgb(250,200,10)';
ctx.arc(500,250,100,0, Math.PI/2);
// ctx.arc(500,250,100,0, Math.PI/2,ture);
// ctx.moveTo(900,250);
// ctx.arc(800,250,100,0, Math.PI*2);
ctx.closePath();
ctx.fill();
// ctx.stroke();


//Path : circle


//Path : curves
ctx.beginPath();
ctx.moveTo(0,500);
ctx.quadraticCurveTo(500, 0, 1000, 500);
ctx.closePath;
ctx.stroke();

//Canvas transform


//6.4 Drawing multiple path with Path2D
const path1 = new Path2D();
const path2 = new Path2D();
const path3 = d3.path();//<canvas> to <svg> using d3.path

for(let i = 0; i<100; i++){
  const x = Math.random()*1000; //(x<1000)
  const y = Math.random()*500;  //(y<500)
  path1.moveTo(x+5, y);
  path1.arc(x,y,5,0,Math.PI*2);
  path2.moveTo(x+5,y);
  path2.arc(x,y,5,0,Math.PI*2);

  path3.moveTo(x+10,y);
  path3.arc(x,y,10,0,Math.PI*2);
}
ctx.fillStyle = 'rgb(230,255,210)';
ctx.strokeStyle = 'rgb(230,255,210)'
ctx.fill(path1);
ctx.stroke(path2);

d3.select('.container')
  .append('svg')
  .attr('width',1000)
  .attr('height',500)
  // .append('path')
  // .attr('d',path3.toString());
  .append('circle')
  .attr('cx',0)
  .attr('cy',0)
  .attr('r',3)
  .transition()
  .duration(5000)
  .attr('cx',1000)
  .attr('cy',500)
  .attr('r',20)
//6.5 <canvas> to <svg> using d3.path


//6.6 Basic canvas animations
const canvas2 = d3.select('.container')
    .append('canvas')
    .attr('width',1000)
    .attr('height',500)
    .node();
const ctx2 = canvas2.getContext('2d');

// let x = 0;// use let because this element will change
// let y = 0;
// const speed = .05;
//
// function redraw(delta){
//   //Refresh the canvas
//   ctx2.clearRect(0,0,1000,500);
//
//   //Draw a fresh frame
//   ctx2.beginPath();
//   ctx2.arc(x,y,5,0,Math.PI*2);
//   ctx2.closePath();
//   ctx2.fill();
//
//   //update x and y
//   x += speed *2;
//   y += speed;
//
//   requestAnimationFrame(redraw); // run it when it is ready
// }

function makePoint(w,h){
  return{
    x:Math.random()*1000,
    y:Math.random()*500,
    speedX:(Math.random() - .5)*10,//can go both right and left
    speedY:(Math.random() - .5)*5,
    update:function(){
      this.x = this.x + this.speedX;
      if(this.x > 1000 || this.x < 0){
        this.speedX = -1 * this.speedX
      }
      if(this.y > 500 || this.x < 0){
        this.speedY = -1 * this.speedY
      }
    }
  }
}

const point = makePoint(200,100);
const points = [];
for(let i = 0; i< 1000; i++){
    points.push(makePoint(1000,500));
}
function redraw(){
  ctx2.clearRect(0,0,1000,500);

  ctx2.beginPath();

  points.forEach(function(point){
    ctx2.moveTo(point.x, point.y);
    ctx2.arc(point.x,point.y,5,0,Math.PI*2);

    point.update;
  });

  ctx2.closePath();
  ctx2.fill();

  point.update();

  requestAnimationFrame(redraw);
}
redraw();
//Loop over redraw
// while(true){
//   redraw();
// }
