'use strict';

function Fighter(obj) {
	let {name, damage, hp, agility} = obj;
	let wins = 0, losses = 0, hpTotal = hp, maxPercent = 100;

	function rand( min, max ) {
		return Math.round( Math.random() * (max - min) + min );
	}

	this.getName = () => {
		return name;
	}
	this.getDamage = () => {
		return damage;
	}
	this.getAgility = () => {
		return agility;
	}
	this.getHealth = () => {
		return hp;
	}
	this.attack = (opponent) => {
		let randomPercent = rand(0, maxPercent);
		if (randomPercent > opponent.getAgility()) {
			opponent.dealDamage(damage);
			console.log(`${name} make ${damage} damage to ${opponent.getName()}`);
		} else {
			console.log(`${opponent.getName()} attack missed`);
		}
		
	}
	this.logCombatHistory = () => {
		console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
	}
	this.heal = (addHealth) => {
		hp += addHealth;
		if (hp > hpTotal) {
			hp = hpTotal;
		}
	}
	this.dealDamage = (opponentDamage) => {
		if (opponentDamage > hp) {
			hp = 0;
		} else {
			hp -= opponentDamage;
		}
	}
	this.addWin = () => {
		wins++;
	}
	this.addLoss = () => {
		losses++;
	}
}

function battle(opponent1, opponent2) {
	let flag = true;
	if (opponent1.getHealth() === 0) {
		console.log(opponent1.getName() + ' is dead and can\'t fight.');
		return;
	}
	if (opponent2.getHealth() === 0) {
		console.log(opponent2.getName() + ' is dead and can\'t fight.');
		return;
	}
	while (opponent1.getHealth() > 0 && opponent2.getHealth() > 0) {
		if (flag) {
			opponent1.attack(opponent2);
			flag = !flag;
		} else {
			opponent2.attack(opponent1);
			flag = !flag;
		}
	}
	if (opponent1.getHealth() === 0) {
		opponent1.addLoss();
		opponent2.addWin();
	}
	if (opponent2.getHealth() === 0) {
		opponent2.addLoss();
		opponent1.addWin();
	}
}

const myFighter = new Fighter({name: 'John', damage: 20, hp: 100, agility: 25});
const myFighter2 = new Fighter({name: 'Jim', damage: 10, hp: 120, agility: 40});

battle(myFighter, myFighter2);
battle(myFighter, myFighter2);