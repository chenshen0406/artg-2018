// /*
// 	1 Function scope
// */
// //Carefully consider the scope of each of the variables
const apple = 'fuji';

function fruit(){
	const orange = 'navel';

	console.log(apple); //will this work? why?
};

console.log(apple); //will this work? why?
//console.log(orange); //will this work? why?


let b = 1;

function add (a){
	const temp = a + b;
	b = b + 1;
	return temp;
}



// /*
// 	2 "this" context of functions
// */
// //2.1: a regular function
function foo(){
	console.log(this); //window object
}
foo();

// //2.2: function attached to an object
const someObj = {
	prop1: 'some value',
	foo: function(){
		console.log(this);
	}
}
someObj.foo();

// //2.3: a twist on 2.2
const bar = someObj.foo;
console.group('---2.3---')
bar();
console.groupEnd();


// //2.4
// //We can use function.prototype.bind to copy an existing function and arbitrarily assign its "this" context
const baz = someObj.foo.bind('I am some arbitrary string');
baz();

//2.5
//One frequent use of "this" in relation to d3 is when we use the selection.each function
d3.select(document.querySelector('body'))
	.selectAll('span')
	.data(['a','b','c','d','e'])
	.enter()
	.append('span')
	.each(function(d,i){
		console.group('---2.5---');
		console.log(this); //what is "this"? element, <span></span>
		console.log(d);//datum
		console.log(i);//index
		console.groupEnd();

	});

//2.6
//Also beware of "this" context when using selection.on
d3.select(document.getElementById('dummy-button'))
	.on('click', function(d){
		console.group('---2.6---');
		console.log(this); //what is "this"? <button id="dummy-button"></button>
		console.log(d);
		console.groupEnd();

		d3.select(this).html('clicked' + Math.random());
		//YOUR CODE HERE
		//How do you change the html content of the button to "I'm clicked?"
	});


//selection.call(funciton...) it means function(d), d==selection, it won't interput, can continue write .apppend .attr

/*
	3 Closure
*/
const xSaysY = function(x){

	let name = x;

	return function(msg){
		return `${name} says "${msg}"`;
	}
}

const simonSays = xSaysY('Simon');
console.log(simonSays);
console.log(typeof simonSays);
console.log(simonSays('hello world'));


let alpha = 3;

function toBeBet(x){
	x = x + 1
	return x
}

console.log(toBeBet(alpha));//4
console.log(alpha);//3, number just be copied, the original number won't change. if alpha is a string or object [],{}, the original alpha will change.
