/*
1. a to-do management
    - each todo is an object. each has title, detail, dueDate, priority, status (done/not done), category
2. a to do list management
    - Create an empty arr and store each to do in
    - update/get the to do
3. a module to render to screen

AI:done Add modal prj opts addEditModalProjectOption based on the project list.
AI: un-show todoWrapper/noteWrapper when other are shown
*/

import '../css/styles.css';

import { createToDo, toDoListManage } from './toDo';
import { createNote, notesListManage } from './notes';
import sideBarManage from './sideBar';
import formModalManage from './formModalHandler';

import {
    sideBarListScreenHandler,
    toDoCardsListScreenRenderer,
    noteCardsListScreenRenderer,
    showModal,
    hideModal,
    formModalBaseTextContentHandler,
    modalPartsDisplayStatesHandler,
} from './screenHandler';

export const modalWrapper = document.querySelector('.modalWrapper');
const modal = document.querySelector('.modal');

export const addEditItemFormModal = document.querySelector('.addEditItemFormModal');
export const addEditModalHeadingAction = document.querySelector('.addEditModalHeadingAction');
export const addEditModalHeadingType = document.querySelector('.addEditModalHeadingType');
export const addEditModalTitleInp = document.querySelector('.addEditModalTitleInp');
export const addEditModalDetailLabel = document.querySelector('.addEditModalDetailLabel');
export const addEditModalDetailInp = document.querySelector('#addEditModalDetailInp');

export const addEditModalBodyBottom = document.querySelector('.addEditModalBodyBottom');
export const addEditModalBtnAction = document.querySelector('.addEditModalBtnAction');
export const addEditModalBtnType = document.querySelector('.addEditModalBtnType');

export const addEditModalDateInp = document.querySelector('#addEditModalDateInp');
export const addEditModalProjectSelectInp = document.querySelector('#addEditModalProjectSelectInp');
export const modalPriorityBtnLow = document.querySelector('.addEditModalPriorityBtn[data-value="low"]');
export const modalPriorityBtnMedium = document.querySelector('.addEditModalPriorityBtn[data-value="medium"]');
export const modalPriorityBtnHigh = document.querySelector('.addEditModalPriorityBtn[data-value="high"]');
const addEditModalBtn = document.querySelector('.addEditModalBtn');

export const detailModal = document.querySelector('.detailModal');
export const detailModalHeading = document.querySelector('.detailModalHeading');
export const detailModalContentWrapper = document.querySelector('.detailModalContentWrapper');
const modalCloseBtn = document.querySelector('.modalCloseWrapper');

export const sideBarList = document.querySelector('.sideList');
const sideBarAddToDoBtn = document.querySelector('.sideBtnAddItem[data-type="toDo"]');
const sideBarAddProjectBtn = document.querySelector('.sideBtnAddItem[data-type="project"]');
const sideBarAddNoteBtn = document.querySelector('.sideBtnAddItem[data-type="note"]');

export const todoWrapper = document.querySelector('.todoWrapper');
export const notesWrapper = document.querySelector('.notesWrapper');

const t = sideBarManage();

// sample save localStorage
// const itemTest = createToDo('TESTTTTTTTTT', 'TEST CONNTENTTT', '2025-06-18', 'high', 'personal', false);
// localStorage.setItem(`${itemTest.id}`, JSON.stringify(itemTest));
// localStorage.clear();

const toDo = toDoListManage();
const notes = notesListManage();
const sideBar = sideBarManage(toDo, notes);

toDo.initializeToDoList();
notes.initializeNotesList();
sideBar.initializeSideBarList();

// console.table(toDo.getToDoList());

// localStorage.clear();
// window.localStorage.clear();

// console.table(toDo.getToDoList());
// SIDE BAR LOGIC
// console.log('before: ');
// console.table(sideBar.getSideBarItemsList());
// sideBar.updateSideBarNumber();
sideBarListScreenHandler(sideBarList, toDo, notes, sideBar);
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
// noteCardsListScreenRenderer(todoWrapper, notesWrapper, notes);
toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDo, sideBar);

// ===============================

addEditItemFormModal.addEventListener('submit', (e) => {
    e.preventDefault();
});

modalPriorityBtnLow.addEventListener('click', function () {
    modalPriorityBtnMedium.classList.remove('active');
    modalPriorityBtnHigh.classList.remove('active');
    if (this.classList.contains('active')) {
        this.classList.remove('active');
    } else {
        this.classList.add('active');
    }
});

