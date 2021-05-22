const input = document.getElementById('task__title');
const form = document.getElementById('task__form');
const tasksList = document.getElementById('tasks__list');
let counter = document.getElementById('counter');
counter.innerHTML = 0;

const tasksArray = [];

class Task {
  id = Math.floor(Math.random() * 10000);
  isCompleted = false;
  constructor(title){
    this.title = title;
  }
}

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
  });
}

// Delete task

const deleteTask = (event) => {
  if(event.target.innerHTML==="delete") {
    console.log(event.target.parentNode.id);
    const index = tasksArray.findIndex(el => event.target.parentNode.id === el.id);
    tasksArray.splice(index, 1);
    tasksList.removeChild(event.target.parentNode);
    counter.innerHTML = tasksArray.length;
    console.log(tasksArray);
  } else if(event.target.innerHTML==="complete") {
    console.log(event.target.parentNode.id);

    console.log(tasksArray);
  }
}

tasksList.onclick = deleteTask;