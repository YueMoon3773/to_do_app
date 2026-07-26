// import { toDoListManage } from './toDo';
// import { createNote, notesListManage } from './notes';
// import sideBarManage from './sideBar';

// const toDo = toDoListManage();
// const notes = notesListManage();
// const sideBar = sideBarManage();

import { format } from 'date-fns';
import SVGIconTemplate from './svgIconTemplate';

import {
    sideBarList,
    todoWrapper,
    notesWrapper,
    modalWrapper,
    addEditItemFormModal,
    addEditModalHeadingAction,
    addEditModalHeadingType,
    addEditModalTitleInp,
    addEditModalDetailLabel,
    addEditModalDetailInp,
    addEditModalBodyBottom,
    addEditModalBtnAction,
    addEditModalBtnType,
    addEditModalDateInp,
    addEditModalProjectSelectInp,
    modalPriorityBtnLow,
    modalPriorityBtnMedium,
    modalPriorityBtnHigh,
    detailModal,
    detailModalHeading,
    detailModalContentWrapper,
} from './index';

// TYPES DEFINITION
import type { ToDoPriorityType, ToDoType, ToDoItemByIdType, ToDoListManageObjType } from './toDo';
import type { NoteType, NoteListManageObjType } from './notes';
import type { SideBarItemBaseType, SideBarItemType, SideBarManageObjType } from './sideBar';

interface ModalStateType {
    action: 'add' | 'edit' | 'detail';
    type: 'toDo' | 'note' | 'project';
    detailModalVisibility: boolean;
    formModalVisibility: boolean;
    formModalHeadingActionText: 'Create a new' | 'Modify' | '';
    formModalTypeText: 'Note' | 'To Do' | 'Project' | '';
    formModalDetailVisibility: boolean;
    formModalBodyBottomVisibility: boolean;
    formModalFooterBtnActionText: 'Change' | 'Add' | '';
}

type DOMtodoCardPriorityType = 'importantLow' | 'importantMed' | 'importantHigh' | '';
type DOMtoDoCardStateType = 'done' | '';
type DOMtCardCheckBoxBlankStateType = 'show' | '';
type DOMtCardCheckBoxCheckedStateType = 'show' | '';

interface ToDoCardStatesType {
    DOMtodoCardPriority: DOMtodoCardPriorityType;
    DOMtoDoCardState: DOMtoDoCardStateType;
    DOMtCardCheckBoxBlankState: DOMtCardCheckBoxBlankStateType;
    DOMtCardCheckBoxCheckedState: DOMtCardCheckBoxCheckedStateType;
}

type ToDoCardActionType = 'detail' | 'edit';

// STATES HANDLER FUNCTIONS
const modalStates: ModalStateType[] = [
    {
        action: 'add',
        type: 'toDo',
        detailModalVisibility: false,
        formModalVisibility: true,
        formModalHeadingActionText: 'Create a new',
        formModalTypeText: 'To Do',
        formModalDetailVisibility: true,
        formModalBodyBottomVisibility: true,
        formModalFooterBtnActionText: 'Add',
    },
    {
        action: 'add',
        type: 'project',
        detailModalVisibility: false,
        formModalVisibility: true,
        formModalHeadingActionText: 'Create a new',
        formModalTypeText: 'Project',
        formModalDetailVisibility: false,
        formModalBodyBottomVisibility: false,
        formModalFooterBtnActionText: 'Add',
    },
    {
        action: 'add',
        type: 'note',
        detailModalVisibility: false,
        formModalVisibility: true,
        formModalHeadingActionText: 'Create a new',
        formModalTypeText: 'Note',
        formModalDetailVisibility: true,
        formModalBodyBottomVisibility: false,
        formModalFooterBtnActionText: 'Add',
    },
    {
        action: 'edit',
        type: 'toDo',
        detailModalVisibility: false,
        formModalVisibility: true,
        formModalHeadingActionText: 'Modify',
        formModalTypeText: 'To Do',
        formModalDetailVisibility: true,
        formModalBodyBottomVisibility: true,
        formModalFooterBtnActionText: 'Change',
    },
    {
        action: 'detail',
        type: 'toDo',
        detailModalVisibility: true,
        formModalVisibility: false,
        formModalHeadingActionText: '',
        formModalTypeText: '',
        formModalDetailVisibility: false,
        formModalBodyBottomVisibility: false,
        formModalFooterBtnActionText: '',
    },
];

const getModalStates = (): ModalStateType[] => {
    return modalStates;
};

