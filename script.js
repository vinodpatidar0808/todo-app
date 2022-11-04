const addTask = document.querySelector('#add-task')
const form = document.querySelector('#todo-form')
const todoContainer = document.querySelector('#todo-container');
const deleteAll = document.querySelector('#delete-all-btn')
const addBtn = document.querySelector('#add-btn');


let tasks = [];

const displayTaskOnPage = (task, addNew) => {
    const newTask = `<div class="todo">
                <input
                    class="todo-input"
                    type="text"
                    name="add-todo"
                    value="${task}"
                    disabled="true"
                >
                <button class="check-button">
                    <div
                        class="icon-wrapper check-icon-wrapper"
                        title="mark as done"
                    >
                        <svg
                            class="icon check-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                            />
                        </svg>
                    </div>
                </button>
                <button class="edit-button">
                    <div
                        class="icon-wrapper edit-icon-wrapper"
                        title="edit todo"
                    >
                        <svg
                            class="icon edit-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill="white"
                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
                            />
                        </svg>
                    </div>
                </button>
                <button class="delete-button">
                    <div
                        class="icon-wrapper delete-icon-wrapper"
                        title="delete this item"
                    >
                        <svg
                            class="icon delete-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                            />
                        </svg>
                    </div>
                </button>
            </div>`
    todoContainer.insertAdjacentHTML('afterbegin', newTask);
    if (addNew) {
        tasks.push(task);
        localStorage.setItem('todos', JSON.stringify(tasks));
    }
}

// get todos from local storage
const showTasksFromLocalStorage = () => {
    let localStorageTodos = localStorage.getItem('todos');

    if (localStorageTodos !== null) {
        const localStorageTodosParsed = JSON.parse(localStorageTodos);
        tasks = localStorageTodosParsed;
        for (const task of tasks) {
            displayTaskOnPage(task, false)
        }
    }
}
showTasksFromLocalStorage();


// delete all todos from local storage and UI in one click
deleteAll.addEventListener('click', (e) => {
    e.preventDefault();
    todoContainer.innerHTML = '';
    localStorage.removeItem('todos');
})

// handle todo submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = form.elements[0].value;
    form.elements[0].value = "";
    addTask.value = "";
    if (task !== "") {
        displayTaskOnPage(task, true);
    }

})

// delete specific Todo
todoContainer.addEventListener('click', function (e) {
    const btn = e.target.closest('button');
    let btnName;
    if (btn) {
        btnName = btn.classList[0];
    }
    const currentTodo = e.target.closest('.todo');
    const input = currentTodo.firstElementChild;
    if (btnName === "check-button") {
        input.classList.toggle('strike-text')
    }
    else if (btnName === "edit-button") {
        input.removeAttribute('disabled')
    }
    else if (btnName === "delete-button") {
        currentTodo.parentNode.removeChild(currentTodo);
        tasks.splice(tasks.indexOf(currentTodo.querySelector('input').value), 1)
        localStorage.setItem('todos', JSON.stringify(tasks));
    }
})


// show todos from local storage on app load
