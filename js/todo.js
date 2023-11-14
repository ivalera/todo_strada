const INPUT_ERROR = 'Введите текст!';

const TASK_FORM_HIGH = document.querySelector('#form-high-task');
const TASK_FORM_LOW = document.querySelector('#form-low-task');
const TASK_INPUT_HIGH = document.querySelector('#todo-high-input');
const TASK_INPUT_LOW = document.querySelector('#todo-low-input');

const log = (value) => console.log(value);

TASK_FORM_HIGH.addEventListener('submit', addDataTaskHigh);
TASK_FORM_LOW.addEventListener('submit', addDataTaskLow);

function createTask(name, parentElement){
    const taskBlock = document.createElement('div');
    taskBlock.className = 'todo__task';
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.className = 'todo__status';
    const taskText = document.createElement('p');
    taskText.textContent = name;
    var btnTask = document.createElement('button');
    btnTask.id = 'btn-close';
    btnTask.className = 'btn btn__add';
    taskBlock.appendChild(taskCheckbox);
    taskBlock.appendChild(taskText);
    taskBlock.appendChild(btnTask);
    parentElement.parentNode.insertBefore(taskBlock, parentElement.nextSibling);
}

function addDataTaskHigh(event){
    event.preventDefault();
    const data = new FormData(event.target);
  console.log([...data.entries()]);
    log(TASK_FORM_HIGH);
    log(event);
    if(!TASK_INPUT_HIGH.value){
        TASK_INPUT_HIGH.placeholder = INPUT_ERROR;
        return;
    }
    createTask(TASK_INPUT_HIGH.value, TASK_FORM_HIGH);
    TASK_INPUT_HIGH.value = "";
}

function addDataTaskLow(event){
    event.preventDefault();
    log(event);
    if(!TASK_INPUT_LOW.value){
        TASK_INPUT_LOW.placeholder = INPUT_ERROR;
        return;
    }
    createTask(TASK_INPUT_LOW.value, TASK_FORM_LOW);
    TASK_INPUT_LOW.value = "";
}
