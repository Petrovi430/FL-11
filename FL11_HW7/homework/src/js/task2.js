let max = 8, startMax = 8;
let rand;
let userNumber;
let attempt = 3;
let half = -0.5, two = 2, tree = 3, four = 4;
let firstPrize = 25, secondPrize = 50, thirdPrize = 100;
let prize = [firstPrize, secondPrize, thirdPrize];
let userPrize = 0;
let messageForUser;

let startGame = confirm('Do you want to play a game?');
while (startGame) {
	rand = half + Math.random()*(max + 1);
	rand = Math.round(rand);
	do {
		messageForUser = `
		Choose a roulette pocket number from 0 to ${max}
		Attempts left: ${attempt}
		Total prize: ${userPrize}$
		Possible prize on current attempt: ${prize[attempt-1]}$
		`;
		userNumber = +prompt(messageForUser, '');
		attempt--;
		if (rand===userNumber) {
			userPrize += prize[attempt];
			startGame = confirm(`Congratulation, you won! Your prize is: ${userPrize} $. Do you want to continue?`)
			if (startGame) {
				attempt = tree;
				max += four;
				prize = prize.map((price) => { 
					return price*two;
				});
				rand = half + Math.random()*(max + 1);
				rand = Math.round(rand);
			} else {
				attempt = 0;
			}
		}
	} while (attempt>0);
	if (attempt===0) {
		alert(`Thank you for your participation. Your prize is: ${userPrize}$`);
		attempt = tree;
		prize = [firstPrize, secondPrize, thirdPrize];
		userPrize = 0;
		max = startMax;
	}
	startGame = confirm('Do you want to play a game again?');
}

if (!startGame) {
	alert('You did not become a billionaire, but can.');
}