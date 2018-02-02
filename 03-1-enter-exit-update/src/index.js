import * as d3 from 'd3';
import './style.css';

//Observe the import syntax
import {parse} from './utils';

console.log('Week 3');

//Set up
const margin = {t:20, r:200, b:20, l:200};
const w = d3.select('#plot').node().clientWidth;
const h = d3.select('#plot').node().clientHeight;
const width = w - margin.l - margin.r;
const height = h - margin.t - margin.b;

const plot = d3.select('#plot').append('svg')
	.attr('width',w)
	.attr('height',h)
	.append('g')
	.attr('transform',`translate(${margin.l},${margin.t})`);

//Scales
const scaleRadius = d3.scaleSqrt().domain([0,100]).range([0,150]);

//Import and parse data
d3.csv('./data/olympic_medal_count.csv', parse, function(err,data){

	console.log(data);

	//Buttons
	d3.select('.container').append('button').html('1900').on('click',function(){
		const medalsCount1900 = data.map(function(d){
			return {
				country:d.country,
				count:d.count_1900
			}
		});

		redraw(medalsCount1900);
	});

	d3.select('.container').append('button').html('1960').on('click',function(){
		const medalsCount1960 = data.map(d => {
			return{
				country:d.country,
				count:d.count_1960
			}
		});

		redraw(medalsCount1960);
	});

	d3.select('.container').append('button').html('2012').on('click',function(){
		const medalsCount2012 = data.map(d => ({
				country:d.country,
				count:d.count_2012
			}));

			redraw(medalsCount2012);
	});


});

function redraw(count){

	const top5 = count.sort(function(a,b){return b.count-a.count}).slice(0,5);
	// const top5 = count.sort(a,b) => {return b.count-a.count}.slice(0,5);same
	console.log(top5);

	const countryNodes = plot.selectAll('.country') // selection of 0 element
			.data(top5, function(d){return d.country})//'update'selection, of 0 element


//Enter
//In the enter selection. we "append" the right elements
	const countryNodesEnter= countryNodes.enter()//'enter' selection, of 5 elements, of empty spaces
		.append('g')
		.attr('class', d => {
			return d.country.split(' ').join('-') + ' country'; //if delete 'country', every time click button, will append 5 new circle, because the new 5 circles will not defined into class 'country', then the plot.selectAll('.country') is still a selection of 0 elements, so it will append another new 5 circles.
		})
		// .attr('transform',(d,i) => `translate(${i * width/4},${height/2})`);

		countryNodesEnter
			.append('circle')
			.style('fill','pink')
			.attr('r',0)
			.transition()
			.attr('r',function(d){ return scaleRadius(d.count)});

		countryNodesEnter
			.append('text')
			.text(d => d.country);



			//update
			//we "update" existing elements
			// countryNodes // update selection of <g> element
			// 	.transition()
			// 	.duration(1000)
			// 	.attr('transform',(d,i) => `translate(${i*width/4},${height/2})`);
			countryNodes
				.select('circle')
				.transition()
				.duration(1000)
				.attr('r',function(d){ return scaleRadius(d.count)});
			countryNodes
				.select('text')
				.text(d=> d.country);

				const merged = countryNodes.merge(countryNodesEnter)
					.transition()
					.duration(1000)
					.attr('transform',(d,i) => `translate(${i*width/4},${height/2})`);//all circles will come from (0,0)

			countryNodes.exit().remove;

}