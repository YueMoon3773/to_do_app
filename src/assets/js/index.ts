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

// import '../css/styles.css';

import { toDoListManage } from './toDo';
import { notesListManage } from './notes';
import sideBarManage from './sideBar';
import formModalManage from './formModalHandler';

import type { ToDoPriorityType, ToDoListManageObjType } from './toDo';
import type { NoteListManageObjType } from './notes';
import type { SideBarManageObjType } from './sideBar';

import {
    sideBarListScreenHandler,
    toDoCardsListScreenRenderer,
    noteCardsListScreenRenderer,
    showModal,
    hideModal,
    formModalBaseTextContentHandler,
    modalPartsDisplayStatesHandler,
} from './screenHandler';

export const modalWrapper = document.querySelector('.modalWrapper') as Element;
const modal = document.querySelector('.modal') as Element;

const menuWrapper = document.querySelector('.menuWrapper') as Element;
export const addEditItemFormModal = document.querySelector('.addEditItemFormModal') as HTMLFormElement;
export const addEditModalHeadingAction = document.querySelector('.addEditModalHeadingAction') as HTMLSpanElement;
export const addEditModalHeadingType = document.querySelector('.addEditModalHeadingType') as HTMLSpanElement;
export const addEditModalTitleInp = document.querySelector('.addEditModalTitleInp') as HTMLInputElement;
export const addEditModalDetailLabel = document.querySelector('.addEditModalDetailLabel') as Element;
export const addEditModalDetailInp = document.querySelector('#addEditModalDetailInp') as HTMLInputElement;

export const addEditModalBodyBottom = document.querySelector('.addEditModalBodyBottom') as Element;
export const addEditModalBtnAction = document.querySelector('.addEditModalBtnAction') as HTMLSpanElement;
export const addEditModalBtnType = document.querySelector('.addEditModalBtnType') as HTMLSpanElement;

export const addEditModalDateInp = document.querySelector('#addEditModalDateInp') as HTMLInputElement;
export const addEditModalProjectSelectInp = document.querySelector('#addEditModalProjectSelectInp') as HTMLInputElement;
export const modalPriorityBtnLow = document.querySelector(
    '.addEditModalPriorityBtn[data-value="low"]',
) as HTMLButtonElement;
export const modalPriorityBtnMedium = document.querySelector(
    '.addEditModalPriorityBtn[data-value="medium"]',
) as HTMLButtonElement;
export const modalPriorityBtnHigh = document.querySelector(
    '.addEditModalPriorityBtn[data-value="high"]',
) as HTMLButtonElement;
const addEditModalBtn = document.querySelector('.addEditModalBtn') as Element;

export const detailModal = document.querySelector('.detailModal') as Element;
export const detailModalHeading = document.querySelector('.detailModalHeading') as HTMLHeadingElement;
export const detailModalContentWrapper = document.querySelector('.detailModalContentWrapper') as Element;
const modalCloseBtn = document.querySelector('.modalCloseWrapper') as Element;

export const sideBarList = document.querySelector('.sideList') as Element;
const sideBarAddToDoBtn = document.querySelector('.sideBtnAddItem[data-type="toDo"]') as HTMLButtonElement;
const sideBarAddProjectBtn = document.querySelector('.sideBtnAddItem[data-type="project"]') as HTMLButtonElement;
const sideBarAddNoteBtn = document.querySelector('.sideBtnAddItem[data-type="note"]') as HTMLButtonElement;

export const todoWrapper = document.querySelector('.todoWrapper') as Element;
export const notesWrapper = document.querySelector('.notesWrapper') as Element;

const sideBarDom = document.querySelector('.sideBar') as Element;
const sideBtnWrapperDom = document.querySelector('.sideBtnWrapper') as Element;
const sideBtnAddListDom = document.querySelector('.sideBtnAddList') as Element;

// sample save localStorage
// const itemTest = createToDo('TESTTTTTTTTT', 'TEST CONNTENTTT', '2025-06-18', 'high', 'personal', false);
// localStorage.setItem(`${itemTest.id}`, JSON.stringify(itemTest));
// localStorage.clear();

const toDo: ToDoListManageObjType = toDoListManage();
const notes: NoteListManageObjType = notesListManage();
const sideBar: SideBarManageObjType = sideBarManage(toDo, notes);

try {
    toDo.initializeToDoList();
} catch (err) {
    console.error('initializeToDoList failed, clearing corrupted storage:', err);
    localStorage.clear();
    toDo.initializeToDoList();
}
notes.initializeNotesList();
sideBar.initializeSideBarList();

