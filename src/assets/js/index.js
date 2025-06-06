/*
1. a to-do management
    - each todo is an object. each has title, detail, dueDate, priority, status (done/not done), category
2. a to do list management
    - Create an empty arr and store each to do in
    - update/get the to do
3. a module to render to screen
*/

import '../css/styles.css';

import toDoListManage from './toDo';

const t = toDoListManage();
console.log(t);

const addEditModalDateInp = document.querySelector('#addEditModalDateInp');
const addEditModalBtn = document.querySelector('.addEditModalBtn');

const addEditItemModal = document.querySelector('.addEditItemModal');

addEditItemModal.addEventListener('submit', (e) => {
    e.preventDefault();
});

addEditModalBtn.addEventListener('click', () => {
    console.log(addEditModalDateInp.value);
});
