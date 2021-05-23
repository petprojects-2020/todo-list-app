const input = document.getElementById('task__title');
const form = document.getElementById('task__form');
const tasksList = document.getElementById('tasks__list');
const deleteCompleted = document.getElementById('delete__completed');
const btnHolder = document.getElementById('button__holder');
let counter = document.getElementById('counter');
let counterText = document.getElementById('counter__text');
counter.innerHTML = 0;

const tasksArray = [];

class Task {
  id = Math.floor(Math.random() * 10000);
  isCompleted = false;
  constructor(title){
    this.title = title;
  }
}
// <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
// Create task

form.onsubmit = (event) => {
  event.preventDefault();
  const taskTitle = input.value;
  const addedTask = new Task(taskTitle);
  tasksArray.push(addedTask);
  input.value = null;
  console.log(tasksArray);
  displayTasks();
}

// Display task

const displayTasks = () => {
  counter.innerHTML = tasksArray.length;
  if(tasksArray.length === 1) {
    counterText.innerHTML = 'item left';
  } else {
    counterText.innerHTML = 'items left';
  }
  counter.innerHTML = tasksArray.length;
  tasksList.innerHTML = null;
  if(tasksArray.length > 0) {
    btnHolder.classList.remove('d-none');
    btnHolder.classList.add('d-block', 'col-7');
  } else {
    btnHolder.classList.add('d-none');
  }
  tasksArray.forEach(task => {
    if(task.isCompleted === true) {
      const div = document.createElement('div');
      const input = document.createElement('input')
      const span = document.createElement('span');
      const btnDelete = document.createElement('button');
      const btnComplete = document.createElement('button');
      btnDelete.appendChild(document.createTextNode('delete'));
      btnComplete.appendChild(document.createTextNode('complete'));
      input.type = 'checkbox';
      input.classList.add('form-check-input');
      input.checked = true;
      span.classList.add('task__title', 'inline-block', 'mx-3');
      span.classList.add('completed');
  
      div.classList.add('border', 'rounded', 'd-flex', 'justify-content-start', 'p-2');
      btnComplete.classList.add('btn', 'btn-sm', 'btn-success');
      btnDelete.classList.add('btn', 'btn-sm', 'btn-danger');
      span.appendChild(document.createTextNode(task.title))
      div.appendChild(input);
      div.classList.add('task__container')
      div.appendChild(span);
      div.appendChild(btnComplete);
      div.appendChild(btnDelete);
      div.id = task.id;


      tasksList.appendChild(div);
    } else {
      const div = document.createElement('div');
      const input = document.createElement('input')
      const span = document.createElement('span');
      const btnDelete = document.createElement('button');
      const btnComplete = document.createElement('button');
      btnDelete.appendChild(document.createTextNode('delete'));
      btnComplete.appendChild(document.createTextNode('complete'));
      input.type = 'checkbox';
      input.classList.add('form-check-input', 'pr-4');
      span.classList.add('task__title', 'inline-block', 'mx-3');
  
      div.classList.add('border', 'rounded', 'd-flex', 'justify-content-start', 'p-2');
      btnComplete.classList.add('btn', 'btn-sm', 'btn-success');
      btnDelete.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-auto');
      span.appendChild(document.createTextNode(task.title))
      div.appendChild(input);
      div.classList.add('task__container')
      div.appendChild(span);
      div.appendChild(btnComplete);
      div.appendChild(btnDelete);
      div.id = task.id;
      tasksList.appendChild(div);
    }
  });
}

// Delete and Complete task