const modalPartsDisplayStatesHandler = (
    action: string,
    type: string,
    formModal: HTMLFormElement,
    formModalDetailLabel: Element,
    formModalDetailInp: HTMLInputElement,
    formModalBodyBottom: Element,
    detailModal: Element,
): void => {
    getModalStates().forEach((modalState) => {
        if (modalState.action === action && modalState.type === type) {
            if (modalState.detailModalVisibility === false) {
                if (detailModal.classList.contains('show')) {
                    detailModal.classList.remove('show');
                }
            } else {
                if (!detailModal.classList.contains('show')) {
                    detailModal.classList.add('show');
                }
            }

            if (modalState.formModalVisibility === false) {
                if (formModal.classList.contains('show')) {
                    formModal.classList.remove('show');
                }
            } else {
                if (!formModal.classList.contains('show')) {
                    formModal.classList.add('show');
                }
            }

            if (modalState.formModalDetailVisibility === false) {
                if (formModalDetailLabel.classList.contains('show') && formModalDetailInp.classList.contains('show')) {
                    formModalDetailLabel.classList.remove('show');
                    formModalDetailInp.classList.remove('show');
                }
            } else {
                if (
                    !(formModalDetailLabel.classList.contains('show') && formModalDetailInp.classList.contains('show'))
                ) {
                    formModalDetailLabel.classList.add('show');
                    formModalDetailInp.classList.add('show');
                }
            }

            if (modalState.formModalBodyBottomVisibility === false) {
                if (formModalBodyBottom.classList.contains('show')) {
                    formModalBodyBottom.classList.remove('show');
                }
            } else {
                if (!formModalBodyBottom.classList.contains('show')) {
                    formModalBodyBottom.classList.add('show');
                }
            }
        }
    });
};

const toDoCardStatesHandler = (toDoCompleteStatus: boolean, toDoPriority: ToDoPriorityType): ToDoCardStatesType => {
    let DOMtodoCardPriority: DOMtodoCardPriorityType = 'importantLow';
    let DOMtoDoCardState: DOMtoDoCardStateType = 'done';
    let DOMtCardCheckBoxBlankState: DOMtCardCheckBoxBlankStateType = 'show';
    let DOMtCardCheckBoxCheckedState: DOMtCardCheckBoxCheckedStateType = 'show';

    if (toDoCompleteStatus === false) {
        DOMtCardCheckBoxBlankState = 'show';
        DOMtCardCheckBoxCheckedState = '';
        DOMtoDoCardState = '';
    } else {
        DOMtCardCheckBoxBlankState = '';
        DOMtCardCheckBoxCheckedState = 'show';
        DOMtoDoCardState = 'done';
    }

    switch (toDoPriority) {
        case 'low':
            DOMtodoCardPriority = 'importantLow';
            break;
        case 'medium':
            DOMtodoCardPriority = 'importantMed';
            break;
        case 'high':
            DOMtodoCardPriority = 'importantHigh';
            break;
        default:
            DOMtodoCardPriority = '';
            break;
    }

    return {
        DOMtodoCardPriority,
        DOMtoDoCardState,
        DOMtCardCheckBoxBlankState,
        DOMtCardCheckBoxCheckedState,
    };
};

// CLICK LOGICAL + APPEARANCE FUNCTIONS
const formModalBaseTextContentHandler = (
    action: string,
    type: string,
    formModal: HTMLFormElement,
    formHeadingAction: HTMLSpanElement,
    formHeadingType: HTMLSpanElement,
    formFooterBtnAction: HTMLSpanElement,
    formFooterBtnType: HTMLSpanElement,
): void => {
    formModal.dataset.action = action;
    formModal.dataset.type = type;
    getModalStates().forEach((modalState) => {
        if (modalState.action === action && modalState.type === type) {
            formHeadingAction.innerText = modalState.formModalHeadingActionText;
            formHeadingType.innerText = modalState.formModalTypeText;
            formFooterBtnAction.innerText = modalState.formModalFooterBtnActionText;
            formFooterBtnType.innerText = modalState.formModalTypeText;
        }
    });
};

