// import { createToDo, toDoListManage } from './toDo';
// import { createNote, notesListManage } from './notes';
// import sideBarManage from './sideBar';

// const toDo = toDoListManage();
// const notes = notesListManage();
// const sideBar = sideBarManage();

import { format } from 'date-fns';
import SVGIconTemplate from './svgIconTemplate';

const DOMsideBarList = document.querySelector('.sideList');
const DOMtodoWrapper = document.querySelector('.todoWrapper');
const DOMnotesWrapper = document.querySelector('.notesWrapper');

const sideBarListScreenHandler = (sideBar, sideBarActiveCategory = 'home') => {
    DOMsideBarList.innerHTML = '';
    sideBar.getSideBarItemsList().forEach((sideBarItem) => {
        const DOMsideItem = document.createElement('li');
        DOMsideItem.classList.add('sideItem');
        if (sideBarItem.text === sideBarActiveCategory) {
            DOMsideItem.classList.add('active');
        }
        DOMsideItem.dataset.type = `${sideBarItem.text}`;
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

        DOMsideBarList.appendChild(DOMsideItem);
    });
};

const toDoCardRenderer = (
    parentElement,
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
    if (
        todoCardPriority !== ' ' &&
        todoCardPriority !== '' &&
        todoCardPriority !== undefined &&
        todoCardPriority !== null
    ) {
        DOMtodoCard.classList.add(`${todoCardPriority}`);
    }

    if (toDoCardState !== ' ' && toDoCardState !== '' && toDoCardState !== undefined && toDoCardState !== null) {
        DOMtodoCard.classList.add(`${toDoCardState}`);
    }

    // To Do card left side
    const DOMtCardLeft = document.createElement('div');
    DOMtCardLeft.classList.add('tCardLeft');
    const DOMtCardCheckBoxWrapper = document.createElement('div');
    DOMtCardCheckBoxWrapper.classList.add('tCardCheckBoxWrapper');
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
    DOMtCardDetailsWrapper.addEventListener('click', () => {
        toDoDetailBtnHandler();
    });
    const DOMtCardDetailsIcon = SVGIconTemplate().tCardDetailsIcon();
    const DOMtCardDetailsText = document.createElement('span');
    DOMtCardDetailsText.classList.add('tCardDetailsText', 'hidden');
    DOMtCardDetailsText.innerText = 'Details';

    const DOMtCardDate = document.createElement('span');
    DOMtCardDate.classList.add('tCardDate');
    DOMtCardDate.innerText = format(toDoCardDueDate, 'iii - MMM do yyy');
    const DOMtCardEditWrapper = document.createElement('div');
    DOMtCardEditWrapper.classList.add('tCardEditWrapper');
    DOMtCardEditWrapper.addEventListener('click', () => {
        toDoEditBtnHandler();
    });
    const DOMtCardEditIcon = SVGIconTemplate().tCardEditIcon();

    const DOMtCardDeleteWrapper = document.createElement('div');
    DOMtCardDeleteWrapper.classList.add('tCardDeleteWrapper');
    DOMtCardDeleteWrapper.addEventListener('click', () => {
        toDoDeleteBtnHandler();
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

const toDoCardsListScreenRenderer = (toDo, sideBar, renderCategoryType = 'javascript', renderCardFunction) => {
    DOMtodoWrapper.innerHTML = '';

    const sideBarProjectItemsList = sideBar.getSideBarProjectItemsList();
    if (renderCategoryType.toLowerCase() === 'home' || renderCategoryType.toLowerCase() === 'project') {
        toDo.getToDoList().forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
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
                toDoItem.id,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtodoCardPriority,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtoDoCardState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxBlankState,
                toDoCardStatesHandler(toDoItem.completeStatus, toDoItem.priority).DOMtCardCheckBoxCheckedState,
                toDoItem.title,
                toDoItem.dueDate,
            );
        });
    } else if (sideBarProjectItemsList.includes(renderCategoryType.toLowerCase())) {
        toDo.getToDoListByCategory(renderCategoryType.toLowerCase()).forEach((toDoItem) => {
            toDoCardRenderer(
                DOMtodoWrapper,
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

    const DOMnoteCardCloseBtnWrapper = document.createElement('div');
    DOMnoteCardCloseBtnWrapper.classList.add('noteCardCloseBtnWrapper');
    const DOMnoteCloseBtnIcon = SVGIconTemplate().noteCloseBtnIcon();

    const DOMnoteCardContentWrapper = document.createElement('div');
    DOMnoteCardContentWrapper.classList.add('noteCardContentWrapper');
    const DOMnoteCardContent = document.createElement('p');
    DOMnoteCardContent.classList.add('noteCardContent');
    DOMnoteCardContent.innerText = noteCardDetail;

    // Append child to card
    DOMnoteCardCloseBtnWrapper.insertAdjacentHTML('afterbegin', DOMnoteCloseBtnIcon);
    DOMnoteCardHeaderWrapper.appendChild(DOMnoteHeading);
    DOMnoteCardHeaderWrapper.appendChild(DOMnoteCardCloseBtnWrapper);
    DOMnoteCardContentWrapper.appendChild(DOMnoteCardContent);

    DOMnoteCard.appendChild(DOMnoteCardHeaderWrapper);
    DOMnoteCard.appendChild(DOMnoteCardContentWrapper);
    parentElement.appendChild(DOMnoteCard);
};

const noteCardsListScreenRenderer = (notes) => {
    DOMnotesWrapper.innerHTML = '';
    notes.getNotesList().forEach((noteItem) => {
        noteCardRenderer(DOMnotesWrapper, noteItem.id, noteItem.title, noteItem.detail);
    });
};

export { sideBarListScreenHandler, toDoCardsListScreenRenderer, noteCardsListScreenRenderer };
