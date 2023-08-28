const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');



const fetchTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks');
    const dataTasks = await res.json();
    return dataTasks;
}

const formatDate = (dateUTC) => {
    const option = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date(dateUTC).toLocaleString('pt-br', option);
    return date;
}




const addTask = async (event) => {
    event.preventDefault();

    const task = {
        title: inputTask.value
    };

    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)

    });

    loadTasks();
    inputTask.value = '';
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });
    loadTasks();
}

const updaterTask = async ({id, title, status}) => {


    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, status})
});

    loadTasks();
}


const createElement = (tag, innerText = '', innetHTML = '') => {
    const element = document.createElement(tag);
    if (innerText) {
        element.innerText = innerText;
    }
    if (innetHTML) {
        element.innerHTML = innetHTML;
    }
    return element;
}

const createSelect = (value) => {
    const option = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluido">concluido</option>`;
    const select = createElement('select', '', option);

    select.value = value;

    return select;
}

const createRow = (task) => {

    const { id, title, created_at, status } = task;


    const tr = document.createElement('tr');
    const tdTittle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);

    select.addEventListener('change', ({target }) => updaterTask({ ...task, status: target.value}));

    const editButton = createElement('button', ' ', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', ' ', '<span class="material-symbols-outlined">delete</span>');

    const editForm = createElement('form');
    const editInput = createElement('input');

    
    editInput.value = title;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updaterTask({...task, title: editInput.value});
    });

    editButton.addEventListener('click',() => {
        tdTittle.innerHTML = '';
        tdTittle.appendChild(editForm);
    });

    editButton.classList.add('btn', 'btn-action');
    deleteButton.classList.add('btn', 'btn-action');

    deleteButton.addEventListener('click', () => { deleteTask(id); });

    tdStatus.appendChild(select);


    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTittle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
}

const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();