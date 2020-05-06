const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}
const tasks = [];

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function createTodo() {
	let html = ''; 
	tasks.forEach(function(task, index) {
		const taskCapitalized = task.task.charAt(0).toUpperCase() + task.task.slice(1); 
		html += `<li > <span> ${taskCapitalized}</span><input type= "checkbox" name="cb[]" onchange="toggleCheckboxes(this, ${index})" ${task.isChecked ? 'checked' : null}/><button class="removeTodo" onclick="removeTodo(${index})">Delete Task</button></li>`;
	})
	list.innerHTML = html;
}

function newTodo() {
	// 1. Get content from the input field
	const task = document.getElementById('todoName');	
	if (task.value.trim() !== '') {
		tasks.push({
		task: task.value,
		isChecked: false,
		});
		 //2.  Clear text in input field
		task.value = '';
		// 3. Update and unchecked coutners
		itemCountSpan.innerHTML = tasks.length;
		uncheckedCountSpan.innerHTML = getUncheckedTasksCount(tasks);	
		// 3. create the todo	
		createTodo();
	} else {
		task.value = '';
	}	
}

function removeTodo(index) {
	tasks.splice(index, 1);
	createTodo();
	itemCountSpan.innerHTML = tasks.length;
	uncheckedCountSpan.innerHTML = getUncheckedTasksCount(tasks);
}
function toggleCheckboxes(checkbox, index) {
	const spanText = checkbox.parentElement.firstChild.nextElementSibling;
	if (checkbox.checked) {
		tasks[index].isChecked = true;
		spanText.style['text-decoration-line'] = 'line-through';
	} else {
		tasks[index].isChecked = false;
		spanText.style['text-decoration-line'] = 'none';
	}
	uncheckedCountSpan.innerHTML = getUncheckedTasksCount(tasks);
}

function getUncheckedTasksCount(tasks) {
	return tasks.filter((task) => {
		return !task.isChecked ;
	}).length;
}


