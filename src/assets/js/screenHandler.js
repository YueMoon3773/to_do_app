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

// STATES HANDLER FUNCTIONS
const modalStates = [
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

const getModalStates = () => {
    return modalStates;
};

const modalPartsDisplayStatesHandler = (
    action,
    type,
    formModal,
    formModalDetailLabel,
    formModalDetailInp,
    formModalBodyBottom,
    detailModal,
) => {
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

const toDoCardStatesHandler = (toDoCompleteStatus, toDoPriority) => {
    let DOMtodoCardPriority = 'importantLow';
    let DOMtoDoCardState = 'done';
    let DOMtCardCheckBoxBlankState = 'show';
    let DOMtCardCheckBoxCheckedState = 'show';

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
    action,
    type,
    formModal,
    formHeadingAction,
    formHeadingType,
    formFooterBtnAction,
    formFooterBtnType,
) => {
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
    action = '',
    sideBar,
    toDoItem,
    addEditItemFormModal,
    addEditModalTitleInp,
    addEditModalDetailInp,
    addEditModalDateInp,
    addEditModalProjectSelectInp,
    modalPriorityBtnLow,
    modalPriorityBtnMedium,
    modalPriorityBtnHigh,
) => {
    resetFormModalMainTextContent(
        sideBar,
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
    formModalProjectCategoryLoader(sideBar, toDoItem.category, addEditModalProjectSelectInp);

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
        const DOMhiddenIdInp = document.createElement('input');
        DOMhiddenIdInp.type = 'hidden';
        DOMhiddenIdInp.classList.add('hiddenIdInp');
        DOMhiddenIdInp.value = toDoItem.id;
        DOMhiddenIdInp.name = 'hiddenIdInp';

        const DOMhiddenCompleteStatusInp = document.createElement('input');
        DOMhiddenCompleteStatusInp.type = 'hidden';
        DOMhiddenCompleteStatusInp.classList.add('hiddenCompleteStatusInp');
        DOMhiddenCompleteStatusInp.value = toDoItem.completeStatus;
        DOMhiddenCompleteStatusInp.name = 'hiddenCompleteStatusInp';

        addEditItemFormModal.appendChild(DOMhiddenIdInp);
        addEditItemFormModal.appendChild(DOMhiddenCompleteStatusInp);
    }
};

const formModalProjectCategoryLoader = (sideBarProjectsList, toDoCategory = '', addEditModalProjectSelectInp) => {
    addEditModalProjectSelectInp.innerHTML = '';
    const projectCategoryList = sideBarProjectsList.getSideBarProjectItemsList();

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
    sideBarProjectsList,
    addEditItemFormModal,
    addEditModalTitleInp,
    addEditModalDetailInp,
    addEditModalDateInp,
    addEditModalProjectSelectInp,
    modalPriorityBtnLow,
    modalPriorityBtnMedium,
    modalPriorityBtnHigh,
) => {
    addEditModalTitleInp.value = '';
    addEditModalDetailInp.value = '';
    addEditModalDateInp.value = '';

    addEditModalProjectSelectInp.innerHTML = '';
    const projectCategoryList = sideBarProjectsList.getSideBarProjectItemsList();

    for (let i = 0; i < projectCategoryList.length; i++) {
        const DOMaddEditModalProjectOption = document.createElement('option');
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
    const DOMhiddenIdInp = document.querySelector('.addEditItemFormModal .hiddenIdInp');
    const DOMhiddenCompleteStatusInp = document.querySelector('.addEditItemFormModal .hiddenCompleteStatusInp');
    if (DOMhiddenIdInp) {
        addEditItemFormModal.removeChild(DOMhiddenIdInp);
    }
    if (DOMhiddenCompleteStatusInp) {
        addEditItemFormModal.removeChild(DOMhiddenCompleteStatusInp);
    }
};

const detailsModalContextHandler = (toDoItem, detailModalHeading, detailModalContentWrapper) => {
    detailModalHeading.innerText = toDoItem.title;
    detailModalContentWrapper.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const DOMdetailModalContentHeading = document.createElement('h4');
        DOMdetailModalContentHeading.classList.add('detailModalContentHeading');
        const DOMdetailModalContent = document.createElement('p');
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

const sideBarItemClickHandler = (sideBarClickType = 'personal', toDo, notes, sideBar) => {
    if (sideBarClickType === 'notes') {
        noteCardsListScreenRenderer(todoWrapper, notesWrapper, notes);
    } else {
        toDoCardsListScreenRenderer(todoWrapper, notesWrapper, toDo, sideBar, sideBarClickType);
    }
    sideBarListScreenHandler(sideBarList, toDo, notes, sideBar, sideBarClickType);
};

const toDoCheckBoxBtnHandler = (toDoList, id) => {};

const toDoDetailBtnHandler = (action, toDoList, id) => {
    const toDoCardDetails = toDoList.getToDoItemById(toDoList, id).item;
    // console.log(toDoCardDetails);

    if (toDoCardDetails === undefined) {
        alert('Cannot view details of this To Do right now. Please try again later');
        return;
    } else {
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
    }
};

const toDoEditBtnHandler = (action, toDoList, sideBar, id) => {
    const toDoCardDetails = toDoList.getToDoItemById(toDoList, id).item;
    // console.log(toDoCardDetails);

    if (toDoCardDetails === undefined) {
        alert('Cannot edit this To Do right now. Please try again later');
        return;
    } else {
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
            sideBar,
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
    }
};

const toDoDeleteBtnHandler = (toDoList, id) => {};

const noteCardDeleteBtnHandler = () => {};

const showModal = (modalWrapper) => {
    if (!modalWrapper.classList.contains('show')) {
        modalWrapper.classList.add('show');
    }
};

const hideModal = (sideBar, modalWrapper) => {
    if (modalWrapper.classList.contains('show')) {
        resetFormModalMainTextContent(
            sideBar,
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
const sideBarListScreenHandler = (DOMsideBar, toDo, notes, sideBar, sideBarActiveCategory = 'home') => {
    DOMsideBar.innerHTML = '';
    sideBar.updateSideBarNumber();
    sideBar.getSideBarItemsList().forEach((sideBarItem) => {
        const DOMsideItem = document.createElement('li');
        DOMsideItem.classList.add('sideItem');
        if (sideBarItem.text === sideBarActiveCategory) {
            DOMsideItem.classList.add('active');
        }
        DOMsideItem.dataset.type = `${sideBarItem.text}`;
        DOMsideItem.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            sideBarItemClickHandler(this.dataset.type, toDo, notes, sideBar);
        });

        const DOMsideItemContentWrapper = document.createElement('div');
        DOMsideItemContentWrapper.classList.add('sideItemContentWrapper');
        // DOMsideItemContentWrapper.dataset.type = `${sideBarItem.text}`;
        const DOMsideItemText = document.createElement('span');
        DOMsideItemText.classList.add('sideItemText');
        DOMsideItemText.innerText = sideBarItem.text;
        const DOMsideItemNumber = document.createElement('span');
        DOMsideItemNumber.classList.add('sideItemNumber');
        DOMsideItemNumber.innerText = sideBarItem.number;

        DOMsideItemContentWrapper.appendChild(DOMsideItemText);
        DOMsideItemContentWrapper.appendChild(DOMsideItemNumber);
        DOMsideItem.appendChild(DOMsideItemContentWrapper);

        if (sideBarItem.hasOwnProperty('child')) {
            const DOMsideProjectList = document.createElement('ul');
            DOMsideProjectList.classList.add('sideProjectList');

            sideBarItem.child.forEach((projectItem) => {
                const DOMsideProjectItem = document.createElement('li');
                DOMsideProjectItem.classList.add('sideProjectItem');
                DOMsideProjectItem.dataset.type = `${projectItem.text}`;
                if (projectItem.text === sideBarActiveCategory) {
                    DOMsideProjectItem.classList.add('active');
                }
                DOMsideProjectItem.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    sideBarItemClickHandler(this.dataset.type, toDo, notes, sideBar);
                });

                const DOMprojectItemText = document.createElement('span');
                DOMprojectItemText.classList.add('projectItemText');
                DOMprojectItemText.innerText = projectItem.text;
                const DOMprojectItemNumber = document.createElement('span');
                DOMprojectItemNumber.classList.add('projectItemNumber');
                DOMprojectItemNumber.innerText = projectItem.number;

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
    parentElement,
    toDoList,
    sideBar,
    toDoCardId,
    todoCardPriority,
    toDoCardState,
    tCardCheckBoxBlankState,
    tCardCheckBoxCheckedState,
    toDoCardTitle,
    toDoCardDueDate,
) => {
    const DOMtodoCard = document.createElement('div');
    DOMtodoCard.classList.add('todoCard');
    DOMtodoCard.dataset.id = `${toDoCardId}`;

    // Add priority style to card (low, medium, high)
    if (
        todoCardPriority !== ' ' &&
        todoCardPriority !== '' &&
        todoCardPriority !== undefined &&
        todoCardPriority !== null
    ) {
        DOMtodoCard.classList.add(`${todoCardPriority}`);
    }

    // Add done status to card if true
    if (toDoCardState !== ' ' && toDoCardState !== '' && toDoCardState !== undefined && toDoCardState !== null) {
        DOMtodoCard.classList.add(`${toDoCardState}`);
    }

    // To Do card left side
    const DOMtCardLeft = document.createElement('div');
    DOMtCardLeft.classList.add('tCardLeft');
    const DOMtCardCheckBoxWrapper = document.createElement('div');
    DOMtCardCheckBoxWrapper.classList.add('tCardCheckBoxWrapper');
    DOMtCardCheckBoxWrapper.dataset.id = `${toDoCardId}`;
    DOMtCardCheckBoxWrapper.addEventListener('click', () => {
        toDoCheckBoxBtnHandler();
    });
    const DOMtCardCheckBoxBlank = SVGIconTemplate().tCardCheckBoxBlank(tCardCheckBoxBlankState);
    const DOMtCardCheckBoxChecked = SVGIconTemplate().tCardCheckBoxChecked(tCardCheckBoxCheckedState);
    const DOMtCardHeading = document.createElement('h4');
    DOMtCardHeading.classList.add('tCardHeading');
    DOMtCardHeading.innerText = toDoCardTitle;

    // Card right side + right side detail element
    const DOMtCardRight = document.createElement('div');
    DOMtCardRight.classList.add('tCardRight');
    const DOMtCardDetailsWrapper = document.createElement('div');
    DOMtCardDetailsWrapper.classList.add('tCardDetailsWrapper');
    DOMtCardDetailsWrapper.dataset.id = `${toDoCardId}`;
    DOMtCardDetailsWrapper.dataset.action = 'detail';
    DOMtCardDetailsWrapper.addEventListener('click', function () {
        toDoDetailBtnHandler(this.dataset.action, toDoList, this.dataset.id);
    });
    const DOMtCardDetailsIcon = SVGIconTemplate().tCardDetailsIcon();
    const DOMtCardDetailsText = document.createElement('span');
    DOMtCardDetailsText.classList.add('tCardDetailsText', 'hidden');
    DOMtCardDetailsText.innerText = 'Details';

    const DOMtCardDate = document.createElement('span');
    DOMtCardDate.classList.add('tCardDate');
    if (toDoCardDueDate === '') {
        DOMtCardDate.innerText = 'No Due-date';
    } else {
        DOMtCardDate.innerText = format(toDoCardDueDate, 'iii - MMM do yyy');
    }
    const DOMtCardEditWrapper = document.createElement('div');
    DOMtCardEditWrapper.classList.add('tCardEditWrapper');
    DOMtCardEditWrapper.dataset.id = `${toDoCardId}`;
    DOMtCardEditWrapper.dataset.action = 'edit';
    DOMtCardEditWrapper.addEventListener('click', function () {
        toDoEditBtnHandler(this.dataset.action, toDoList, sideBar, this.dataset.id);
    });
    const DOMtCardEditIcon = SVGIconTemplate().tCardEditIcon();

    const DOMtCardDeleteWrapper = document.createElement('div');
    DOMtCardDeleteWrapper.classList.add('tCardDeleteWrapper');
    DOMtCardDeleteWrapper.dataset.id = `${toDoCardId}`;
    DOMtCardDeleteWrapper.addEventListener('click', function () {
        toDoDeleteBtnHandler(toDoList, this.dataset.id);
    });
    const DOMtCardDeleteIconBlank = SVGIconTemplate().tCardDeleteIconBlank();
    const DOMtCardDeleteIconFull = SVGIconTemplate().tCardDeleteIconFull();

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
    DOMtodoWrapper,
    DOMnotesWrapper,
    toDoList,
    sideBar,
    renderCategoryType = 'home',
    renderCardFunction,
) => {
    if (DOMnotesWrapper.classList.contains('show')) {
        DOMnotesWrapper.classList.remove('show');
    }
    DOMtodoWrapper.classList.add('show');
    DOMtodoWrapper.innerHTML = '';

    const sideBarProjectItemsList = sideBar.getSideBarProjectItemsList();

    if (renderCategoryType.toLowerCase() === 'home' || renderCategoryType.toLowerCase() === 'project') {
        // console.log(toDoList);
        toDoList.getToDoList().forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
                toDoList,
                sideBar,
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
        sideBar.getTodayValue().list.forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
                toDoList,
                sideBar,
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
        sideBar.getWeekValue().list.forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
                toDoList,
                sideBar,
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

    if (sideBarProjectItemsList.includes(renderCategoryType.toLowerCase())) {
        // console.log(toDoList.getToDoListByCategory(renderCategoryType.toLowerCase()));

        toDoList.getToDoListByCategory(renderCategoryType.toLowerCase()).forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
                toDoList,
                sideBar,
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

const noteCardRenderer = (parentElement, noteCardId, noteCardTittle, noteCardDetail) => {
    const DOMnoteCard = document.createElement('div');
    DOMnoteCard.classList.add('noteCard');
    DOMnoteCard.dataset.id = `${noteCardId}`;
    const DOMnoteCardHeaderWrapper = document.createElement('div');
    DOMnoteCardHeaderWrapper.classList.add('noteCardHeaderWrapper');
    const DOMnoteHeading = document.createElement('h2');
    DOMnoteHeading.classList.add('noteHeading');
    DOMnoteHeading.innerText = noteCardTittle;
    DOMnoteHeading.setAttribute('contenteditable', 'true');

    const DOMnoteCardCloseBtnWrapper = document.createElement('div');
    DOMnoteCardCloseBtnWrapper.classList.add('noteCardCloseBtnWrapper');
    const DOMnoteCloseBtnIcon = SVGIconTemplate().noteCloseBtnIcon();
    DOMnoteCardCloseBtnWrapper.addEventListener('click', () => {
        noteCardDeleteBtnHandler();
    });

    const DOMnoteCardContentWrapper = document.createElement('div');
    DOMnoteCardContentWrapper.classList.add('noteCardContentWrapper');
    const DOMnoteCardContent = document.createElement('p');
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

const noteCardsListScreenRenderer = (DOMtodoWrapper, DOMnotesWrapper, notesList) => {
    if (DOMtodoWrapper.classList.contains('show')) {
        DOMtodoWrapper.classList.remove('show');
    }
    DOMnotesWrapper.classList.add('show');
    DOMnotesWrapper.innerHTML = '';
    notesList.getNotesList().forEach((noteItem) => {
        noteCardRenderer(DOMnotesWrapper, noteItem.id, noteItem.title, noteItem.detail);
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
