let a1 = prompt('Enter a1', '');
let a2 = prompt('Enter a2', '');
let b1 = prompt('Enter b1', '');
let b2 = prompt('Enter b2', '');
let c1 = prompt('Enter c1', '');
let c2 = prompt('Enter c2', '');
let isValid = true;

if (a1===null || a2===null || b1===null || b2===null || c1===null || c2===null) {
	isValid = false;
} else {
	a1 = a1.trim();
	a2 = a2.trim();
	b1 = b1.trim();
	b2 = b2.trim();
	c1 = c1.trim();
	c2 = c2.trim();

	if(a1==='' || a2==='' || b1==='' || b2==='' || c1==='' || c2==='') {
		isValid = false;
	} else {
		a1 = +a1;
		a2 = +a2;
		b1 = +b1;
		b2 = +b2;
		c1 = +c1;
		c2 = +c2;
		if(isNaN(a1) || isNaN(a2) || isNaN(b1) || isNaN(b2) || isNaN(c1) || isNaN(c2)) {
			isValid = false;
		} 
	}
}

if(isValid) {
	const half = 2;
	const rez1 = (a1+b1)/half;
	const rez2 = (a2+b2)/half;

	if (c1===rez1 && c2===rez2) {
		console.log(true);
	} else {
		console.log(false);
	}
} else {
	console.log(false);		
}