const formModalMainTextContentHandler = (
    action: string = '',
    sideBarManageObj: SideBarManageObjType,
    toDoItem: ToDoType,
    addEditItemFormModal: HTMLFormElement,
    addEditModalTitleInp: HTMLInputElement,
    addEditModalDetailInp: HTMLInputElement,
    addEditModalDateInp: HTMLInputElement,
    addEditModalProjectSelectInp: HTMLInputElement,
    modalPriorityBtnLow: HTMLButtonElement,
    modalPriorityBtnMedium: HTMLButtonElement,
    modalPriorityBtnHigh: HTMLButtonElement,
): void => {
    resetFormModalMainTextContent(
        sideBarManageObj,
        addEditItemFormModal,
        addEditModalTitleInp,
        addEditModalDetailInp,
        addEditModalDateInp,
        addEditModalProjectSelectInp,
        modalPriorityBtnLow,
        modalPriorityBtnMedium,
        modalPriorityBtnHigh,
    );

    addEditModalTitleInp.value = toDoItem.title;
    addEditModalDetailInp.value = toDoItem.detail;
    addEditModalDateInp.value = toDoItem.dueDate;

    // addEditModalProjectSelectInp
    formModalProjectCategoryLoader(sideBarManageObj, toDoItem.category, addEditModalProjectSelectInp);

    switch (toDoItem.priority) {
        case 'low':
            modalPriorityBtnLow.classList.add('active');
            break;
        case 'medium':
            modalPriorityBtnMedium.classList.add('active');
            break;
        case 'high':
            modalPriorityBtnHigh.classList.add('active');
            break;
        default:
            break;
    }

    if (action === 'edit') {
        const DOMhiddenIdInp: HTMLInputElement = document.createElement('input');
        DOMhiddenIdInp.type = 'hidden';
        DOMhiddenIdInp.classList.add('hiddenIdInp');
        DOMhiddenIdInp.value = toDoItem.id;
        DOMhiddenIdInp.name = 'hiddenIdInp';

        const DOMhiddenCompleteStatusInp: HTMLInputElement = document.createElement('input');
        DOMhiddenCompleteStatusInp.type = 'hidden';
        DOMhiddenCompleteStatusInp.classList.add('hiddenCompleteStatusInp');
        DOMhiddenCompleteStatusInp.value = `${toDoItem.completeStatus}`;
        DOMhiddenCompleteStatusInp.name = 'hiddenCompleteStatusInp';

        addEditItemFormModal.appendChild(DOMhiddenIdInp);
        addEditItemFormModal.appendChild(DOMhiddenCompleteStatusInp);
    }
};

const formModalProjectCategoryLoader = (
    sideBarManageObj: SideBarManageObjType,
    toDoCategory: string = '',
    addEditModalProjectSelectInp: HTMLInputElement,
): void => {
    addEditModalProjectSelectInp.innerHTML = '';
    const projectCategoryList = sideBarManageObj.getSideBarProjectItemsList();

    if (projectCategoryList === null) {
        console.error(`${projectCategoryList} is null`);
        return;
    }

    for (let i = 0; i < projectCategoryList.length; i++) {
        const DOMaddEditModalProjectOption = document.createElement('option');
        DOMaddEditModalProjectOption.classList.add('addEditModalProjectOption');
        DOMaddEditModalProjectOption.innerText = projectCategoryList[i];
        DOMaddEditModalProjectOption.dataset.value = projectCategoryList[i];

        if (projectCategoryList[i] === toDoCategory) {
            DOMaddEditModalProjectOption.setAttribute('selected', 'true');
        }
        addEditModalProjectSelectInp.appendChild(DOMaddEditModalProjectOption);
    }
};

const resetFormModalMainTextContent = (
    sideBarManageObj: SideBarManageObjType,
    addEditItemFormModal: HTMLFormElement,
    addEditModalTitleInp: HTMLInputElement,
    addEditModalDetailInp: HTMLInputElement,
    addEditModalDateInp: HTMLInputElement,
    addEditModalProjectSelectInp: HTMLInputElement,
    modalPriorityBtnLow: HTMLButtonElement,
    modalPriorityBtnMedium: HTMLButtonElement,
    modalPriorityBtnHigh: HTMLButtonElement,
): void => {
    addEditModalTitleInp.value = '';
    addEditModalDetailInp.value = '';
    addEditModalDateInp.value = '';

    addEditModalProjectSelectInp.innerHTML = '';
    const projectCategoryList = sideBarManageObj.getSideBarProjectItemsList();

    if (projectCategoryList === null) {
        console.error(`${projectCategoryList} is null`);
        return;
    }

    for (let i = 0; i < projectCategoryList.length; i++) {
        const DOMaddEditModalProjectOption: HTMLOptionElement = document.createElement('option');
        DOMaddEditModalProjectOption.classList.add('addEditModalProjectOption');
        DOMaddEditModalProjectOption.innerText = projectCategoryList[i];
        DOMaddEditModalProjectOption.dataset.value = projectCategoryList[i];

        if (i === 0) {
            DOMaddEditModalProjectOption.setAttribute('selected', 'true');
        }
        addEditModalProjectSelectInp.appendChild(DOMaddEditModalProjectOption);
    }

    if (
        modalPriorityBtnLow.classList.contains('active') ||
        modalPriorityBtnMedium.classList.contains('active') ||
        modalPriorityBtnHigh.classList.contains('active')
    ) {
        modalPriorityBtnLow.classList.remove('active');
        modalPriorityBtnMedium.classList.remove('active');
        modalPriorityBtnHigh.classList.remove('active');
    }

    // Check if there is hidden form Id + complete status inp
    // This inp are used for storing ID + complete status when editing card information
    // if yes delete it from DOM
    const DOMhiddenIdInp = document.querySelector('.addEditItemFormModal .hiddenIdInp') as HTMLInputElement;
    const DOMhiddenCompleteStatusInp = document.querySelector(
        '.addEditItemFormModal .hiddenCompleteStatusInp',
    ) as HTMLInputElement;
    if (DOMhiddenIdInp) {
        addEditItemFormModal.removeChild(DOMhiddenIdInp);
    }
    if (DOMhiddenCompleteStatusInp) {
        addEditItemFormModal.removeChild(DOMhiddenCompleteStatusInp);
    }
};

