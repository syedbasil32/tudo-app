async function loadTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();

    const list = document.getElementById('taskList');
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = task.text + 
        ` <button onclick="deleteTask(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value;

    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: task })
    });

    input.value = "";
    loadTasks();
}

async function deleteTask(index) {
    await fetch(`/tasks/${index}`, { method: 'DELETE' });
    loadTasks();
}

loadTasks();