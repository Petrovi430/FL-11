function getNumbers(str) {
	let rezult = [];
	for (let i=0; i<str.length; i++) {
		if (!isNaN(str[i])) {
			rezult.push(+str[i]);
		}
	}
	return rezult;
}
console.log(getNumbers('string')); 
console.log(getNumbers('n1um3ber95')); 


function findTypes(...arg) {
	let rezult = {};
	for(let item of arg) {
		let type = typeof item;
		let check = false;
		for(let el in rezult) {
			if (type === el) {
				check = true;
				break;
			} 
		}
		if (check) {
			rezult[type] += 1;
		} else {
			rezult[type] = 1;
		}
	}
	return rezult;
}
console.log(findTypes('number'));
console.log(findTypes(null, 5, 'hello', undefined, 'buy', (x) => x*x));

function executeforEach(arr, func) {
	for (let i=0; i<arr.length; i++) {
		func(arr[i], i);
	}
}
console.log(executeforEach([1,2,3], function(el) {
 console.log(el) 
}));


function mapArray(arr, func) {
	executeforEach(arr, (item, index) => {
		arr[index] = func(item);
	});
	return arr;
}
console.log(mapArray([2, 5, 8], function(el) {
 return el + 3 
})); 


function filterArray(arr, func) {
	let rezult = [];
	executeforEach(arr, (item) => {
		if (func(item)) {
			rezult.push(item);
		}
	});
	return rezult;
}
console.log(filterArray([2, 5, 8], function(el) {
 return el > 3 
}));


function showFormattedDate(date) {
	let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return `Date: ${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}
console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));


function canConvertToDate(str) {
	return !isNaN(Date.parse(str)); 
}
console.log(canConvertToDate('2016-13-18T00:00:00')); 
console.log(canConvertToDate('2016-03-18T00:00:00')); 


function daysBetween(date1, date2) {
	let days, miliseconds;
	const fromMilisecondsToDays = 86400000;
	date1 = date1.getTime()
	date2 = date2.getTime()
	if (date1 > date2) {
		miliseconds = date1 - date2;
	} else {
		miliseconds = date2 - date1;
	}
	days = Math.round(miliseconds/fromMilisecondsToDays);
	return days;
}
console.log(daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00')));

function getAmountOfAdultPeople(data) {
	let currentDate = new Date();
	const daysInYear = 365;
	const intercalaryYear = 366;
	let adult = 18;
	let ages = [];
	for (let i=0; i<data.length; i++) {
		let days = daysBetween(currentDate, new Date(data[i][' birthday ']));
		let age = 0;
		let birthdayYear = new Date(data[i][' birthday ']).getFullYear();
		for (birthdayYear; birthdayYear<=currentDate.getFullYear() && days-daysInYear>0; birthdayYear++) {
			if (birthdayYear%100!==0 && (birthdayYear%400===0 || birthdayYear%4===0)) {
				days -= intercalaryYear;
			} else {
				days -= daysInYear;
			}
			age++;
		}
		ages.push(age);
	}
	let adultPeople = filterArray(ages, function(el) {
		return el>adult;
	});
	return adultPeople.length;
}

let data = [
  {
    '_id': '5b5e3168c6bf40f2c1235cd6',
    'index': 0,
    ' birthday ': '2016-03-18T00:00:00',
    'eyeColor': 'green',
    'name': 'Stein',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e3168e328c0d72e4f27d8',
    'index': 1,
    ' birthday ': '1991-02-11T00:00:00',
    'eyeColor': 'blue',
    'name': 'Cortez',
    'favoriteFruit': 'strawberry'
  },
  {
    '_id': '5b5e3168cc79132b631c666a',
    'index': 2,
    ' birthday ': '1984-04-17T00:00:00',
    'eyeColor': 'blue',
    'name': 'Suzette',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e31682093adcc6cd0dde5',
    'index': 3,
    ' birthday ': '1994-04-17T00:00:00',
    'eyeColor': 'green',
    'name': 'George',
    'favoriteFruit': 'banana'
  }
];
console.log(getAmountOfAdultPeople(data));


function keys(obj) {
	let rezult = [];
	for (let item in obj) {
		if ({}.hasOwnProperty.call(obj, item)) {
			rezult.push(item);
		}
	}
	return rezult;
}
console.log(keys({keyOne: 1, keyTwo: 2, keyThree: 3}));


function values(obj) {
	let rezult = [];
	for (let item in obj) {
		if ({}.hasOwnProperty.call(obj, item)) {
			rezult.push(obj[item]);
		}
	}
	return rezult;
}
console.log(values({keyOne: 1, keyTwo: 2, keyThree: 3}));

