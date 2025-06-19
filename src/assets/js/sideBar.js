// import { toDoListManage } from './toDo';
// import { notesListManage } from './notes';
import {
    storageAvailable,
    clearStorage,
    verifyItemExistInStorage,
    saveDataToStorage,
    deleteDataByKeyFromStorage,
} from './localStorageVerify';

import dateHandler from './datesHandler';

const sideBarManage = (toDo, notes) => {
    let sideBarItemsList = [
        {
            text: 'home',
            number: 0,
        },
        {
            text: 'today',
            number: 0,
        },
        {
            text: 'week',
            number: 0,
        },
        {
            text: 'project',
            number: 0,
            child: [
                {
                    text: 'personal',
                    number: 0,
                },
                {
                    text: 'html',
                    number: 0,
                },
                {
                    text: 'javascript',
                    number: 0,
                },
                {
                    text: 'css',
                    number: 0,
                },
            ],
        },
        {
            text: 'notes',
            number: 0,
        },
    ];

    const getSideBarItemsList = () => {
        return sideBarItemsList;
    };

    const addSideBarProjectChild = (saveItemToStorage = false, projectTitle) => {
        const projectChild = {
            text: projectTitle,
            number: 0,
        };
        getSideBarItemsList()[3].child.push(projectChild);

        if (saveItemToStorage) {
            saveDataToStorage('localStorage', 'sideBar', projectChild);
        }
    };

    const getSideBarProjectItemsList = () => {
        let projectItemsList = [];
        getSideBarItemsList()[3].child.forEach((projectItem) => {
            projectItemsList.push(projectItem.text.toLowerCase());
        });
        // console.log(projectItemsList);
        return projectItemsList;
    };

    const getTodayValue = () => {
        const ret = {
            number: 0,
            list: [],
        };

        toDo.getToDoList().forEach((toDoItem, index) => {
            if (dateHandler().verifySameDay(toDoItem.dueDate)) {
                ret.number++;
                ret.list.push(toDoItem);
            }
        });
        // console.log(ret);

        return ret;
    };

    const getWeekValue = () => {
        const ret = {
            number: 0,
            list: [],
        };

        toDo.getToDoList().forEach((toDoItem, index) => {
            if (dateHandler().verifySameWeek(toDoItem.dueDate)) {
                ret.number++;
                ret.list.push(toDoItem);
            }
        });
        // console.log(ret);

        return ret;
    };

    const initializeSideBarList = () => {
        //Check Local storage and add to list if storage is ok
        if (!storageAvailable('localStorage')) {
            alert('Failed to add to-do item to storage. Please try again');
            localStorage.clear();
            return false;
        }

        for (let i = 0; i < localStorage.length; i++) {
            // console.log(localStorage.getItem(localStorage.key(i)));
            // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
            let localStorageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (localStorageItem.hasOwnProperty('text') && localStorageItem.hasOwnProperty('number')) {
                addSideBarProjectChild(false, localStorageItem.text);
                updateSideBarNumber();
            }
        }
    };

    const updateSideBarNumber = () => {
        getSideBarItemsList().forEach((sideBarItem) => {
            if (sideBarItem.text === 'home') {
                sideBarItem.number = toDo.getToDoList().length;
            } else if (sideBarItem.text === 'today') {
                sideBarItem.number = getTodayValue().number;
            } else if (sideBarItem.text === 'week') {
                sideBarItem.number = getWeekValue().number;
            } else if (sideBarItem.text === 'notes') {
                sideBarItem.number = notes.getNotesList().length;
            } else if (sideBarItem.text === 'project') {
                sideBarItem.number = sideBarItem.child.length;
                sideBarItem.child.forEach((projectItem) => {
                    projectItem.number = toDo.getToDoListByCategory(projectItem.text).length;
                });
            }
        });
        // console.log(sideBarItemsList);
    };

    return {
        getSideBarItemsList,
        addSideBarProjectChild,
        getSideBarProjectItemsList,
        getTodayValue,
        getWeekValue,
        initializeSideBarList,
        updateSideBarNumber,
    };
};

export default sideBarManage;
