async function load() {
    let res = await fetch('/tasks');
    let data = await res.json();

    let list = document.getElementById('list');
    list.innerHTML = "";

    data.forEach((t, i) => {
        list.innerHTML += `
        <li>
            ${t.text}
            <button onclick="del(${i})">Delete</button>
        </li>`;
    });
}

async function addTask() {
    let task = document.getElementById('task').value;

    if (task.trim() === "") return;

    await fetch('/tasks', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({text: task})
    });

    document.getElementById('task').value = "";
    load();
}

async function del(i) {
    await fetch('/tasks/'+i, {method:'DELETE'});
    load();
}

load();