const deleteTask = (event) => {
  if(event.target.innerHTML==="delete") {
    const index = tasksArray.findIndex(el => +event.target.parentNode.id === el.id);
    tasksArray.splice(index, 1);
    tasksList.removeChild(event.target.parentNode);
    counter.innerHTML = tasksArray.length;
    displayTasks();
  } else if(event.target.innerHTML==="complete") {
    const index = tasksArray.findIndex(el => +event.target.parentNode.id === el.id);
    tasksArray[index].isCompleted = true;
    deleteCompleted.classList.remove('d-none');
    deleteCompleted.classList.add('d-block','btn','btn-outline-secondary','btn-sm');
    displayTasks();
  } else if(event.target.type === 'checkbox') {
    if(event.target.checked) {
      const index = tasksArray.findIndex(el => +event.target.parentNode.id === el.id);
      tasksArray[index].isCompleted = true;
      deleteCompleted.classList.remove('d-none');
      deleteCompleted.classList.add('d-block','btn','btn-outline-secondary','btn-sm');
      displayTasks();
    } else {
      const index = tasksArray.findIndex(el => +event.target.parentNode.id === el.id);
      tasksArray[index].isCompleted = false;
      displayTasks();
    }
  }
}

tasksList.onclick = deleteTask;


// Filtering tasks

const completedTasks = document.getElementById('filter__completed');

completedTasks.onclick = () => {
  const filteredArray = tasksArray.filter(task => task.isCompleted === true);
  tasksList.innerHTML = null;
  filteredArray.forEach(task => {
    const div = document.createElement('div');
    const btnDelete = document.createElement('button');
    const btnComplete = document.createElement('button');
    btnDelete.appendChild(document.createTextNode('delete'));
    btnComplete.appendChild(document.createTextNode('complete'));

    div.classList.add('border', 'rounded', 'd-flex', 'justify-content-between', 'p-2', 'mt-2');
    btnComplete.classList.add('btn', 'btn-sm', 'btn-success');
    btnDelete.classList.add('btn', 'btn-sm', 'btn-danger');
    div.appendChild(document.createTextNode(task.title));
    div.appendChild(btnComplete);
    div.appendChild(btnDelete);
    div.id = task.id;

    tasksList.appendChild(div);
  })
}

const activeTasks = document.getElementById('filter__active');

activeTasks.onclick = () => {
  const filteredArray = tasksArray.filter(task => task.isCompleted === false);
  tasksList.innerHTML = null;
  filteredArray.forEach(task => {
    const div = document.createElement('div');
    const btnDelete = document.createElement('button');
    const btnComplete = document.createElement('button');
    btnDelete.appendChild(document.createTextNode('delete'));
    btnComplete.appendChild(document.createTextNode('complete'));

    div.classList.add('border', 'rounded', 'd-flex', 'justify-content-between', 'p-2', 'mt-2');
    btnComplete.classList.add('btn', 'btn-sm', 'btn-success');
    btnDelete.classList.add('btn', 'btn-sm', 'btn-danger');
    div.appendChild(document.createTextNode(task.title));
    div.appendChild(btnComplete);
    div.appendChild(btnDelete);
    div.id = task.id;

    tasksList.appendChild(div);
  })

}

const allTasks = document.getElementById('filter__all');

allTasks.onclick = () => {
  tasksList.innerHTML = null;
  tasksArray.forEach(task => {
    const div = document.createElement('div');
    const btnDelete = document.createElement('button');
    const btnComplete = document.createElement('button');
    btnDelete.appendChild(document.createTextNode('delete'));
    btnComplete.appendChild(document.createTextNode('complete'));

    div.classList.add('border', 'rounded', 'd-flex', 'justify-content-between', 'p-2', 'mt-2');
    btnComplete.classList.add('btn', 'btn-sm', 'btn-success');
    btnDelete.classList.add('btn', 'btn-sm', 'btn-danger');
    div.appendChild(document.createTextNode(task.title));
    div.appendChild(btnComplete);
    div.appendChild(btnDelete);
    div.id = task.id;

    tasksList.appendChild(div);
  })

}

deleteCompleted.onclick = () => {
  const filteredArray = tasksArray.filter(task => task.isCompleted === true);
  filteredArray.forEach(task => {
    const taskToDelete = document.getElementById(task.id);
    tasksList.removeChild(taskToDelete);
  })
}