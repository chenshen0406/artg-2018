import * as d3 from 'd3';

function dotsGroup(_){

  let _w;
  let _h;
  let ctx;

  const force = d3.forceSimulation();
  const collide = d3.forceCollide().radius(d => d.r + 0.5);
	const radial = d3.forceRadial();


  let stateData;


function exports(stateTotalData){
  stateData = stateTotalData;

  const width = this.clientWidth;
  const height = this.clientHeight;
  const margin = {t:10,r:10,b:10,l:10};
   _w = width - margin.l - margin.r;
   _h = height - margin.t - margin.b;

   const svg = d3.select(this)
      .selectAll('svg')
      .data([1]);
   const svgEnter = svg.enter().append('svg')
      .attr('width',width)
      .attr('height',height);
   svgEnter.append('g').attr('class','plot');

   const plot =svg.merge(svgEnter)
      .select('.plot')
      .attr('transform',`translate(${margin.l},${margin.t})`);

  //Draw the states to <svg>
  		const eachStatesNodes = svg.selectAll('.state')
  			.data(stateData,function(d){return d.key});
      console.log(stateData);


  		const eachStatesNodesEnter = eachStatesNodes.enter()
  			.append('g')
  			.attr('class','state');

  		eachStatesNodesEnter.append('circle').attr('r', d => d.r).style('fill','rgb(0,0,150)');
  		// stationsEnter.append('text').text(d => d.code3)
  		// 	.style('fill','rgb(0,120,255)')
  		// 	.attr('text-anchor','middle')
  		// 	.style('font-size','8px')
  		// 	.attr('dy','3px');
  		eachStatesNodesEnter
  			.merge(eachStatesNodes);
  			// .attr('transform', d => `translate(${d.x}, ${d.y})`)
  			// .on('mouseenter',function(d,i){
  			// 		_dispatch.call('selection:station',null, d);
  			// })
  			// .on('mouseleave',function(d,i){
  			// 		_dispatch.call('unselection:station',null);
  			// });
console.log(eachStatesNodes);
//   const tau = 2* Math.PI;
//
//
//
// //Data transformation
//    stateTotalData = terrorismByState.map(ste => {
//     const nbr = ste.values.length;
//      return {
//        nbr,
//        ...ste
//      }
//    });
//    console.log(terrorismByState);
//
//    const root = d3.select(_);
//
//   //append canvas
//   let canvas = root
//     .selectAll('.animation-layer-canvas')
//     .data([1]);
//
//   canvas = canvas.enter().append("canvas")
//       .attr('class','animation-layer-canvas')
//       .merge(canvas)
//       .attr("width", _w)
//       .attr("height", _h)
//       .style('position','absolute')
// 			.style('top',0)
// 			.style('left',0);
//
// ctx = canvas.node().getContext("2d");
//
//     const eachStateNodes = canvas.selectAll('.state')
//       .data(terrorismByState, d => d.nbr)
//
//     const nodes = d3.range(3).map(function(i) {
//         return {
//           r: Math.random() * 10 + 4
//         };
//       });
//
//
//       const simulation = d3.forceSimulation(nodes)
//           .velocityDecay(0.2)
//           .force("x", d3.forceX().strength(0.002))
//           .force("y", d3.forceY().strength(0.002))
//           .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
//           .on("tick", ticked);
//
//       function ticked() {
//         ctx.clearRect(0, 0, _w, _h);
//         ctx.save();
//         ctx.translate( _w/ 2, _h/ 2);
//
//         ctx.beginPath();
//         nodes.forEach(function(d) {
//           ctx.moveTo(d.x + d.r, d.y);
//           ctx.arc(d.x, d.y, d.r, 0, tau);
//         });
//         ctx.fillStyle = "#ddd";
//         ctx.fill();
//         ctx.strokeStyle = "#333";
//         ctx.stroke();
//         ctx.restore();
//       }



  // dotsForce
  //     .nodes(stateTotalData.nbr)
  //     // .links(graph.links)
  //     .on("tick", tick)
  //     .start();
  //
  // function tick() {
  //   ctx.clearRect(0, 0, _w, _h);
  //
  //   // draw nodes
  //   ctx.fillStyle = "steelblue";
  //   ctx.beginPath();
  //   stateTotalData.nbr.forEach(function(d) {
  //     ctx.moveTo(d.x, d.y);
  //     ctx.arc(d.x, d.y, 4.5, 0, 2 * Math.PI);
  //   });
  //   ctx.fill();
  // }
}

  return exports;

}

export default dotsGroup;
