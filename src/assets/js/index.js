/*
1. a to-do management
    - each todo is an object. each has title, detail, dueDate, priority, status (done/not done), category
2. a to do list management
    - Create an empty arr and store each to do in
    - update/get the to do
3. a module to render to screen
*/

import '../css/styles.css';

import { createToDo, toDoListManage, toDoCardRenderer } from './toDo';
import { createNote, notesListManage } from './notes';
import sideBarManage from './sideBar';

import { sideBarListScreenHandler, toDoCardsListScreenRenderer } from './screenHandler';

const t = sideBarManage();

const toDo = toDoListManage();
const notes = notesListManage();
const sideBar = sideBarManage(toDo, notes);

toDo.initializeToDoList();
notes.initializeNotesList();

// SIDE BAR LOGIC
// console.log('before: ');
// console.table(sideBar.getSideBarListItems());
sideBar.updateSideBarNumber();
sideBarListScreenHandler(sideBar);
// console.log('added number 1st time: ');
// console.table(sideBar.getSideBarListItems());

const itemToAdd = createToDo('Add sample item', 'sample item to do', '2025-06-12', 'low', 'personal', false);
sideBarListScreenHandler(sideBar);
toDo.addItemToToDoList(itemToAdd);

// console.log('list category:');
// toDo.getToDoListByCategory('personal');

sideBar.updateSideBarNumber();
sideBarListScreenHandler(sideBar);
// console.log('added item + update number: ');
// console.table(sideBar.getSideBarListItems());

// TO DO LOGIC
toDoCardsListScreenRenderer(toDo);

// ===============================

const addEditModalDateInp = document.querySelector('#addEditModalDateInp');
const addEditModalBtn = document.querySelector('.addEditModalBtn');

const addEditItemModal = document.querySelector('.addEditItemModal');

addEditItemModal.addEventListener('submit', (e) => {
    e.preventDefault();
});

addEditModalBtn.addEventListener('click', () => {
    console.log(addEditModalDateInp.value);
    // 2025-06-19
});