// console.table(toDo.getToDoList());

// localStorage.clear();
// window.localStorage.clear();

sideBarListScreenHandler(sideBarList, toDo, notes, sideBar);

toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDo, notes, sideBar);

// ===============================

menuWrapper.addEventListener('click', (): void => {
    if (menuWrapper.classList.contains('open')) {
        menuWrapper.classList.remove('open');
        menuWrapper.classList.add('close');
    } else if (menuWrapper.classList.contains('close')) {
        menuWrapper.classList.remove('close');
        menuWrapper.classList.add('open');
    }

    if (sideBarDom.classList.contains('hide')) {
        sideBarDom.classList.remove('hide');
        sideBarDom.classList.add('show');
    } else if (sideBarDom.classList.contains('show')) {
        sideBarDom.classList.remove('show');
        sideBarDom.classList.add('hide');
    }
});

sideBtnWrapperDom.addEventListener('click', (): void => {
    if (!sideBtnAddListDom.classList.contains('show')) {
        sideBtnAddListDom.classList.add('show');
    } else {
        sideBtnAddListDom.classList.remove('show');
    }

    setTimeout(() => {
        if (sideBtnAddListDom.classList.contains('show')) {
            sideBtnAddListDom.classList.remove('show');
        }
    }, 5000);
});

addEditItemFormModal.addEventListener('submit', (e: Event): void => {
    e.preventDefault();
});

modalPriorityBtnLow.addEventListener('click', function (e: Event) {
    modalPriorityBtnMedium.classList.remove('active');
    modalPriorityBtnHigh.classList.remove('active');

    const target = e.currentTarget as HTMLButtonElement;
    if (target.classList.contains('active')) {
        target.classList.remove('active');
    } else {
        target.classList.add('active');
    }
});

modalPriorityBtnMedium.addEventListener('click', function (e: Event): void {
    modalPriorityBtnLow.classList.remove('active');
    modalPriorityBtnHigh.classList.remove('active');

    const target = e.currentTarget as HTMLButtonElement;
    if (target.classList.contains('active')) {
        target.classList.remove('active');
    } else {
        target.classList.add('active');
    }
});

modalPriorityBtnHigh.addEventListener('click', function (e: Event): void {
    modalPriorityBtnLow.classList.remove('active');
    modalPriorityBtnMedium.classList.remove('active');

    const target = e.currentTarget as HTMLInputElement;
    if (target.classList.contains('active')) {
        target.classList.remove('active');
    } else {
        target.classList.add('active');
    }
});

addEditModalBtn.addEventListener('click', (): void => {
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
        const hiddenIdInp = document.querySelector('.addEditItemFormModal .hiddenIdInp') as HTMLInputElement;
        const hiddenCompleteStatusInp = document.querySelector(
            '.addEditItemFormModal .hiddenCompleteStatusInp',
        ) as HTMLInputElement;
        const formAction = addEditItemFormModal.dataset.action;
        const formType = addEditItemFormModal.dataset.type;
        // console.log(formAction);

        let priorityVal: ToDoPriorityType = '';
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
            const hiddenCompleteStatusInpVal = hiddenCompleteStatusInp.value as 'true' | 'false';

            formHandler = formModalManage(
                toDo,
                notes,
                sideBar,
                hiddenIdInp.value,
                hiddenCompleteStatusInpVal,
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
                'false',
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
            toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDo, notes, sideBar);
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
            toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDo, notes, sideBar);
            hideModal(sideBar, modalWrapper);
        }
    }
});

// =========================

sideBarAddToDoBtn.addEventListener('click', (): void => {
    if (sideBarAddToDoBtn.dataset.action === undefined || sideBarAddToDoBtn.dataset.type === undefined) return;

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

sideBarAddProjectBtn.addEventListener('click', (): void => {
    if (sideBarAddProjectBtn.dataset.action === undefined || sideBarAddProjectBtn.dataset.type === undefined) return;

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

sideBarAddNoteBtn.addEventListener('click', (): void => {
    if (sideBarAddNoteBtn.dataset.action === undefined || sideBarAddNoteBtn.dataset.type === undefined) return;

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

modal.addEventListener('click', (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
});

modalWrapper.addEventListener('click', (): void => {
    hideModal(sideBar, modalWrapper);
});

modalCloseBtn.addEventListener('click', () => {
    hideModal(sideBar, modalWrapper);
});
