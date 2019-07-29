const rootNode = document.getElementById('root');
let todoItems = [];

let storage = {
	init: () => localStorage.getItem('todoItems') === null ? storage.set() : storage.get(),
	set: () => localStorage.setItem('todoItems', JSON.stringify(todoItems)),
	get: () => {
 todoItems = JSON.parse(localStorage.getItem('todoItems')) 
}
}
storage.init();

let routes = {
	'/': mainPage,
	'#/add-task': addModifyPage,
	'#/modify': addModifyPage
}

function startPage() {
	window.location.hash = '';
	routes[window.location.pathname]();
}
startPage();

function mainPage() {
	rootNode.innerHTML = '';
	let fragment = document.createDocumentFragment();
	let h1 = document.createElement('h1');
	h1.textContent = 'Simple TODO application';
	fragment.appendChild(h1);
	let button = document.createElement('button');
	button.setAttribute('id', 'newTask');
	button.textContent = 'Add new task';
	fragment.appendChild(button);
	let list = document.createElement('div');
	list.setAttribute('id', 'list');
	if (!todoItems.length) {
		list.textContent = 'TODO is empty';
	} else {
		let ul = document.createElement('ul');
		todoItems.forEach((item) => {
			let li = document.createElement('li');
			li.setAttribute('id', item.id);
			let checkTask = document.createElement('span');
			let checkValue;
			item.isDone ? checkValue = 'checkTrue' : checkValue = 'checkFalse';
			checkTask.setAttribute('class', checkValue);
			li.appendChild(checkTask);
			let descriptionTask = document.createElement('span');
			descriptionTask.setAttribute('class', 'descriptionTask');
			descriptionTask.textContent = item.description;
			if (item.isDone) {
descriptionTask.style.background = 'grey'; 
}
			li.appendChild(descriptionTask);
			let deleteTask = document.createElement('span');
			deleteTask.setAttribute('class', 'deleteTask');
			li.appendChild(deleteTask);
			ul.appendChild(li);
		});
		list.appendChild(ul);
	}
	fragment.appendChild(list);
	rootNode.appendChild(fragment);
}

function addModifyPage(flag) {
	rootNode.innerHTML = '';
	let fragment = document.createDocumentFragment();
	let h1 = document.createElement('h1');
	let text;
	flag ? text = 'Add task' : text = 'Modify item';
	h1.textContent = text;
	fragment.appendChild(h1);
	let form = document.createElement('form');
	let input = document.createElement('input');
	if(!flag) {
		let position = location.hash.indexOf('item_id')+7;
		let id = location.hash.substr(position)
		input.setAttribute('id', id);
		todoItems.forEach((item) => {
			if (item.id === +id) {
 input.value = item.description; 
}
		});
	}
	form.appendChild(input);
	fragment.appendChild(form);
	let cancel = document.createElement('button');
	cancel.setAttribute('id', 'cancel');
	cancel.textContent = 'Cancel';
	fragment.appendChild(cancel);
	let saveModify = document.createElement('button');
	let activity;
	flag ? activity = 'save' : activity = 'modify';
	saveModify.setAttribute('id', activity);
	saveModify.textContent = 'Save changes';
	fragment.appendChild(saveModify);
	rootNode.appendChild(fragment);
}

function transformData(target, flag) {
	let unchecked = [], checked = [];
	todoItems.map((item) => {
		if (item.id === +target.parentNode.id) {
 item.isDone = flag; 
}
		return item;
	});
    todoItems.forEach((item) => item.isDone ? checked.push(item) : unchecked.push(item));
    todoItems = unchecked.concat(checked);
}

function addModifyItem(target, str) {
	let flag = true;
	let task = document.getElementsByTagName('input')[0];
	todoItems.forEach((item) => {
		if (item.description === task.value.trim()) {
 flag = false; 
}
	});
	if (flag) {
		if (task.value.trim().length !== 0) {
			if (str === 'save') {
				todoItems.push({isDone: false, id: Date.now(), description: task.value});
				transformData(target, false);
			}
			if (str ==='modify') {
				todoItems = todoItems.map((item) => {
					if(item.id === +task.id && item.description !== task.value.trim()) {
 item.description = task.value.trim();
}
					return item;
				});
			}
			storage.set();
			window.location.hash = '';
		} else {
			alert('You can\'t save empty task!');
		}
	} else {
		errorMessage('Error! You can\'t add already exist item');
	}
}

function errorMessage(str) {
	let hideMessage = document.querySelector('.alert');
	if (hideMessage !== null) {
 hideMessage.remove(); 
}
	let div = document.createElement('div');
	if (navigator.userAgent.indexOf('Chrome') !== -1) {
		div.setAttribute('class', 'alert chrome');
	} else {
		div.setAttribute('class', 'alert other-browsers');
	}
	let h3 = document.createElement('h3');
	h3.textContent = 'Danger!';
	div.appendChild(h3);
	let p = document.createElement('p');
	p.textContent = str;
	div.appendChild(p);
	rootNode.appendChild(div);
	hideMessage = document.querySelector('.alert');
	setTimeout((hideMessage) => {
		hideMessage.remove();
	}, 2000, hideMessage);
}

function catchActivity(e) {
	let target = e.target;
	if (target.getAttribute('id') === 'newTask') {
 window.location.hash = '#/add-task'; 
}
	if (target.getAttribute('id') === 'cancel') {
 window.location.hash = '';
}
	if (target.getAttribute('id') === 'save') {
 addModifyItem(target, 'save'); 
}
	if (target.getAttribute('id') === 'modify') {
 addModifyItem(target, 'modify'); 
}
	if (target.getAttribute('class') !== null) {
		if (target.getAttribute('class') === 'checkTrue') {
transformData(target, false); 
}
		if (target.getAttribute('class') === 'checkFalse') {
transformData(target, true); 
}
		if (target.getAttribute('class') === 'deleteTask') {
 todoItems = todoItems.filter((item) => item.id !== +target.parentNode.id); 
}
		if (target.getAttribute('class') === 'descriptionTask') {
			let canModify = target.parentNode.querySelector('.checkFalse');
			if (canModify){
				window.location.hash = `#/modify/:item_id${target.parentNode.id}`;
			} else {
				errorMessage('Error! You can\'t edit already done item');
			}
		} else {
			storage.set();
			storage.get();
			mainPage();
		}
	}
}

function changeHash(e) {
	if (e.newURL.indexOf('#/add-task') !== -1) {
		routes['#/add-task'](true);
	} else if (e.newURL.indexOf('#/modify') !== -1) {
		routes['#/modify'](false);
	}else {
		routes['/']();
	}
}

window.addEventListener('click', (e) => catchActivity(e));
window.addEventListener('hashchange', (e) => changeHash(e));