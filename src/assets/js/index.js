/*
1. a to-do management
    - each todo is an object. each has title, detail, dueDate, priority, status (done/not done), category
2. a to do list management
    - Create an empty arr and store each to do in
    - update/get the to do
3. a module to render to screen

AI: Add modal prj opts addEditModalProjectOption based on the project list.
*/

import '../css/styles.css';

import { createToDo, toDoListManage } from './toDo';
import { createNote, notesListManage } from './notes';
import sideBarManage from './sideBar';

import {
    sideBarListScreenHandler,
    toDoCardsListScreenRenderer,
    noteCardsListScreenRenderer,
    showModal,
    hideModal,
    modalFormBaseTextStatesHandler,
    modalPartsDisplayStatesHandler,
} from './screenHandler';

export const modalWrapper = document.querySelector('.modalWrapper');
const modal = document.querySelector('.modal');

export const addEditItemFormModal = document.querySelector('.addEditItemFormModal');
export const addEditModalHeadingAction = document.querySelector('.addEditModalHeadingAction');
export const addEditModalHeadingType = document.querySelector('.addEditModalHeadingType');
export const addEditModalDetailLabel = document.querySelector('.addEditModalDetailLabel');
export const addEditModalDetailInp = document.querySelector('.addEditModalDetailInp');
export const addEditModalBodyBottom = document.querySelector('.addEditModalBodyBottom');
export const addEditModalBtnAction = document.querySelector('.addEditModalBtnAction');
export const addEditModalBtnType = document.querySelector('.addEditModalBtnType');

const addEditModalDateInp = document.querySelector('#addEditModalDateInp');
const addEditModalBtn = document.querySelector('.addEditModalBtn');

export const detailModal = document.querySelector('.detailModal');
const modalCloseBtn = document.querySelector('.modalCloseWrapper');

const sideBarList = document.querySelector('.sideList');
const sideBarAddToDoBtn = document.querySelector('.sideBtnAddItem[data-type="toDo"]');
const sideBarAddProjectBtn = document.querySelector('.sideBtnAddItem[data-type="project"]');
const sideBarAddNoteBtn = document.querySelector('.sideBtnAddItem[data-type="note"]');

const todoWrapper = document.querySelector('.todoWrapper');
const notesWrapper = document.querySelector('.notesWrapper');

const t = sideBarManage();

const toDo = toDoListManage();
const notes = notesListManage();
const sideBar = sideBarManage(toDo, notes);

toDo.initializeToDoList();
notes.initializeNotesList();

// SIDE BAR LOGIC
// console.log('before: ');
// console.table(sideBar.getSideBarItemsList());
sideBar.updateSideBarNumber();
sideBarListScreenHandler(sideBarList, sideBar);
// console.log('added number 1st time: ');
// console.table(sideBar.getSideBarItemsList());

// const itemToAdd = createToDo('Add sample item', 'sample item to do', '2025-06-12', 'low', 'personal', false);
// sideBarListScreenHandler(sideBarList, sideBar);
// toDo.addItemToToDoList(itemToAdd);

// console.log('list category:');
// toDo.getToDoListByCategory('personal');

// sideBar.updateSideBarNumber();
// sideBarListScreenHandler(sideBarList, sideBar);
// console.log('added item + update number: ');
// console.table(sideBar.getSideBarItemsList());

// ===============
// TO DO LOGIC
toDoCardsListScreenRenderer(todoWrapper, toDo, sideBar);

noteCardsListScreenRenderer(notesWrapper, notes);

// ==============================
// change modal states
// modalPartsDisplayStatesHandler(
//     'detail',
//     'toDo',
//     addEditItemFormModal,
//     addEditModalDetailLabel,
//     addEditModalDetailInp,
//     addEditModalBodyBottom,
//     detailModal,
// );
// ===============================

addEditItemFormModal.addEventListener('submit', (e) => {
    e.preventDefault();
});

addEditModalBtn.addEventListener('click', () => {
    console.log(addEditModalDateInp.value);
    // 2025-06-19
});

sideBarAddToDoBtn.addEventListener('click', () => {
    modalFormBaseTextStatesHandler(
        sideBarAddToDoBtn.dataset.action,
        sideBarAddToDoBtn.dataset.type,
        addEditModalHeadingAction,
        addEditModalHeadingType,
        addEditModalBtnAction,
        addEditModalBtnType,
    );
    modalPartsDisplayStatesHandler(
        sideBarAddToDoBtn.dataset.action,
        sideBarAddToDoBtn.dataset.type,
        addEditItemFormModal,
        addEditModalDetailLabel,
        addEditModalDetailInp,
        addEditModalBodyBottom,
        detailModal,
    );
    showModal(modalWrapper);
});

sideBarAddProjectBtn.addEventListener('click', () => {
    modalFormBaseTextStatesHandler(
        sideBarAddProjectBtn.dataset.action,
        sideBarAddProjectBtn.dataset.type,
        addEditModalHeadingAction,
        addEditModalHeadingType,
        addEditModalBtnAction,
        addEditModalBtnType,
    );
    modalPartsDisplayStatesHandler(
        sideBarAddProjectBtn.dataset.action,
        sideBarAddProjectBtn.dataset.type,
        addEditItemFormModal,
        addEditModalDetailLabel,
        addEditModalDetailInp,
        addEditModalBodyBottom,
        detailModal,
    );
    showModal(modalWrapper);
});

sideBarAddNoteBtn.addEventListener('click', () => {
    modalFormBaseTextStatesHandler(
        sideBarAddNoteBtn.dataset.action,
        sideBarAddNoteBtn.dataset.type,
        addEditModalHeadingAction,
        addEditModalHeadingType,
        addEditModalBtnAction,
        addEditModalBtnType,
    );
    modalPartsDisplayStatesHandler(
        sideBarAddNoteBtn.dataset.action,
        sideBarAddNoteBtn.dataset.type,
        addEditItemFormModal,
        addEditModalDetailLabel,
        addEditModalDetailInp,
        addEditModalBodyBottom,
        detailModal,
    );
    showModal(modalWrapper);
});

modal.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
});

modalWrapper.addEventListener('click', () => {
    hideModal(modalWrapper);
});

modalCloseBtn.addEventListener('click', () => {
    hideModal(modalWrapper);
});
