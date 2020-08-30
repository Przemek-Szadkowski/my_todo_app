const classNames = {
    TASK_DIV: 'task',
    TASK_CHECKBOX: 'check',
    DELETE_BUTTON: 'delete'
}

const mainButton = document.querySelector('.mainButton');
const mainInput = document.querySelector('.enterTask');
const tasksArea = document.querySelector('.tasks');
const tasksCounter = document.querySelector('.howmany');

let counter = 0;
let isDoubled = false;

const taskArr = [];

const tasksToMap = JSON.parse(localStorage.getItem('tasks'));
console.log(!!tasksToMap);

//działania przy wczytaniu strony START
    
    if(!!tasksToMap) {
        for(let i=0; i < tasksToMap.length; i++) {
            if(tasksToMap[i].isChecked === false) {
                counter++;
            }
            taskArr.push(tasksToMap[i]);
        }
    }
        
    const paragraphCounter = document.createElement('p');
    paragraphCounter.textContent = `${counter} ${counter === 1 ? 'task' : 'tasks'} to do!`;
    tasksCounter.appendChild(paragraphCounter);

    if(!!tasksToMap) {
    const tasksHtml = tasksToMap.map( task => 
    `<div class="${classNames.TASK_DIV}"><input type="checkbox" ${task.isChecked ? "checked" : ""} class="${classNames.TASK_CHECKBOX}"><p>${task.taskText}</p><button class="${classNames.DELETE_BUTTON}">Delete</button></div>`
    ).join('');
    tasksArea.innerHTML = tasksHtml;
    addEventListener();
    }

//działania przy wczytaniu strony KONIEC


// główna funkcja dodająca zadanie START

function newTodoSecond() {
    isDoubled = false;
    const task = mainInput.value;
    if(!task) {
        alert("Enter your task!");
    } else {
        for(let i=0; i < taskArr.length; i++) {
            if(taskArr[i].taskText === task) {
                alert("This task has already exist!");
                isDoubled = true;
                mainInput.value = '';
            }
        };
        if(!isDoubled) { // sprawdzenie czy zadanie się nie powtarza
            counter++;
        let taskObj = {
            taskText: task,
            isChecked: false
        }
        taskArr.push(taskObj);
        saveToStorage(taskArr);
        loadFromStorage();
        mainInput.value = '';
        addEventListener();
        }
        
    }
    updateParagraphCounter();
}

// główna funkcja dodająca zadanie KONIEC

// pozostałe funkcje START

function updateParagraphCounter() {
    tasksCounter.textContent = '';
        paragraphCounter.textContent = `${counter} ${counter === 1 ? 'task' : 'tasks'} to do!`;
        tasksCounter.appendChild(paragraphCounter);
}

function addEventListener() {
    const inputCheck = [...document.querySelectorAll('input[type="checkbox"')];
    inputCheck.forEach( input => (
        input.addEventListener('change', checkInput)
    ))
    const deleteButtons = [...document.querySelectorAll('.delete')];
    deleteButtons.forEach( button => (
    button.addEventListener('click', deleteTask)
 ))
}

function checkInput() {
    if(this.checked === true) {
        counter--;
        updateParagraphCounter();

        const textTask = this.nextSibling.textContent;
        for(let i=0; i < taskArr.length; i++) {
            if(taskArr[i].taskText === textTask) {
                taskArr[i].isChecked = true;
            }
        }
        saveToStorage(taskArr);

    } else {
        counter++;
        updateParagraphCounter();
        const textTask = this.nextSibling.textContent;
        for(let i=0; i < taskArr.length; i++) {
            if(taskArr[i].taskText === textTask) {
                taskArr[i].isChecked = false;
            }
        }
        saveToStorage(taskArr);
    }
}

function deleteTask() {
    if(this.parentElement.firstChild.checked === false) {
        counter--;
        updateParagraphCounter();
    }
    const textTask = this.previousSibling.textContent;
    for(let i=0; i < taskArr.length; i++) {
        if(taskArr[i].taskText === textTask) {
           taskArr.splice(i, 1);
        }
    }
    saveToStorage(taskArr);
    this.parentElement.remove();
}

function saveToStorage(arr) {
    localStorage.setItem('tasks', JSON.stringify(arr));
}

function loadFromStorage() {
        const tasksToMap = JSON.parse(localStorage.getItem('tasks'));
        const tasksHtml = tasksToMap.map( task => 
            `<div class="${classNames.TASK_DIV}"><input type="checkbox" ${task.isChecked ? "checked" : ""} class="${classNames.TASK_CHECKBOX}"><p>${task.taskText}</p><button class="${classNames.DELETE_BUTTON}">Delete</button></div>`
            ).join('');
       tasksArea.innerHTML = tasksHtml;
}

function keyHandle(e) {
    if(e.keyCode === 13) {
        newTodoSecond();
    }
}

// pozostałe funkcje KONIEC

mainButton.addEventListener('click', newTodoSecond);
document.addEventListener('keyup', keyHandle);