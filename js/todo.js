const INPUT_INITIAL = '';
const INCORRECT_INDEX = -1;

const ERRORS = {
    ERROR_CHANGE_STATUS : "Error, there is no such task to change the status!",
    ERROR_ADD_TASK : "Error, incorrect input in add task!",
    ERROR_DELETE_TASK : "Error, not found task for delete!",
    ERROR_INPUT_TASK : "Error, you have not entered a task!",
    ERROR_PRIORITY_INPUT : "Error, not priority for task!"
};

const STATUS = {
    TO_DO : "To do",
    IN_PROGRESS : "In progress",
    DONE : "Done",
};
const PRIORITY = {
    HIGH : 'high',
    LOW : 'low',
    MEDIUM: 'medium'
};
let toDo = [ 
    {name: 'Создать задачу.', status: STATUS.TO_DO, priority : PRIORITY.HIGH}, 
    {name: 'Пойти домой.', status: STATUS.DONE, priority : PRIORITY.LOW},
    {name: 'Программировать каждый день.', status: STATUS.DONE, priority : PRIORITY.HIGH},
    {name: 'Зайти к другу.', status: STATUS.TO_DO, priority : PRIORITY.LOW},
    {name: 'Хлеб', status: STATUS.TO_DO, priority : PRIORITY.LOW}    
];

const TASK_FORMS = document.querySelectorAll('form');
const TASK_INPUT_HIGH = document.querySelector('#todo-high-input');
const TASK_INPUT_LOW = document.querySelector('#todo-low-input');
const TASK_CARD = document.querySelector(".todo__card");

const log = (value) => console.log(value);

log(toDo);

showTasks(PRIORITY.HIGH, 0);
showTasks(PRIORITY.LOW, 1);
TASK_CARD.addEventListener("click", removeElementTask);
TASK_CARD.addEventListener("click", changeElementStatus);

TASK_FORMS.forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formId = form.id;
        const taskInput = form['task'].value;

        if(formId === "form-high-task"){
            createTask(form, taskInput, STATUS.TO_DO);
            addTask(taskInput, PRIORITY.HIGH);
        }
        if(formId === "form-low-task"){
            createTask(form, taskInput, STATUS.TO_DO);
            addTask(taskInput, PRIORITY.LOW);
        }
        form['task'].value = INPUT_INITIAL;
    });
});

function showTasks(priority, formPriority){
    const priorityTask = toDo.filter(element => element.priority === priority);
    if(!priorityTask.length){
        log('Задач с высоким приоритетом нет!');
    }else{
        priorityTask.forEach(element => createTask(TASK_FORMS[formPriority], element.name,  element.status));
    }
} 

function addTask(task, taskPriority){
    if(!task){
        console.log(ERRORS.ERROR_INPUT_TASK);
    }else{
        const newTask = {name: task, status: STATUS.TO_DO, priority: taskPriority};
        toDo.push(newTask);
        log(toDo);
    }
}

function createTask(priorityForm, nameTask, status){
    const taskBlock = document.createElement('div');
    const taskCheckbox = document.createElement('input');
    const taskText = document.createElement('p');
    const taskDelete = document.createElement('button');
    taskBlock.className = 'todo__task';
    taskCheckbox.type = 'checkbox';
    if(status === STATUS.DONE){
        taskCheckbox.checked = true;
    }
    taskCheckbox.className = 'todo__status';
    taskText.className = "task__text";
    taskText.textContent = nameTask;
    taskDelete.className = 'btn btn__delete';
    taskBlock.appendChild(taskCheckbox);
    taskBlock.appendChild(taskText);
    taskBlock.appendChild(taskDelete);
    priorityForm.parentNode.insertBefore(taskBlock, priorityForm.nextSibling);
}

function deleteTask(task){
    if(!task){
        console.log(ERRORS.ERROR_INPUT_TASK);
    }else{
        const indexTask = toDo.findIndex(element => element.name === task);
        if(indexTask != INCORRECT_INDEX){
            toDo.splice(indexTask, 1);
            log(toDo);
        }else{
            console.log(ERRORS.ERROR_DELETE_TASK);
        }
    }
}

function removeElementTask(event){
    const clickedResult = event.target;
    log(clickedResult);
    if(clickedResult.classList.contains('btn__delete')){
        const task = event.target.parentElement.querySelector('.task__text').innerText;
        deleteTask(task);
        TASK_CARD.removeChild(event.target.parentElement)
    }
}

function chanegeStatus(task){
    if(!task){
        console.log(ERRORS.ERROR_INPUT_TASK);
    }else{
        const foundTask = toDo.find(element => element.name === task);
        if(!foundTask){
            console.log(ERRORS.ERROR_CHANGE_STATUS);
        }else{
            log(foundTask.status);
            if(foundTask.status === STATUS.TO_DO){
                foundTask.status = STATUS.DONE;
            }else{
                foundTask.status = STATUS.TO_DO;
            }
            
            log(toDo);
        }
    }
}

function changeElementStatus(event){
    const clickedResult = event.target;
    log(clickedResult);
    if(clickedResult.classList.contains('todo__status')){
        const task = event.target.parentElement.querySelector('.task__text').innerText;
        log(task);
        chanegeStatus(task);
    }
}
