const newTask = document.getElementById("new-task")
const form = document.querySelector("form")
const tasks = document.getElementById("tasks")

const TaskList = document.querySelector("ul")
const emptyDiv = document.querySelector(".empty")
const TasksQuantity = document.getElementById("createdTasks")

const TasksDone = document.getElementById("numberDone")
const checkbox = document.querySelectorAll('#tasks .task input[type="checkbox"]')

form.onsubmit = (event) => {
    event.preventDefault()

    const NewTask = {
        id: new Date().getTime(),
        newTask: newTask.value,
        created_at: new Date(),
    }

    if (newTask.value.trim().length > 0) {
        removeEmptyMessage()

        TaskAdd(NewTask)
        newTask.value = ""
    }

}

function TaskAdd(NewTask) { 
        try {
            const TaskItem = document.createElement("li")
            TaskItem.classList.add("task")

            const Check = document.createElement("div")
            Check.classList.add("check-image")

            const checkBox = document.createElement("input")
            checkBox.setAttribute("id", "checkbox")
            checkBox.setAttribute("type", "checkbox")

            checkBox.addEventListener('change', updateDone)

            const info = document.createElement("p")
            info.classList.add("content")
            info.textContent = NewTask.newTask

            const ImgDelete = document.createElement("div")
            ImgDelete.classList.add("delete-image")

            TaskItem.append(Check, checkBox, info, ImgDelete)

            TaskList.append(TaskItem)

            formClear()

            updateTasks()

            updateDone()

        } catch (error) {
            alert("Não foi possível adicionar uma nova tarefa.")
            console.log(error)
        }
}

function formClear(){
    newTask.value = ""

    newTask.focus()
}

TaskList.addEventListener("click", function(event) {
    if(event.target.classList.contains("delete-image")){

        const item = event.target.closest(".task")

        item.remove()

        updateTasks()
        updateDone()

        if (TaskList.children.length === 0) {
            showEmptyMessage()
        } 
    }
})

function showEmptyMessage() {
    if (!document.querySelector(".empty")) {
        const emptyMessage = document.createElement("div")
        emptyMessage.classList.add("empty", "text-center")
        emptyMessage.innerHTML = `
            <img src="./style-guide/list.svg" alt="ícone de uma lista de tarefas.">
            <br>
            <div id="menssage">
                <p id="no-task">Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        `
        tasks.parentNode.insertBefore(emptyMessage, tasks)
    }
}

function removeEmptyMessage() {
    const emptyMessage = document.querySelector(".empty")
    if (emptyMessage) {
        emptyMessage.remove()
    }
}

// Para atualizar a quantidade de tarefas criadas

function updateTasks() {
    try {
        const items = TaskList.querySelectorAll('.task')
    
        TasksQuantity.textContent = items.length

    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar a quantidade de tarefas criadas.")
    }
}

function updateDone() {
    const checkboxes = document.querySelectorAll('#tasks .task input[type="checkbox"]')
    let tasksDone = 0

    checkboxes.forEach(box => {
        if (box.checked) {
            tasksDone++
        }
    })

    TasksDone.textContent = tasksDone
}