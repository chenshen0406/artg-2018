console.log('Week 2 Assignment 2');


/*
	1 Function scope
*/
//Carefully consider the scope of each of the variables
const apple = 'fuji';

function fruit(){
	const orange = 'navel';

	console.log(apple); //will this work? why?
	// It works, as apple is globally scoped.
};

console.log(apple); //will this work? why?
// It works, as apple is globally scoped.
//console.log(orange); //will this work? why?
// It won't work, as orange is locally scoped to the function fruit().



/*
	2 "this" context of functions
*/
//2.1: a regular function
function foo(){
	console.log(this); //window object
}
foo();

//2.2: function attached to an object
const someObj = {
	prop1: 'some value',
	foo: function(){
		console.log(this);
	}
}
someObj.foo();

//2.3: a twist on 2.2
const bar = someObj.foo;
bar();

//2.4
//We can use function.prototype.bind to copy an existing function and arbitrarily assign its "this" context
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
		console.log(this); //what is "this"?
		// this: the <span> node in the HTML document.
		console.log(d);
		console.log(i);
		console.groupEnd();
	});

//2.6
//Also beware of "this" context when using selection.on
d3.select(document.getElementById('dummy-button'))
	.on('click', function(d){
		console.group('---2.6---');
		console.log(this); //what is "this"?
		// this: the <button> node when it has been clicked.
		console.groupEnd();

		//YOUR CODE HERE
		//How do you change the html content of the button to "I'm clicked?"
d3.select(document.getElementById('dummy-button'))
		.innerHTML = "I'm clicked?"

	});




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