const swapToDoCheckBoxIcon = (completeStatus: boolean): void => {
    const tCardCheckBoxBlank = document.querySelector('.tCardCheckBoxWrapper .tCardCheckBoxBlank') as Element;
    const tCardCheckBoxChecked = document.querySelector('.tCardCheckBoxWrapper .tCardCheckBoxChecked') as Element;

    if (!tCardCheckBoxBlank && !tCardCheckBoxChecked) {
        return;
    }

    if (completeStatus) {
        tCardCheckBoxBlank.classList.remove('show');
        tCardCheckBoxChecked.classList.add('show');
    } else {
        tCardCheckBoxChecked.classList.remove('show');
        tCardCheckBoxBlank.classList.add('show');
    }
};

const toDoCheckBoxBtnHandler = (
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    id: string,
): void => {
    const toDoItemById: ToDoItemByIdType | null = toDoListManageObj.getToDoItemById(toDoListManageObj, id);

    if (!toDoItemById) {
        console.warn(`No to do item with id ${id} found`);
        return;
    }

    const toDoItem: ToDoType = toDoItemById.item;

    const completeState = !toDoItem.completeStatus;
    swapToDoCheckBoxIcon(completeState);

    toDoListManageObj.updateToDoCompleteStatusById(toDoListManageObj, id, completeState);
    toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDoListManageObj, noteListManageObj, sideBarManageObj);
};

const toDoDeleteBtnHandler = (
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    id: string,
): void => {
    toDoListManageObj.deleteToDoItemById(true, toDoListManageObj, id);
    toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDoListManageObj, noteListManageObj, sideBarManageObj);
    sideBarListScreenHandler(sideBarList, toDoListManageObj, noteListManageObj, sideBarManageObj);
};

const noteCardDeleteBtnHandler = (
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    id: string,
): void => {
    noteListManageObj.deleteNoteItemById(true, noteListManageObj, id);
    noteCardsListScreenRenderer(todoWrapper, notesWrapper, toDoListManageObj, noteListManageObj, sideBarManageObj);
    sideBarListScreenHandler(sideBarList, toDoListManageObj, noteListManageObj, sideBarManageObj);
};

const detailsModalContextHandler = (
    toDoItem: ToDoType,
    detailModalHeading: HTMLHeadingElement,
    detailModalContentWrapper: Element,
): void => {
    detailModalHeading.innerText = toDoItem.title;
    detailModalContentWrapper.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const DOMdetailModalContentHeading: HTMLHeadingElement = document.createElement('h4');
        DOMdetailModalContentHeading.classList.add('detailModalContentHeading');
        const DOMdetailModalContent: HTMLParagraphElement = document.createElement('p');
        DOMdetailModalContent.classList.add('detailModalContent');

        if (i === 0) {
            DOMdetailModalContentHeading.innerText = 'Title';
            DOMdetailModalContent.innerText = toDoItem.title;
        } else if (i === 1) {
            DOMdetailModalContentHeading.innerText = 'Details';
            DOMdetailModalContent.innerText = toDoItem.detail;
        } else if (i === 2) {
            DOMdetailModalContentHeading.innerText = 'Due date';
            DOMdetailModalContent.innerText = toDoItem.dueDate;
        } else if (i === 3) {
            DOMdetailModalContentHeading.innerText = 'Priority';
            DOMdetailModalContent.innerText = toDoItem.priority;
        }
        detailModalContentWrapper.appendChild(DOMdetailModalContentHeading);
        detailModalContentWrapper.appendChild(DOMdetailModalContent);
    }
};

const sideBarItemClickHandler = (
    sideBarClickType: string = 'personal',
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
): void => {
    if (sideBarClickType === 'notes') {
        noteCardsListScreenRenderer(todoWrapper, notesWrapper, toDoListManageObj, noteListManageObj, sideBarManageObj);
    } else {
        toDoCardsListScreenRenderer(
            todoWrapper,
            notesWrapper,
            toDoListManageObj,
            noteListManageObj,
            sideBarManageObj,
            sideBarClickType,
        );
    }
    sideBarListScreenHandler(sideBarList, toDoListManageObj, noteListManageObj, sideBarManageObj, sideBarClickType);
};

const toDoDetailBtnHandler = (action: ToDoCardActionType, toDoListManageObj: ToDoListManageObjType, id: string) => {
    const toDoCardDetailsById: ToDoItemByIdType | null = toDoListManageObj.getToDoItemById(toDoListManageObj, id);

    if (!toDoCardDetailsById) {
        alert('Cannot view details of this To Do right now. Please try again later');
        return;
    }

    const toDoCardDetails = toDoCardDetailsById.item;
    // console.log(toDoCardDetails);

    detailsModalContextHandler(toDoCardDetails, detailModalHeading, detailModalContentWrapper);
    modalPartsDisplayStatesHandler(
        action,
        toDoCardDetails.type,
        addEditItemFormModal,
        addEditModalDetailLabel,
        addEditModalDetailInp,
        addEditModalBodyBottom,
        detailModal,
    );
    showModal(modalWrapper);
};

