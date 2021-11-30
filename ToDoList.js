var toDoItems = [];


class ToDoItem {
    constructor(task_description="") {
        this.taskDesctiption = task_description;
        this.id = Math.random() * 8;
    }
}


function popup() {
    popup.classList.remove("hidden");
    popup.classList.toggle("show");
    document.body.classList.toggle("blur_body");
}

function confirmPopup(answer) {
    (answer) ? submitTask(task_description=document.getElementById("task_input").value): null;
    popup.classList.remove("show");
    popup.classList.toggle("hidden");
    document.body.classList.remove("blur_body");
}

function submitTask(task_description) {
    let task = new ToDoItem(task_description)
    toDoItems.push(task);
    updateTaskList(task);
    document.getElementById("task_input").value = "";
}

function deleteTask(task) {
    if (task.checkbox.checked) {
        document.getElementById('tasks_table').removeChild(document.getElementById(task.entry.id))
    }
    return !task.checkbox.checked
}


function deleteTasks() {
    toDoItems = toDoItems.filter(deleteTask)
}

function createCheckbox() {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    return checkbox
}

function deleteSingleTask(task_id) {
    toDoItems = toDoItems.filter((task) => deleteTaskFromDeleteButton(task,task_id))
}

function deleteTaskFromDeleteButton(task, task_id) {
    if (task.id === task_id) {
        document.getElementById('tasks_table').removeChild(document.getElementById(task.entry.id))
    }
    return task.id !== task_id
}


function createDeleteTaskButton(task_id) {
    let delete_button = document.createElement('button');
    delete_button.textContent = "X"
    delete_button.className = 'delete_button'
    delete_button.onclick = () => deleteSingleTask(task_id)
    return delete_button
}

function createEntry(task) {
    let entry = document.createElement('tr');
    let mark = document.createElement('td');
    let task_description = document.createElement('td');
    let delete_task = document.createElement('td');
    mark.prepend(task.checkbox);
    task_description.textContent = task.taskDesctiption;
    task_description.className = 'task_desc';
    delete_task.prepend(createDeleteTaskButton(task.id));
    entry.id = "entry" + task.id;
    entry.className = 'TaskEntry';
    entry.append(mark, task_description, delete_task);
    return entry
}



function updateTaskList(task) {
    task.checkbox = createCheckbox(task.id);
    let entry = createEntry(task);
    document.getElementById('tasks_table').append(entry);
    task.entry = entry;
}

// document.getElementById('submit_task').onclick = () => {submitTask(task_description=document.getElementById("task_input").value)}
document.getElementById('submit_task').onclick = popup;
document.getElementById('delete').onclick = deleteTasks;
var popup = document.getElementById("popup");
popup.classList.toggle("hidden");

document.getElementById('yesPopup').onclick = () => {confirmPopup(true)};
document.getElementById('noPopup').onclick = () => {confirmPopup(false)};



var input = document.getElementById('task_input')

input.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        if (popup.classList.contains("show")) {
            document.getElementById('yesPopup').click();
        }
        else
        {
            document.getElementById("submit_task").click();
        }
    }
  });
