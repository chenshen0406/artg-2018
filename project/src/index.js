import * as d3 from 'd3';

//Import utility function
import parse from './utils';
import dotsGroup from './components/dotsGroup';


// const dots_group = dotsGroup(document.querySelector('.viewTwo') );

d3.csv('./data/terrorism_us.csv', parse, function(err,terrorism){

	//Nest terrorism by states
	const terrorismByState = d3.nest()
		.key(function(d){ return d.state})
		.entries(terrorism);

	//add total number of each state into original data
	const stateTotalData = terrorismByState.map(ste => {
		 const nbr = ste.values.length;
			return {
				nbr,
				...ste
			}
		});
		console.log(stateTotalData);

		const tryData = stateTotalData.map(d =>d.key);
		console.log(tryData);

	 // calculate how many terrorisms in each state
	//  const stateTotalData = terrorismByState.map(ste => {
	// 	 let nbr = ste.values.length;
	// 		return {
	// 			nbr,
	// 			...ste
	// 		};
	// 	});

// console.log(stateTotalData);
// d3.select('.statesNodes')
// 			.datum(terrorismByState)
// 			.each(dots_group);
const dots_group = dotsGroup();
// dots_group(terrorismByState);

	const statesNodes = d3.select('#dots-group')
		.selectAll('.states-node')
		.data(stateTotalData);
  const statesNodesEnter = statesNodes.enter()
    		.append('div')
    		.attr('class','states-node')//this one is important, without this one, every time will add new to the old one.
    		.style('width','300px')
    		.style('height','180px')
    		.style('float','left');
  	// statesNodes.exit().remove();
  	statesNodes.merge(statesNodesEnter)
  		.each(dots_group);

  });