const toDoEditBtnHandler = (
    action: ToDoCardActionType,
    toDoListManageObj: ToDoListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    id: string,
) => {
    const toDoCardById: ToDoItemByIdType | null = toDoListManageObj.getToDoItemById(toDoListManageObj, id);

    if (!toDoCardById) {
        console.warn(`No to do item with id ${id} found`);
        alert('Cannot edit this To Do right now. Please try again later');
        return;
    }

    const toDoCardDetails = toDoCardById.item;
    // console.log(toDoCardDetails);

    formModalBaseTextContentHandler(
        action,
        toDoCardDetails.type,
        addEditItemFormModal,
        addEditModalHeadingAction,
        addEditModalHeadingType,
        addEditModalBtnAction,
        addEditModalBtnType,
    );
    formModalMainTextContentHandler(
        action,
        sideBarManageObj,
        toDoCardDetails,
        addEditItemFormModal,
        addEditModalTitleInp,
        addEditModalDetailInp,
        addEditModalDateInp,
        addEditModalProjectSelectInp,
        modalPriorityBtnLow,
        modalPriorityBtnMedium,
        modalPriorityBtnHigh,
    );
    modalPartsDisplayStatesHandler(
        action,
        toDoCardDetails.type,
        addEditItemFormModal,
        addEditModalDetailLabel,
        addEditModalDetailInp,
        addEditModalBodyBottom,
        detailModal,
    );
    showModal(modalWrapper);
};

const showModal = (modalWrapper: Element) => {
    if (!modalWrapper.classList.contains('show')) {
        modalWrapper.classList.add('show');
    }
};

const hideModal = (sideBarManageObj: SideBarManageObjType, modalWrapper: Element) => {
    if (modalWrapper.classList.contains('show')) {
        resetFormModalMainTextContent(
            sideBarManageObj,
            addEditItemFormModal,
            addEditModalTitleInp,
            addEditModalDetailInp,
            addEditModalDateInp,
            addEditModalProjectSelectInp,
            modalPriorityBtnLow,
            modalPriorityBtnMedium,
            modalPriorityBtnHigh,
        );
        modalWrapper.classList.remove('show');
    }
};

// RENDER TO SCREEN FUNCTIONS AND THEIR RELATED LOGICAL FUNCTIONS
const sideBarListScreenHandler = (
    DOMsideBar: Element,
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    sideBarActiveCategory = 'home',
): void => {
    DOMsideBar.innerHTML = '';
    sideBarManageObj.updateSideBarNumber();
    sideBarManageObj.getSideBarItemsList().forEach((sideBarItem: SideBarItemType): void => {
        const DOMsideItem: HTMLLIElement = document.createElement('li');
        DOMsideItem.classList.add('sideItem');
        if (sideBarItem.text === sideBarActiveCategory) {
            DOMsideItem.classList.add('active');
        }
        DOMsideItem.dataset.type = `${sideBarItem.text}`;
        DOMsideItem.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            sideBarItemClickHandler(this.dataset.type, toDoListManageObj, noteListManageObj, sideBarManageObj);
        });

        const DOMsideItemContentWrapper: HTMLSpanElement = document.createElement('div');
        DOMsideItemContentWrapper.classList.add('sideItemContentWrapper');
        // DOMsideItemContentWrapper.dataset.type = `${sideBarItem.text}`;
        const DOMsideItemText: HTMLSpanElement = document.createElement('span');
        DOMsideItemText.classList.add('sideItemText');
        DOMsideItemText.innerText = sideBarItem.text;
        const DOMsideItemNumber: HTMLSpanElement = document.createElement('span');
        DOMsideItemNumber.classList.add('sideItemNumber');
        DOMsideItemNumber.innerText = `${sideBarItem.number}`;

        DOMsideItemContentWrapper.appendChild(DOMsideItemText);
        DOMsideItemContentWrapper.appendChild(DOMsideItemNumber);
        DOMsideItem.appendChild(DOMsideItemContentWrapper);

        if (sideBarItem.hasOwnProperty('child')) {
            const DOMsideProjectList: HTMLUListElement = document.createElement('ul');
            DOMsideProjectList.classList.add('sideProjectList');

            const sideBarChildList: SideBarItemBaseType[] | undefined = sideBarItem.child;

            if (!sideBarChildList) return;

            sideBarChildList.forEach((projectItem) => {
                const DOMsideProjectItem: HTMLLIElement = document.createElement('li');
                DOMsideProjectItem.classList.add('sideProjectItem');
                DOMsideProjectItem.dataset.type = `${projectItem.text}`;
                if (projectItem.text === sideBarActiveCategory) {
                    DOMsideProjectItem.classList.add('active');
                }
                DOMsideProjectItem.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    sideBarItemClickHandler(this.dataset.type, toDoListManageObj, noteListManageObj, sideBarManageObj);
                });

                const DOMprojectItemText: HTMLSpanElement = document.createElement('span');
                DOMprojectItemText.classList.add('projectItemText');
                DOMprojectItemText.innerText = projectItem.text;
                const DOMprojectItemNumber: HTMLSpanElement = document.createElement('span');
                DOMprojectItemNumber.classList.add('projectItemNumber');
                DOMprojectItemNumber.innerText = `${projectItem.number}`;

                DOMsideProjectItem.appendChild(DOMprojectItemText);
                DOMsideProjectItem.appendChild(DOMprojectItemNumber);
                DOMsideProjectList.appendChild(DOMsideProjectItem);
            });

            DOMsideItem.appendChild(DOMsideProjectList);
        }

        DOMsideBar.appendChild(DOMsideItem);
    });
};

