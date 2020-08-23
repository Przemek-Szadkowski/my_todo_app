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

const taskArr = [];

function newTodo() {
    const task = mainInput.value;
    if(!task) {
        alert("Enter your task!");
    } else {
        counter++;
    
        // if(taskArr.length === 0) {
        const paragraphCounter = document.createElement('p');
        updateParagraphCounter();

        const newDiv = document.createElement('div');
        newDiv.classList.add(`${classNames.TASK_DIV}`);
        newDiv.textContent = task;

        const inputCheck = document.createElement('input');
        inputCheck.setAttribute("type", "checkbox");
        inputCheck.classList.add(`${classNames.TASK_CHECKBOX}`);
        inputCheck.addEventListener('change', checkInput);
        newDiv.insertAdjacentElement("afterbegin", inputCheck);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add(`${classNames.DELETE_BUTTON}`);
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', deleteTask);
        newDiv.appendChild(deleteButton);

        tasksArea.insertAdjacentElement("beforeend", newDiv);

        // zapis START

        let taskObj = {
            taskText: task,
            isChecked: inputCheck.checked
        }
        taskArr.push(taskObj);

        // zapis KONIEC

        mainInput.value = '';

        // saveToStorage(taskArr);
        // mapTasks();

        function updateParagraphCounter() {
            tasksCounter.textContent = '';
                paragraphCounter.textContent = `${counter} ${counter === 1 ? 'task' : 'tasks'} to do!`;
                tasksCounter.appendChild(paragraphCounter);
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

                // saveToStorage();

            } else {
                counter++;
                updateParagraphCounter();
                const textTask = this.nextSibling.textContent;
                for(let i=0; i < taskArr.length; i++) {
                    if(taskArr[i].taskText === textTask) {
                        taskArr[i].isChecked = false;
                    }
                }
                // saveToStorage();
            }
        }

        // zapisa obiektu do pamięci w funkcji saveToStorage
        // wczytanie z pamięći po włączeniu strony
 
        function deleteTask() {
            this.parentElement.remove();
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
            // saveToStorage();
        }
    }
}

// funkcje zapisu do pamięci i tworzenia zawartośći z pamięci POCZĄTEK

function saveToStorage(arr) {
    localStorage.setItem('tasks', JSON.stringify(arr));
}

// function mapTasks() {
//     const tasksToMap = JSON.parse(localStorage.getItem('tasks'));
//     tasksToMap.map( task => {
//         return `<input type="checkbox" checked="${task.isChecked}" class="${classNames.TASK_CHECKBOX}"><p>${task.taskText}</p><button class="${classNames.DELETE_BUTTON}">Delete</button>`
//     });
// }

// KONIEC

function keyHandle(e) {
    if(e.keyCode === 13) {
        newTodo();
    }
}

mainButton.addEventListener('click', newTodo);
document.addEventListener('keyup', keyHandle);