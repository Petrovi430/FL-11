function reverseNumber(n) {
	if (n!==undefined) {
		let rezult=0;
		while (n!==0) {
			rezult *= 10;
			rezult += n%10;
			n = parseInt(n/10)
		}
		return rezult;
	}
}

console.log(reverseNumber(123));
console.log(reverseNumber(-456));
console.log(reverseNumber(10000));