//Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event Listeners
loadEventListeners();

//Function for loading event listeners
function loadEventListeners() {
  //Dom load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter task event
  filter.addEventListener('keyup', filterTasks);
}

// GET TASKS FROM LOCAL STORAGE
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create a li element
    const li = document.createElement('li');
    //Add a class to li
    li.className = 'collection-item';
    //Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    // Add class name to link
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);

    //Append the list item(li) to the un-ordered list(ul)
    taskList.appendChild(li);
  });
}

//ADD TASKS FUNCTION

function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add a task');
  } else {
    // Create a li element
    const li = document.createElement('li');
    //Add a class to li
    li.className = 'collection-item';
    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    // Add class name to link
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);

    //Append the list item(li) to the un-ordered list(ul)
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input field
    taskInput.value = '';

    e.preventDefault();
  }
}

// STORE TASK IN LOCAL STORAGE FUNCTION
function storeTaskInLocalStorage(task) {
  //check local storage
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//REMOVE TASK FUNCTION
function removeTask(e) {
  //checks if class of delete item is a class of the link. If it is then we target the parent of the a tag which is the li and delete the Li element.
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// REMOVE TASKS FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
  //check local storage
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //loop through local storage
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR TASKS FUNCTION
function clearTasks() {
  // two ways to clear tasks list
  // taskList.innerHTML = ''; first way***

  //faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear task from local storage
  clearTaskFromLocalStorage();
}

//CLEAR LOCAL STORAGE FROM CLEAR TASK BUTTON FUNCTION
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// FILTER TASKS FUNCTION
function filterTasks(e) {
  const text = e.target.value.toLowerCase(); //giving us what is typed in.
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
