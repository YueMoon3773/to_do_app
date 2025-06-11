import { toDoListManage } from './toDo';
import { notesListManage } from './notes';

import dateHandler from './datesHandler';

const sideBarManage = (toDo, notes) => {
    // const toDo = toDoListManage();
    // const notes = notesListManage();

    let sideBarListItems = [
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

    const getSideBarListItems = () => {
        return sideBarListItems;
    };

    const addSideBarProjectChild = (projectTitle) => {
        const projectChild = {
            text: projectTitle,
            number: 0,
        };

        getSideBarListItems()[3].child.push(projectChild);
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

    const updateSideBarNumber = () => {
        getSideBarListItems().forEach((sideBarItem) => {
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
        // console.log(sideBarListItems);
    };

    // addSideBarProjectChild('test');
    // updateSideBarNumber();
    // console.log(getSideBarListItems());

    return {
        getSideBarListItems,
        addSideBarProjectChild,
        getTodayValue,
        getWeekValue,
        updateSideBarNumber,
    };
};

export default sideBarManage;
