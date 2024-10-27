const newTask = document.getElementById("new-task")
const form = document.querySelector("form")
const tasks = document.getElementById("tasks")

const TaskList = document.querySelector("ul")
const emptyDiv = document.querySelector(".empty")

form.onsubmit = (event) => {
    event.preventDefault()

    const NewTask = {
        id: new Date().getTime(),
        newTask: newTask.value,
        created_at: new Date(),
    }

    if (newTask.value.trim().length > 0) {
        if (emptyDiv) {
            emptyDiv.remove()
        }

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

            const info = document.createElement("p")
            info.classList.add("content")
            info.textContent = NewTask.newTask

            const ImgDelete = document.createElement("div")
            ImgDelete.classList.add("delete-image")

            TaskItem.append(Check, checkBox, info, ImgDelete)

            TaskList.append(TaskItem)

            formClear()

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

        if (TaskList.children.length === 0) {
            showEmptyMessage()
        }
    }
})

function showEmptyMessage() {
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