modalPriorityBtnMedium.addEventListener('click', function () {
    modalPriorityBtnLow.classList.remove('active');
    modalPriorityBtnHigh.classList.remove('active');
    if (this.classList.contains('active')) {
        this.classList.remove('active');
    } else {
        this.classList.add('active');
    }
});

modalPriorityBtnHigh.addEventListener('click', function () {
    modalPriorityBtnLow.classList.remove('active');
    modalPriorityBtnMedium.classList.remove('active');
    if (this.classList.contains('active')) {
        this.classList.remove('active');
    } else {
        this.classList.add('active');
    }
});

addEditModalBtn.addEventListener('click', () => {
    // console.log(addEditModalTitleInp.value);
    // console.log(addEditModalDetailInp.value);
    // console.log(addEditModalDateInp.value);
    // console.log(addEditModalProjectSelectInp.value);
    // 2025-06-19

    if (
        addEditModalTitleInp.value === '' ||
        addEditModalTitleInp.value.replace(/\s/g, '').length == 0 ||
        addEditModalTitleInp.value.length == 0
    ) {
        alert("Please fill out form's Title");
        return;
    } else {
        const hiddenIdInp = document.querySelector('.addEditItemFormModal .hiddenIdInp');
        const hiddenCompleteStatusInp = document.querySelector('.addEditItemFormModal .hiddenCompleteStatusInp');
        const formAction = addEditItemFormModal.dataset.action;
        const formType = addEditItemFormModal.dataset.type;
        // console.log(formAction);

        let priorityVal = '';
        if (modalPriorityBtnLow.classList.contains('active')) {
            priorityVal = 'low';
        } else if (modalPriorityBtnMedium.classList.contains('active')) {
            priorityVal = 'medium';
        } else if (modalPriorityBtnHigh.classList.contains('active')) {
            priorityVal = 'high';
        }
        // console.log(priorityVal);

        let formHandler;
        if (hiddenIdInp && hiddenCompleteStatusInp) {
            formHandler = formModalManage(
                toDo,
                notes,
                sideBar,
                hiddenIdInp.value,
                hiddenCompleteStatusInp.value,
                addEditModalTitleInp.value,
                addEditModalDetailInp.value,
                addEditModalDateInp.value,
                addEditModalProjectSelectInp.value,
                priorityVal,
            );
        } else {
            formHandler = formModalManage(
                toDo,
                notes,
                sideBar,
                '',
                '',
                addEditModalTitleInp.value,
                addEditModalDetailInp.value,
                addEditModalDateInp.value,
                addEditModalProjectSelectInp.value,
                priorityVal,
            );
        }

        if (formAction === 'add' && formType === 'toDo') {
            formHandler.addToDoHandler();
            sideBarListScreenHandler(sideBarList, toDo, notes, sideBar);
            toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDo, sideBar);
            hideModal(sideBar, modalWrapper);
        } else if (formAction === 'add' && formType === 'project') {
            formHandler.addProjectHandler();
            sideBarListScreenHandler(sideBarList, toDo, notes, sideBar);
            hideModal(sideBar, modalWrapper);
        } else if (formAction === 'add' && formType === 'note') {
            formHandler.addNoteHandler();
            sideBarListScreenHandler(sideBarList, toDo, notes, sideBar);
            hideModal(sideBar, modalWrapper);
        } else if (formAction === 'edit' && formType === 'toDo') {
            formHandler.editToDoHandler();
            sideBarListScreenHandler(sideBarList, toDo, notes, sideBar);
            toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDo, sideBar);
            hideModal(sideBar, modalWrapper);
        }
    }
});

// =========================

sideBarAddToDoBtn.addEventListener('click', () => {
    formModalBaseTextContentHandler(
        sideBarAddToDoBtn.dataset.action,
        sideBarAddToDoBtn.dataset.type,
        addEditItemFormModal,
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
    formModalBaseTextContentHandler(
        sideBarAddProjectBtn.dataset.action,
        sideBarAddProjectBtn.dataset.type,
        addEditItemFormModal,
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
    formModalBaseTextContentHandler(
        sideBarAddNoteBtn.dataset.action,
        sideBarAddNoteBtn.dataset.type,
        addEditItemFormModal,
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
    hideModal(sideBar, modalWrapper);
});

modalCloseBtn.addEventListener('click', () => {
    hideModal(sideBar, modalWrapper);
});
