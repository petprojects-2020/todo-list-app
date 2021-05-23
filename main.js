const input = document.getElementById('task__title');
const form = document.getElementById('task__form');
const tasksList = document.getElementById('tasks__list');
const btnHolder = document.getElementById('button__holder');
const counter = document.getElementById('counter');
const counterText = document.getElementById('counter__text');
const completedTasks = document.getElementById('filter__completed');
const activeTasks = document.getElementById('filter__active');
const allTasks = document.getElementById('filter__all');
const deleteCompleted = document.getElementById('delete__completed');

counter.innerHTML = 0;
const tasksArray = [];
class Task {
  id = Math.floor(Math.random() * 10000);
  isCompleted = false;
  constructor(title){
    this.title = title;
  }
}

const displayButtons = () => {
  if(tasksArray.length > 0) {
    btnHolder.classList.remove('d-none');
    btnHolder.classList.add('d-block', 'col-7');
  } else {
    btnHolder.classList.add('d-none');
  }
}

const deleteCompletedBtn = () => {
  const filteredArray = tasksArray.filter(task => task.isCompleted === true);
  if(filteredArray.length === 0) {
    deleteCompleted.classList.add('d-none');
  } else {
    deleteCompleted.classList.remove('d-none');
    deleteCompleted.classList.add('d-block','btn','btn-outline-secondary','btn-sm');
  }
}

const displayTasks = (array) => {
  const filteredArray = tasksArray.filter(task => task.isCompleted === false);
  counter.innerHTML = filteredArray.length;
  filteredArray.length === 1 ? counterText.innerHTML = 'item left' : counterText.innerHTML = 'items left';
  tasksList.innerHTML = null;
  array.forEach(task => {
    if(task.isCompleted === true) {
      const div = document.createElement('div');
      const input = document.createElement('input');
      const span = document.createElement('span');
      const btnDelete = document.createElement('button');
      btnDelete.appendChild(document.createTextNode('delete'));
      input.type = 'checkbox';
      input.checked = true; 

      input.classList.add('form-check-input');
      span.classList.add('task__title', 'inline-block', 'mx-3', 'completed');
      div.classList.add('border', 'rounded', 'd-flex', 'justify-content-start', 'p-2', 'task__container');
      btnDelete.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-auto');
    
      span.appendChild(document.createTextNode(task.title))
      div.appendChild(input);
      div.appendChild(span);
      div.appendChild(btnDelete);
      div.id = task.id;
      tasksList.appendChild(div);
      
    } else {
      const div = document.createElement('div');
      const input = document.createElement('input');
      const span = document.createElement('span');
      const btnDelete = document.createElement('button');
      btnDelete.appendChild(document.createTextNode('delete'));
      input.type = 'checkbox';

      input.classList.add('form-check-input');
      span.classList.add('task__title', 'inline-block', 'mx-3');
      div.classList.add('border', 'rounded', 'd-flex', 'justify-content-start', 'p-2', 'task__container');
      btnDelete.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-auto');

      span.appendChild(document.createTextNode(task.title))
      div.appendChild(input);
      div.appendChild(span);
      div.appendChild(btnDelete);
      div.id = task.id;
      tasksList.appendChild(div);
    }
  });
}

// Create task

form.onsubmit = (event) => {
  event.preventDefault();
  const taskTitle = input.value;
  const addedTask = new Task(taskTitle);
  tasksArray.push(addedTask);
  input.value = null;
  displayTasks(tasksArray);
  displayButtons();
}

// Delete and Complete task

const deleteTask = (event) => {
  if(event.target.innerHTML==="delete") {
    const index = tasksArray.findIndex(el => +event.target.parentNode.id === el.id);
    tasksArray.splice(index, 1);
    tasksList.removeChild(event.target.parentNode);
    counter.innerHTML = tasksArray.length;
    displayTasks(tasksArray);
  } else if(event.target.type === 'checkbox') {
    if(event.target.checked) {
      const index = tasksArray.findIndex(el => +event.target.parentNode.id === el.id);
      tasksArray[index].isCompleted = true;
      deleteCompletedBtn();
      displayTasks(tasksArray);
      displayButtons();
    } else {
      const index = tasksArray.findIndex(el => +event.target.parentNode.id === el.id);
      tasksArray[index].isCompleted = false;
      displayTasks(tasksArray);
      displayButtons();
    }
  }
}

tasksList.onclick = deleteTask;


// Filtering tasks

completedTasks.onclick = () => {
  const filteredArray = tasksArray.filter(task => task.isCompleted === true);
  tasksList.innerHTML = null;
  displayTasks(filteredArray);
  displayButtons();
}

activeTasks.onclick = () => {
  const filteredArray = tasksArray.filter(task => task.isCompleted === false);
  tasksList.innerHTML = null;
  displayTasks(filteredArray);
  displayButtons();
}

allTasks.onclick = () => {
  tasksList.innerHTML = null;
  displayTasks(tasksArray);
  displayButtons();
}

deleteCompleted.onclick = () => {
  const filteredArray = tasksArray.filter(task => task.isCompleted === true);
  filteredArray.forEach(task => {
    const index = tasksArray.findIndex(el => el.id === task.id);
    tasksArray.splice(index, 1);
    const taskToDelete = document.getElementById(task.id);
    tasksList.removeChild(taskToDelete);
  })
  displayButtons();
  deleteCompletedBtn();
}