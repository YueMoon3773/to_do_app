import { createToDo, toDoListManage } from './toDo';
import { createNote, notesListManage } from './notes';
import sideBarManage from './sideBar';

// const toDo = toDoListManage();
// const notes = notesListManage();
// const sideBar = sideBarManage();

const DOMsideBarList = document.querySelector('.sideList');

const sideBarScreenHandler = (sideBar) => {
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

export { sideBarScreenHandler };
