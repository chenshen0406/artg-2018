import * as d3 from 'd3';
import './style.css';

import parse from './parse';

console.log('Week 3 assignment 1: writing a reusable activity histogram');

//Set up DOM scaffolding
const width = d3.select('#activity-histogram').node().clientWidth;
const height = d3.select('#activity-histogram').node().clientHeight;
const margin = {t:20,r:100,b:20,l:100};
const w = width - margin.l - margin.r;
const h = height - margin.t - margin.b;
const plot = d3.select('#activity-histogram')
	.append('svg')
	.attr('width',width)
	.attr('height',height)
	.append('g')
	.attr('class','acitivity-histogram-inner')
	.attr('transform',`translate(${margin.l},${margin.t})`);

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//Bind selection to the entire array of trips, one to one
	plot
		.datum(trips) //note: .datum(), not .data()
		.each(activityHistogram);//every datum would be call activityHistogram function.

});

function activityHistogram(data){

	//Transform data
	//Group trips into discrete 15 minute bins, using the d3.histogram layout
	const histogram = d3.histogram()//a pipeline of dividing data to sevaral bins.
		.value(d => d.time_of_day0)
		.thresholds(d3.range(0,24,.25));//.25=15mins, to make a regulation of dividing bins.

	const tripsByQuarterHour = histogram(data)
		.map(d => {
			return {
				x0:d.x0, //left bound of the bin; 18.25 => 18:15
				x1:d.x1,
				volume:d.length//the number of tirps
			}
		});
	console.log(tripsByQuarterHour);//the function of transform data to bins.

	//Set up scales in the x and y direction
	const scaleX = d3.scaleLinear().domain([0,24]).range([0,w]);
	const maxVolume = d3.max(tripsByQuarterHour, d => d.volume);
	const scaleY = d3.scaleLinear().domain([0,maxVolume]).range([h,0]);
	//svg的y坐标是从左上角的（0，0）开始的，所以数值越大，反而y越小。0对的是h，maxVolume对的是0

	//Set up axis generator
	const axisY = d3.axisLeft()
		.scale(scaleY)
		.tickSize(-w);//the default direction is left. vcf

	const axisX = d3.axisBottom()
		.scale(scaleX)
		.tickFormat(d => {//??????
			const time = +d;//a string to a number
			console.log(time);
			const hour = Math.floor(time);//取整
			let min = Math.round((time-hour)*60);//四舍五入
			min = String(min).length === 1? "0"+ min : min;
			return `${hour}:${min}`
		});

	//Draw
	/*** YOUR CODE HERE ***/
	const binNodes = plot.selectAll('.binNodes') // selection of 0 element
			.data(tripsByQuarterHour)//'update'selection, of 0 element


	//Enter
	//In the enter selection. we "append" the right elements
	const binNodesEnter= binNodes.enter()//'enter' selection, of 5 elements, of empty spaces
		.append('rect')
		.attr('class', 'bin')
		.attr('x', d => scaleX(d.x0))
		.attr('width', d => (scaleX(d.x1) - scaleX(d.x0)-1))
		.attr('y', d => h)
		.attr('height', 0)
		.style('fill','white');


		const merged = binNodesEnter.merge(binNodes)
			.transition()
			.duration(2000)
			.style('fill','#dccdbc')
			.attr('x', d => scaleX(d.x0))
			.attr('width', d => (scaleX(d.x1) - scaleX(d.x0)-1))
			.attr('y', d => scaleY(d.volume))
			.attr('height', d => (h - scaleY(d.volume)));

	 binNodes.exit().remove;



	//Axis
	const axisXNode = d3.select(this)
		.selectAll('.axis-x')//selection of size 0
		.data([1]);//data array of 1 element
		//enter set will be size 1
		//exit 0
		//update 0
		//every time upadate the data, there just one axisX here,
		//it's doesn't matter if it is 1 in data([]), just make sure just one element here.
	const axisXNodeEnter = axisXNode.enter()
		.append('g')
		.attr('class','axis-x');
		//<g.axis-x>
	axisXNode.merge(axisXNodeEnter)
		.attr('transform',`translate(0,${h})`)
		.call(axisX);
		//draw the axis on <g .axis-x>

	const axisYNode = d3.select(this)
		.selectAll('.axis-y')
		.data([1]);
	const axisYNodeEnter = axisYNode.enter()
		.append('g')
		.attr('class','axis-y');
	axisYNode.merge(axisYNodeEnter)
		.call(axisY);

	axisYNodeEnter.select('.domain').style('display','none');
	axisYNodeEnter.selectAll('line')
		.style('stroke','rgb(80,80,80)')
		.style('stroke-dasharray','2px 2px');

}
