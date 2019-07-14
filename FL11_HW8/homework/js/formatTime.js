function formatTime(time) {
	let days, hours, minutes;
	if (time>=0) {
		days = parseInt(time/1440);
		time = time%1440;
		hours = parseInt(time/60);
		minutes = time%60;
		return `${days} day(s) ${hours} hour(s) ${minutes} minute(s).`;
	}
}

console.log(formatTime(120));
console.log(formatTime(59));
console.log(formatTime(3601));