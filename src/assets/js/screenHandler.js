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

const sideBarListScreenHandler = (sideBar) => {
    DOMsideBarList.innerHTML = '';
    sideBar.getSideBarListItems().forEach((sideBarItem) => {
        const DOMsideItem = document.createElement('li');
        DOMsideItem.classList.add('sideItem');
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
    title,
    dueDate,
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
    DOMtCardHeading.innerText = title;

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
    DOMtCardDate.innerText = format(dueDate, 'iii - MMM do yyy');
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

const toDoCardsListScreenRenderer = (toDo, renderCategoryType, renderCardFunction) => {
    DOMtodoWrapper.innerHTML = '';
    toDo.getToDoList().forEach((toDoItem, index) => {
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
};

export { sideBarListScreenHandler, toDoCardsListScreenRenderer };
