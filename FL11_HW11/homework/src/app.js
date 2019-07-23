let tasks = ['Find the cat', 'Bath a cat', 'Prepare cat\'s carry'];
let newTask = '';

let input = document.getElementById('newTask');
let button = document.getElementsByTagName('button')[0];
let message = document.querySelector('.message');
let list = document.getElementById('list');
let ul = document.getElementsByTagName('ul')[0];
let fragment = document.createDocumentFragment();

function renderDOM() {
	ul.innerHTML = '';
	tasks.forEach(function(item, index) {
		let li = document.createElement('li');
		let task = document.createElement('div');
		task.setAttribute('class', 'task');
		task.setAttribute('data-item', index);
		let input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.setAttribute('id', `check${index + 1}`);
		input.setAttribute('name', `check${index + 1}`);
		task.appendChild(input);
		let label = document.createElement('label');
		label.setAttribute('for', `check${index + 1}`);
		label.appendChild(document.createTextNode(item));
		task.appendChild(label);
		let i = document.createElement('i');
		i.setAttribute('class', 'editTask material-icons');
		i.appendChild(document.createTextNode('edit'));
		task.appendChild(i);
		let iDelete = document.createElement('i');
		iDelete.setAttribute('class', 'delete material-icons');
		iDelete.appendChild(document.createTextNode('delete'));
		task.appendChild(iDelete);
		li.appendChild(task);
		let edit = document.createElement('div');
		edit.setAttribute('class', 'edit  hide');
		let inputEdit = document.createElement('input');
		inputEdit.setAttribute('type', 'text');
		inputEdit.setAttribute('value', item);
		edit.appendChild(inputEdit);
		let save = document.createElement('i');
		save.setAttribute('class', 'save material-icons');
		save.appendChild(document.createTextNode('save'));
		edit.appendChild(save);
		li.appendChild(edit);
		fragment.appendChild(li);
	});
	ul.appendChild(fragment);
}

checkLengthTask();
renderDOM();

list.addEventListener('click', function(e) {
	if (e.target.classList.contains('editTask')) {
 editTask(e); 
}
	if (e.target.classList.contains('delete')) {
		deleteTask(e);
		checkLengthTask();
		renderDOM();
	}
	if (e.target.classList.contains('save')) {
		changeTask(e);
		checkLengthTask();
		renderDOM();
	}
});

button.addEventListener('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	addTask(e);
	checkLengthTask();
	renderDOM();
});

input.addEventListener('change', function (e) {
	newTask = e.target.value;
})

function checkLengthTask() {
	if (tasks.length >= 10) {
		input.setAttribute('disabled', 'disabled');
		button.setAttribute('disabled', 'disabled');
		message.className = 'message show';
	} else {
		input.removeAttribute('disabled', 'disabled');
		button.removeAttribute('disabled', 'disabled');
		message.className = 'message hide';
	}
}

function addTask() {
	if (newTask !== '') {
		if(tasks.length < 10) {
			tasks.push(newTask);
		} 
	}
	input.value = '';
	newTask = '';

}

function editTask (e) {
	let showEdit = e.target.parentNode.parentNode.querySelector('.edit'); 
	if(showEdit.classList.contains('hide')) {
		showEdit.className = 'edit show';
	} else {
		showEdit.className = 'edit hide';
	}	
} 

function changeTask(e) {
	let element = e.target.parentNode;
	let newValue = element.querySelector('input').value;
	let index = +element.parentNode.querySelector('.task').dataset.item;
	tasks[index] = newValue;
}

function deleteTask (e) {
	let item = e.target.parentNode.dataset.item;
	tasks = tasks.filter(function(task, index) {
		return index !== +item;
	})
}