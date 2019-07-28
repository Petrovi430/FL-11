const rootNode = document.getElementById('root');

let todoItems = [];

if (localStorage.getItem('todoItems') === null) {
	localStorage.setItem('todoItems', JSON.stringify(todoItems));
} else {
	todoItems = JSON.parse(localStorage.getItem('todoItems'));
}

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
		todoItems.forEach(function(item) {
			let li = document.createElement('li');
			li.setAttribute('id', item.id);
			let checkTask = document.createElement('span');
			if (item.isDone) {
				checkTask.setAttribute('class', 'checkTrue');
			} else {
				checkTask.setAttribute('class', 'checkFalse');
			}
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
	if (flag) {
		h1.textContent = 'Add task';
	} else {
		h1.textContent = 'Modify item';
	}
	fragment.appendChild(h1);
	let form = document.createElement('form');
	let input = document.createElement('input');
	if(!flag) {
		let position = location.hash.indexOf('item_id')+7;
		let id = location.hash.substr(position)
		input.setAttribute('id', id);
		todoItems.forEach(function(item) {
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
	if (flag) {
		saveModify.setAttribute('id', 'save');
	} else {
		saveModify.setAttribute('id', 'modify');
	}
	saveModify.textContent = 'Save changes';
	fragment.appendChild(saveModify);
	rootNode.appendChild(fragment);
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
	setTimeout(function(hideMessage) {
		hideMessage.remove();
	}, 2000, hideMessage);
}

let routes = {
	'/': mainPage,
	'#/add-task': addModifyPage,
	'#/modify': addModifyPage
}

window.location.hash = '';
routes[window.location.pathname]();

window.addEventListener('click', function(e) { 
	let target = e.target;
	if (target.getAttribute('id') === 'newTask') {
		window.location.hash = '#/add-task';
	}
	if (target.getAttribute('id') === 'cancel') {
		window.location.hash = '';
	}
	if (target.getAttribute('id') === 'save') {
		let flag = true;
		let newTask = document.getElementsByTagName('input')[0];
		todoItems.forEach(function(item) {
			if (item.description === newTask.value.trim()) {
				flag = false;
			}
		});
		if (flag) {
			if (newTask.value.trim().length !== 0) {
				todoItems.push({isDone: false, id: Date.now(), description: newTask.value});
				localStorage.setItem('todoItems', JSON.stringify(todoItems));
				window.location.hash = '';
			} else {
				alert('You can\'t save empty task!');
			}
		} else {
			errorMessage('Error! You can\'t add already exist item');
		}
	}
	if (target.getAttribute('id') === 'modify') {
		let flag = true;
		let changeTask = document.getElementsByTagName('input')[0];
		todoItems.forEach(function(item) {
			if (item.description === changeTask.value.trim()) {
				flag = false;
			}
		});
		if (flag) {
			if (changeTask.value.trim().length !== 0) {
				todoItems = todoItems.map(function(item) {
					if(item.id === +changeTask.id && item.description !== changeTask.value.trim()) {
						item.description = changeTask.value.trim();
					}
					return item;
				});
				localStorage.setItem('todoItems', JSON.stringify(todoItems));
				window.location.hash = '';
			} else {
				alert('You can\'t save empty task!');
			}
		} else {
			errorMessage('Error! You can\'t add already exist item');
		}
	}
	if (target.getAttribute('class') === 'checkTrue') {
		let idTask = +target.parentNode.id;
		todoItems.map(function(item) {
			if (item.id === idTask) {
				item.isDone = false;
			}
			return item;
		});
		let unchecked = [];
        let checked = [];
        todoItems.forEach(function(item) {
            if (item.isDone) {
                checked.push(item);
            } else {
                unchecked.push(item);
            }
        });
        todoItems = unchecked.concat(checked);
		localStorage.setItem('todoItems', JSON.stringify(todoItems));
		todoItems = JSON.parse(localStorage.getItem('todoItems'));
		mainPage();
	}
	if (target.getAttribute('class') === 'checkFalse') {
		let idTask = +target.parentNode.id;
		todoItems.map(function(item) {
			if (item.id === idTask) {
				item.isDone = true;
			}
			return item;
		});
		let unchecked = [];
        let checked = [];
        todoItems.forEach(function(item) {
            if (item.isDone) {
                checked.push(item);
            } else {
                unchecked.push(item);
            }
        });
        todoItems = unchecked.concat(checked);
		localStorage.setItem('todoItems', JSON.stringify(todoItems));
		todoItems = JSON.parse(localStorage.getItem('todoItems'));
		mainPage();
	}
	if (target.getAttribute('class') === 'descriptionTask') {
		let canModify = target.parentNode.querySelector('.checkFalse');
		if (canModify){
			let taskId = target.parentNode.id;
			window.location.hash = `#/modify/:item_id${taskId}`;
		} else {
			errorMessage('Error! You can\'t edit already done item');
		}
	}
	if (target.getAttribute('class') === 'deleteTask') {
		let idTask = +target.parentNode.id;
		todoItems = todoItems.filter(function(item) {
			return item.id !== idTask;
		});
		localStorage.setItem('todoItems', JSON.stringify(todoItems));
		todoItems = JSON.parse(localStorage.getItem('todoItems'));
		mainPage();
	}
});

window.addEventListener('hashchange', function(e) {
	if (e.newURL.indexOf('#/add-task') !== -1) {
		routes['#/add-task'](true);
	}
	if (e.newURL.indexOf('#/modify') !== -1) {
		routes['#/modify'](false);
	}
});

window.onpopstate = function(event) {
	if (event.state === null) {
		routes['/']();
	}
};