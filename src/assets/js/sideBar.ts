import { storageAvailable, saveDataToStorage } from './localStorageVerify';

import dateHandler from './datesHandler.js';

import { ToDoType, ToDoListManageObjType } from './toDo';
import { NoteListManageObjType } from './notes';

export interface ProjectChildType {
    text: string;
    number: number;
}

export interface SideBarItemBaseType {
    text: string;
    number: number;
}

export interface SideBarItemType extends SideBarItemBaseType {
    child?: SideBarItemBaseType[];
}

interface TodayAndWeekSideBarItemType {
    number: number;
    list: ToDoType[];
}

export interface SideBarManageObjType {
    getSideBarItemsList: () => SideBarItemType[];
    addSideBarProjectChild: (saveItemToStorage: boolean, projectTitle: string) => void;
    getSideBarProjectItemsList: () => string[] | null;
    getTodayValue: () => TodayAndWeekSideBarItemType;
    getWeekValue: () => TodayAndWeekSideBarItemType;
    initializeSideBarList: () => void | false;
    updateSideBarNumber: () => void;
}

const sideBarManage = (
    toDoManageObj: ToDoListManageObjType,
    noteManageObj: NoteListManageObjType,
): SideBarManageObjType => {
    let sideBarItemsList: SideBarItemType[] = [
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

    const getSideBarItemsList = (): SideBarItemType[] => {
        return sideBarItemsList;
    };

    const addSideBarProjectChild = (saveItemToStorage: boolean = false, projectTitle: string): void => {
        const projectChild: ProjectChildType = {
            text: projectTitle,
            number: 0,
        };

        const sideBarItemWithChild: SideBarItemType | undefined = getSideBarItemsList().find(
            (item: SideBarItemType): boolean => Array.isArray(item.child),
        );

        if (!sideBarItemWithChild || !sideBarItemWithChild.child) return;

        sideBarItemWithChild.child.push(projectChild);

        if (saveItemToStorage) {
            saveDataToStorage('localStorage', 'sideBar', projectChild);
        }
    };

    const getSideBarProjectItemsList = (): string[] | null => {
        let projectInSideBarList: string[] = [];

        const projectItemsInSideBar: SideBarItemType | undefined = getSideBarItemsList().find(
            (item: SideBarItemType): boolean => Array.isArray(item.child),
        );

        if (!projectItemsInSideBar || !projectItemsInSideBar.child) return null;

        projectItemsInSideBar.child.forEach((projectItem: SideBarItemBaseType): void => {
            projectInSideBarList.push(projectItem.text.toLowerCase());
        });
        // console.log(projectInSideBarList);
        return projectInSideBarList;
    };

    const getTodayValue = (): TodayAndWeekSideBarItemType => {
        const ret: TodayAndWeekSideBarItemType = {
            number: 0,
            list: [],
        };

        toDoManageObj.getToDoList().forEach((toDoItem: ToDoType) => {
            if (dateHandler().verifySameDay(toDoItem.dueDate)) {
                ret.number++;
                ret.list.push(toDoItem);
            }
        });
        // console.log(ret);

        return ret;
    };

    const getWeekValue = (): TodayAndWeekSideBarItemType => {
        const ret: TodayAndWeekSideBarItemType = {
            number: 0,
            list: [],
        };

        toDoManageObj.getToDoList().forEach((toDoItem: ToDoType) => {
            if (dateHandler().verifySameWeek(toDoItem.dueDate)) {
                ret.number++;
                ret.list.push(toDoItem);
            }
        });
        // console.log(ret);

        return ret;
    };

    const initializeSideBarList = (): void | false => {
        //Check Local storage and add to list if storage is ok
        if (!storageAvailable('localStorage')) {
            alert('Failed to add to-do item to storage. Please try again');
            localStorage.clear();
            return false;
        }

        for (let i: number = 0; i < localStorage.length; i++) {
            const localStorageKey: string | null = localStorage.key(i);

            if (localStorageKey === null) continue;
            else {
                try {
                    const rawData: string | null = localStorage.getItem(localStorageKey);

                    if (rawData === null) continue;

                    const localStorageItem: SideBarItemType = JSON.parse(rawData);

                    if (localStorageItem.hasOwnProperty('text') && localStorageItem.hasOwnProperty('number')) {
                        addSideBarProjectChild(false, localStorageItem.text);
                        updateSideBarNumber();
                    }
                } catch (err) {
                    console.warn(`Corrupted entry "${localStorageKey}" removed:`, err);
                    localStorage.removeItem(localStorageKey);
                    continue;
                }
            }
        }
    };

    const updateSideBarNumber = (): void => {
        getSideBarItemsList().forEach((sideBarItem: SideBarItemType) => {
            if (sideBarItem.text === 'home') {
                sideBarItem.number = toDoManageObj.getToDoList().length;
            } else if (sideBarItem.text === 'today') {
                sideBarItem.number = getTodayValue().number;
            } else if (sideBarItem.text === 'week') {
                sideBarItem.number = getWeekValue().number;
            } else if (sideBarItem.text === 'notes') {
                sideBarItem.number = noteManageObj.getNotesList().length;
            } else if (sideBarItem.text === 'project') {
                if (!sideBarItem.child) return;

                sideBarItem.number = sideBarItem.child.length;
                sideBarItem.child.forEach((projectItem) => {
                    projectItem.number = toDoManageObj.getToDoListByCategory(projectItem.text).length;
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
