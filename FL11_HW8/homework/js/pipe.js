function addOne(x) {
  return x + 1;
}

function pipe() {
	let rezult = arguments[0];
	for (let i=1; i<arguments.length; i++) {
		rezult = arguments[i](rezult);
	}
	return rezult;
}

console.log(pipe(1, addOne));
console.log(pipe(1, addOne, addOne));