const toDoCardRenderer = (
    parentElement: Element,
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    toDoCardId: string,
    todoCardPriority: DOMtodoCardPriorityType,
    toDoCardState: DOMtoDoCardStateType,
    tCardCheckBoxBlankState: DOMtCardCheckBoxBlankStateType,
    tCardCheckBoxCheckedState: DOMtCardCheckBoxCheckedStateType,
    toDoCardTitle: string,
    toDoCardDueDate: string,
): void => {
    const DOMtodoCard: HTMLDivElement = document.createElement('div');
    DOMtodoCard.classList.add('todoCard');
    DOMtodoCard.dataset.id = `${toDoCardId}`;

    // Add priority style to card (low, medium, high)
    if (todoCardPriority !== '' && todoCardPriority !== undefined && todoCardPriority !== null) {
        DOMtodoCard.classList.add(`${todoCardPriority}`);
    }

    // Add done status to card if true
    if (toDoCardState !== '' && toDoCardState !== undefined && toDoCardState !== null) {
        DOMtodoCard.classList.add(`${toDoCardState}`);
    }

    // To Do card left side
    const DOMtCardLeft = document.createElement('div');
    DOMtCardLeft.classList.add('tCardLeft');
    const DOMtCardCheckBoxWrapper: HTMLDivElement = document.createElement('div');
    DOMtCardCheckBoxWrapper.classList.add('tCardCheckBoxWrapper');
    DOMtCardCheckBoxWrapper.dataset.id = `${toDoCardId}`;
    DOMtCardCheckBoxWrapper.addEventListener('click', function (e: Event): void {
        const target = e.currentTarget as HTMLDivElement | null;

        if (!target || !target.dataset.id) {
            console.warn('Cannot render this to do card now');
            return;
        }

        const targetId: string = target.dataset.id;

        toDoCheckBoxBtnHandler(toDoListManageObj, noteListManageObj, sideBarManageObj, targetId);
    });
    const DOMtCardCheckBoxBlank: string = SVGIconTemplate().tCardCheckBoxBlank(tCardCheckBoxBlankState);
    const DOMtCardCheckBoxChecked: string = SVGIconTemplate().tCardCheckBoxChecked(tCardCheckBoxCheckedState);
    const DOMtCardHeading: HTMLHeadingElement = document.createElement('h4');
    DOMtCardHeading.classList.add('tCardHeading');
    DOMtCardHeading.innerText = toDoCardTitle;

    // Card right side + right side detail element
    const DOMtCardRight: HTMLDivElement = document.createElement('div');
    DOMtCardRight.classList.add('tCardRight');
    const DOMtCardDetailsWrapper: HTMLDivElement = document.createElement('div');
    DOMtCardDetailsWrapper.classList.add('tCardDetailsWrapper');
    DOMtCardDetailsWrapper.dataset.id = `${toDoCardId}`;
    DOMtCardDetailsWrapper.dataset.action = 'detail' as ToDoCardActionType;
    DOMtCardDetailsWrapper.addEventListener('click', function (e: Event): void {
        const target = e.currentTarget as HTMLDivElement | null;

        if (!target || !target.dataset.action || !target.dataset.id) {
            console.warn('Cannot see the detail of this to do.');
            alert('Cannot see the detail of this to do.');
            return;
        }

        const targetAction = target.dataset.action as ToDoCardActionType;
        const targetId: string = target.dataset.id;

        toDoDetailBtnHandler(targetAction, toDoListManageObj, targetId);
    });
    const DOMtCardDetailsIcon: string = SVGIconTemplate().tCardDetailsIcon('');
    const DOMtCardDetailsText: HTMLSpanElement = document.createElement('span');
    DOMtCardDetailsText.classList.add('tCardDetailsText', 'hidden');
    DOMtCardDetailsText.innerText = 'Details';

    const DOMtCardDate: HTMLSpanElement = document.createElement('span');
    DOMtCardDate.classList.add('tCardDate');
    if (toDoCardDueDate === '') {
        DOMtCardDate.innerText = 'No Due-date';
    } else {
        DOMtCardDate.innerText = format(toDoCardDueDate, 'iii - MMM do yyy');
    }
    const DOMtCardEditWrapper: HTMLDivElement = document.createElement('div');
    DOMtCardEditWrapper.classList.add('tCardEditWrapper');
    DOMtCardEditWrapper.dataset.id = `${toDoCardId}`;
    DOMtCardEditWrapper.dataset.action = 'edit';
    DOMtCardEditWrapper.addEventListener('click', function (e: Event): void {
        const target = e.currentTarget as HTMLDivElement | null;

        if (!target || !target.dataset.action || !target.dataset.id) {
            console.warn('Cannot edit this to do.');
            alert('Cannot edit this to do.');
            return;
        }

        const targetAction = target.dataset.action as ToDoCardActionType;
        const targetId: string = target.dataset.id;

        toDoEditBtnHandler(targetAction, toDoListManageObj, sideBarManageObj, targetId);
    });
    const DOMtCardEditIcon: string = SVGIconTemplate().tCardEditIcon();

    const DOMtCardDeleteWrapper: HTMLDivElement = document.createElement('div');
    DOMtCardDeleteWrapper.classList.add('tCardDeleteWrapper');
    DOMtCardDeleteWrapper.dataset.id = `${toDoCardId}`;
    DOMtCardDeleteWrapper.addEventListener('click', function (e: Event): void {
        const target = e.currentTarget as HTMLDivElement | null;

        if (!target || !target.dataset.id) {
            console.warn('Cannot delete this to do.');
            alert('Cannot delete this to do.');
            return;
        }

        const targetId: string = target.dataset.id;

        toDoDeleteBtnHandler(toDoListManageObj, noteListManageObj, sideBarManageObj, targetId);
    });
    const DOMtCardDeleteIconBlank: string = SVGIconTemplate().tCardDeleteIconBlank();
    const DOMtCardDeleteIconFull: string = SVGIconTemplate().tCardDeleteIconFull();

    // Append to Left side of card
    DOMtCardCheckBoxWrapper.insertAdjacentHTML('afterbegin', DOMtCardCheckBoxBlank);
    DOMtCardCheckBoxWrapper.insertAdjacentHTML('beforeend', DOMtCardCheckBoxChecked);
    DOMtCardLeft.appendChild(DOMtCardCheckBoxWrapper);
    DOMtCardLeft.appendChild(DOMtCardHeading);
    DOMtodoCard.appendChild(DOMtCardLeft);

    // Append child to right side of card
    DOMtCardDetailsWrapper.insertAdjacentHTML('afterbegin', DOMtCardDetailsIcon);
    DOMtCardDetailsWrapper.appendChild(DOMtCardDetailsText);
    DOMtCardRight.appendChild(DOMtCardDetailsWrapper);
    DOMtCardRight.appendChild(DOMtCardDate);
    DOMtCardEditWrapper.insertAdjacentHTML('afterbegin', DOMtCardEditIcon);
    DOMtCardRight.appendChild(DOMtCardEditWrapper);
    DOMtCardDeleteWrapper.insertAdjacentHTML('afterbegin', DOMtCardDeleteIconBlank);
    DOMtCardDeleteWrapper.insertAdjacentHTML('beforeend', DOMtCardDeleteIconFull);
    DOMtCardRight.appendChild(DOMtCardDeleteWrapper);
    DOMtodoCard.appendChild(DOMtCardRight);

    parentElement.appendChild(DOMtodoCard);
};

