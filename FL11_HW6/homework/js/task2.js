const a = +prompt('Enter side A', '');
const b = +prompt('Enter side B', '');
const c = +prompt('Enter side C', '');

if (a<=0 || isNaN(a) || b<=0 || isNaN(b) || c<=0 || isNaN(c)) {
	console.log('Triangle doesn’t exist’');
} else if (a<b+c && b<a+c && c<a+b) {
	if (a===c && b===c && c===a) {
		console.log('Eequivalent triangle');
	} else if (a===c || b===c || c===a) {
		console.log('Isosceles triangle');
	} else {
		console.log('Normal triangle');
	}

} else {
	console.log('Triangle doesn’t exist’');
}

