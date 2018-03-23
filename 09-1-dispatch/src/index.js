import {select,path,event,mouse,dispatch} from 'd3';//so select = d3.select
import './style.css';

const div = select('.container')
	.append('div')
	.classed('module',true);
const w = div.node().clientWidth;
const h = div.node().clientHeight;
const plot = div.append('svg')
	.attr('width',w)
	.attr('height',h);

//Draw shapes
const circle = plot.append('g')
	.attr('transform',`translate(${w/4},${h/2})`)
	.append('circle')
	.attr('r',w/16);
const square = plot.append('g')
	.attr('transform',`translate(${w/4*2},${h/2})`)
	.append('rect')
	.attr('x',-w/16)
	.attr('y',-w/16)
	.attr('width',w/8)
	.attr('height',w/8);
const triangle = plot.append('g')
	.attr('transform',`translate(${w/4*3},${h/2})`)
	.append('path');
const pathData = path();
pathData.moveTo(0,-w/16);
pathData.lineTo(w/16,w/16);
pathData.lineTo(-w/16,w/16);
pathData.lineTo(0,-w/16);
triangle.attr('d',pathData.toString());//??????

// //Basic d3 event API
// //selection.on(eventType, callback)
// circle.on('click',function(d){
// 	console.log(d);
// 	console.log(this);
// 	console.log(event);
// });//traditional function
//
// // circle.on('click',(d,i)=>{
// // 	console.log(d);
// // 	console.log(this);//this == undefined
// // 	console.log(event);
// // });//error function
//
// square
// 	.on('mouseenter',function(d){
// 		console.log(this);
// 	})
// 	.on('mouseleave', d => {
// 		console.log(this);
// 	});
//
// //On mouseenter
// //Turn circle red
// circle
// 	.on('mouseenter',function(d){
// 		select(this).transition().style('fill','red');
// 		square.transition().style('fill','red');
// 		triangle.transition().style('fill','red');
// 	})
// 	.on('mouseleave', function(d){
// 		select(this).transition().style('fill','black');
// 		square.transition().style('fill','black');
// 		triangle.transition().style('fill','black');
// 	});
// //Turn square green
// square
// 	.on('mouseenter.foo',function(d){ //add name after mouseenter,then you can trrigle two callback in one event
// 		select(this).transition().style('fill','green');
// 	})
// 	.on('mouseleave', function(d){
// 		select(this).transition().style('fill','black');
// 	});
//
// 	// square
// 	// 	.on('.foo',null);
//
// //Turn triangle blue
// triangle
// 	.on('mouseenter',function(d){
// 		select(this).transition().style('fill','blue');
// 	})
// 	.on('mouseleave', function(d){
// 		select(this).transition().style('fill','black');
// 	});


//d3.dispatch //factory
//dispatcher//instance
const dispatcher = dispatch('element:changeColor');

//How do we make these three elements interact among themselves?
circle
		.on('mouseenter', ()=> {dispatcher.call('element:changeColor','I am context','red');})
		.on('mouseleave',()=>{dispatcher.call('element:changeColor',null,'black');})
	//broadcast to the dispatch that mouseenter event occured
square
		.on('mouseenter', ()=> {dispatcher.call('element:changeColor',null,'green');})
		.on('mouseleave',()=>{dispatcher.call('element:changeColor',null,'black');})
triangle
		.on('mouseenter', ()=> {dispatcher.call('element:changeColor',null,'blue');})
		.on('mouseleave',()=>{dispatcher.call('element:changeColor',null,'black');})

dispatcher.on('element:changeColor',function(arg){
		console.log(this); // when hover circle, then the text 'i am context' will show in console

		triangle.transition().style('fill',arg);
		circle.transition().style('fill',arg);
		square.transition().style('fill',arg);
})
//dispatch broadcast event back out to all the subscribers