const toDoCardsListScreenRenderer = (
    DOMtodoWrapper: Element,
    DOMnotesWrapper: Element,
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    renderCategoryType: string = 'home',
): void => {
    if (DOMnotesWrapper.classList.contains('show')) {
        DOMnotesWrapper.classList.remove('show');
    }
    DOMtodoWrapper.classList.add('show');
    DOMtodoWrapper.innerHTML = '';

    const sideBarProjectItemsList: string[] | null = sideBarManageObj.getSideBarProjectItemsList();

    if (renderCategoryType.toLowerCase() === 'home' || renderCategoryType.toLowerCase() === 'project') {
        toDoListManageObj.getToDoList().forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
                toDoListManageObj,
                noteListManageObj,
                sideBarManageObj,
                toDoItem.id,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtodoCardPriority,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtoDoCardState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxBlankState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxCheckedState,
                toDoItem.title,
                toDoItem.dueDate,
            );
        });
    } else if (renderCategoryType.toLowerCase() === 'today') {
        sideBarManageObj.getTodayValue().list.forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
                toDoListManageObj,
                noteListManageObj,
                sideBarManageObj,
                toDoItem.id,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtodoCardPriority,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtoDoCardState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxBlankState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxCheckedState,
                toDoItem.title,
                toDoItem.dueDate,
            );
        });
    } else if (renderCategoryType.toLowerCase() === 'week') {
        sideBarManageObj.getWeekValue().list.forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
                toDoListManageObj,
                noteListManageObj,
                sideBarManageObj,
                toDoItem.id,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtodoCardPriority,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtoDoCardState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxBlankState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxCheckedState,
                toDoItem.title,
                toDoItem.dueDate,
            );
        });
    }

    if (!sideBarProjectItemsList || !Array.isArray(sideBarProjectItemsList)) return;
    if (sideBarProjectItemsList.includes(renderCategoryType.toLowerCase())) {
        // console.log(toDoList.getToDoListByCategory(renderCategoryType.toLowerCase()));
        toDoListManageObj.getToDoListByCategory(renderCategoryType.toLowerCase()).forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
                toDoListManageObj,
                noteListManageObj,
                sideBarManageObj,
                toDoItem.id,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtodoCardPriority,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtoDoCardState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxBlankState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxCheckedState,
                toDoItem.title,
                toDoItem.dueDate,
            );
        });
    }
};

const noteCardRenderer = (
    parentElement: Element,
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    noteCardId: string,
    noteCardTittle: string,
    noteCardDetail: string,
) => {
    const DOMnoteCard: HTMLDivElement = document.createElement('div');
    DOMnoteCard.classList.add('noteCard');
    DOMnoteCard.dataset.id = `${noteCardId}`;
    const DOMnoteCardHeaderWrapper: HTMLDivElement = document.createElement('div');
    DOMnoteCardHeaderWrapper.classList.add('noteCardHeaderWrapper');
    const DOMnoteHeading: HTMLHeadingElement = document.createElement('h2');
    DOMnoteHeading.classList.add('noteHeading');
    DOMnoteHeading.innerText = noteCardTittle;
    DOMnoteHeading.setAttribute('contenteditable', 'true');

    const DOMnoteCardCloseBtnWrapper: HTMLDivElement = document.createElement('div');
    DOMnoteCardCloseBtnWrapper.classList.add('noteCardCloseBtnWrapper');
    DOMnoteCardCloseBtnWrapper.dataset.id = `${noteCardId}`;
    const DOMnoteCloseBtnIcon: string = SVGIconTemplate().noteCloseBtnIcon();
    DOMnoteCardCloseBtnWrapper.addEventListener('click', function (e: Event): void {
        const target = e.currentTarget as HTMLDivElement | null;

        if (!target || !target.dataset.id) {
            console.warn('Cannot render this note card now');
            return;
        }

        const targetId: string = target.dataset.id;

        noteCardDeleteBtnHandler(toDoListManageObj, noteListManageObj, sideBarManageObj, targetId);
    });

    const DOMnoteCardContentWrapper: HTMLDivElement = document.createElement('div');
    DOMnoteCardContentWrapper.classList.add('noteCardContentWrapper');
    const DOMnoteCardContent: HTMLParagraphElement = document.createElement('p');
    DOMnoteCardContent.classList.add('noteCardContent');
    DOMnoteCardContent.innerText = noteCardDetail;
    DOMnoteCardContent.setAttribute('contenteditable', 'true');

    // Append child to card
    DOMnoteCardCloseBtnWrapper.insertAdjacentHTML('afterbegin', DOMnoteCloseBtnIcon);
    DOMnoteCardHeaderWrapper.appendChild(DOMnoteHeading);
    DOMnoteCardHeaderWrapper.appendChild(DOMnoteCardCloseBtnWrapper);
    DOMnoteCardContentWrapper.appendChild(DOMnoteCardContent);

    DOMnoteCard.appendChild(DOMnoteCardHeaderWrapper);
    DOMnoteCard.appendChild(DOMnoteCardContentWrapper);
    parentElement.appendChild(DOMnoteCard);
};

const noteCardsListScreenRenderer = (
    DOMtodoWrapper: Element,
    DOMnotesWrapper: Element,
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
) => {
    if (DOMtodoWrapper.classList.contains('show')) {
        DOMtodoWrapper.classList.remove('show');
    }
    DOMnotesWrapper.classList.add('show');
    DOMnotesWrapper.innerHTML = '';
    noteListManageObj.getNotesList().forEach((noteItem: NoteType): void => {
        noteCardRenderer(
            DOMnotesWrapper,
            toDoListManageObj,
            noteListManageObj,
            sideBarManageObj,
            noteItem.id,
            noteItem.title,
            noteItem.detail,
        );
    });
};

export {
    sideBarListScreenHandler,
    toDoCardsListScreenRenderer,
    noteCardsListScreenRenderer,
    showModal,
    hideModal,
    formModalBaseTextContentHandler,
    modalPartsDisplayStatesHandler,
};
