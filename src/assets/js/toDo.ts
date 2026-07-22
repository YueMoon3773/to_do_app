import { nanoid } from 'nanoid';
import {
    storageAvailable,
    verifyItemExistInStorage,
    saveDataToStorage,
    deleteDataByKeyFromStorage,
} from './localStorageVerify';

export interface ToDoType {
    id: string;
    title: string;
    detail: string;
    dueDate: string;
    priority: string;
    category: string;
    completeStatus: boolean;
    type: 'toDo';
}

interface ToDoItemByIdType {
    item: ToDoType;
    index: number;
}

export interface ToDoListManageObjType {
    getToDoList: () => ToDoType[];
    getToDoListByCategory: (category: string) => ToDoType[];
    getToDoItemById: (toDoListManageObj: ToDoListManageObjType, id: string) => ToDoItemByIdType | null;
    updateToDoCompleteStatusById: (
        toDoListManageObj: ToDoListManageObjType,
        id: string,
        completeStatus: boolean,
    ) => void;
    updateToDoItemById: (
        toDoListManageObj: ToDoListManageObjType,
        id: string,
        completeStatus: 'true' | 'false' | boolean,
        toDoItem: ToDoType,
    ) => void;
    resetToDoList: () => void;
    deleteToDoItemById: (deleteItemFromStorage: boolean, toDoListManageObj: ToDoListManageObjType, id: string) => void;
    initializeToDoList: () => void;
    addItemToToDoList: (saveItemToStorage: boolean, toDoItem: ToDoType) => void;
}

const createToDo = (
    title: string,
    detail: string = '',
    dueDate: string = '',
    priority: string = '',
    category: string = '',
    completeStatus: boolean = false,
): ToDoType => {
    const toDo: ToDoType = {
        id: 'that_to_do_app' + nanoid(),
        title,
        detail,
        dueDate,
        priority,
        category,
        completeStatus,
        type: 'toDo',
    };

    return { ...toDo };
};

const toDoListManage = () => {
    const sampleToDoList: ToDoType[] = [
        createToDo(
            'Go shopping',
            "Buy this; that; these and those. Don't forget to buy it also",
            '2025-06-06',
            'medium',
            'personal',
            false,
        ),
        createToDo(
            'Learn Flex',
            'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            '2028-04-24',
            'high',
            'css',
            false,
        ),
        createToDo(
            'Go jogging',
            "Do this; that; these and those. Don't forget to do it also",
            '2025-06-17',
            'high',
            'personal',
            true,
        ),
        createToDo(
            'Links and Images',
            'culpa qui officia deserunt mollit anim id est laborum.',
            '2028-12-22',
            'medium',
            'html',
            false,
        ),
        createToDo('Buy that charger', '', '2025-08-06', 'low', 'personal', false),
        createToDo(
            'Functions basic',
            'occaecat cupidatat non proident, sunt in culpa qui',
            '2027-11-05',
            'medium',
            'javascript',
            true,
        ),
        createToDo(
            'Factory functions',
            'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
            '2025-05-15',
            'high',
            'javascript',
            false,
        ),
        createToDo(
            'Learn Grid',
            'exercitation ullamco laboris nisi ut aliquip ex ea',
            '2026-03-14',
            'low',
            'css',
            true,
        ),
        createToDo(
            'Working with text',
            'incididunt ut labore et dolore magna aliqua. Ut enim ad',
            '2025-06-19',
            'low',
            'html',
            true,
        ),
        createToDo(
            'html Boilerplate',
            'aute irure dolor in reprehenderit in voluptate velit',
            '2025-11-08',
            'medium',
            'html',
            false,
        ),
        createToDo(
            'List',
            'nostrud exercitation ullamco laboris nisi ut aliquip ex',
            '2029-02-25',
            'high',
            'html',
            true,
        ),
        createToDo(
            'The box model',
            'incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
            '2027-10-16',
            'medium',
            'css',
            false,
        ),
        createToDo('Alignment', 'ullamco laboris nisi ut aliquip ex ea commodo', '2029-11-18', 'low', 'css', false),
        createToDo(
            'Flex Axes',
            'consequat. Duis aute irure dolor in reprehenderit in voluptate',
            '2025-09-06',
            'high',
            'css',
            false,
        ),
        createToDo('SVG', 'eu fugiat nulla pariatur. Excepteur sint occaecat', '2030-05-17', 'low', 'html', true),
        createToDo(
            'css funtions',
            'velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint',
            '2029-03-08',
            'medium',
            'css',
            false,
        ),
        createToDo(
            'Loops and Arrays',
            'aute irure dolor in reprehenderit in voluptate velit esse',
            '2026-03-08',
            'low',
            'javascript',
            false,
        ),
        createToDo(
            'DOM manipulation and events',
            'nostrud exercitation ullamco laboris nisi ut aliquip ex',
            '2025-11-17',
            'high',
            'javascript',
            true,
        ),
        createToDo(
            'Loops and Arrays',
            'aute irure dolor in reprehenderit in voluptate velit esse',
            '2026-03-08',
            'low',
            'javascript',
            false,
        ),
        createToDo(
            'JSON',
            'magna aliqua. Ut enim ad minim veniam, quis nostrud exercit',
            '2025-06-14',
            'high',
            'javascript',
            true,
        ),
        // createToDo(
        //     'JSON',
        //     'magna aliqua. Ut enim ad minim veniam, quis nostrud exercit',
        //     '2026-03-08',
        //     'high',
        //     'test',
        //     true,
        // ),
    ];
    let toDoList: ToDoType[] = [];

    const getSampleToDoList = (): ToDoType[] => {
        return sampleToDoList;
    };

    const getToDoList = (): ToDoType[] => {
        return toDoList;
    };

    const initializeToDoList = (): void | false => {
        // Add sample to do items
        if (getToDoList().length === 0) {
            toDoList = [...getSampleToDoList()];
        }
        //Check Local storage and add to list if storage is ok
        if (!storageAvailable('localStorage')) {
            alert('Failed to add to-do item to storage. Please try again');
            localStorage.clear();
            return false;
        }

        for (let i: number = 0; i < localStorage.length; i++) {
            const key: string | null = localStorage.key(i);

            if (key === null) continue;
            else {
                let localStorageItem: ToDoType;
                try {
                    const rawData: string | null = localStorage.getItem(key);

                    if (rawData === null) continue;
                    else {
                        localStorageItem = JSON.parse(rawData);
                        if (localStorageItem.type === 'toDo') {
                            toDoList.push(localStorageItem);
                        }
                    }
                } catch (err) {
                    console.warn(`Corrupted entry "${key}" removed:`, err);
                    localStorage.removeItem(key);
                    continue;
                }
            }
        }
    };

    const getToDoListByCategory = (category: string = 'personal'): ToDoType[] => {
        let ret: ToDoType[] = getToDoList().filter((toDoItem: ToDoType): boolean => {
            return toDoItem.category === category;
        });
        // console.log('ret: ');
        // console.table(ret);

        return ret;
    };

    const getToDoItemById = (toDoListManageObj: ToDoListManageObjType, id: string): ToDoItemByIdType | null => {
        let itemIndex: number = -99;
        const item: ToDoType | undefined = toDoListManageObj
            .getToDoList()
            .find((toDoItem: ToDoType, index: number): boolean => {
                if (toDoItem.id === id) {
                    itemIndex = index;
                }
                return toDoItem.id === id;
            });

        if (!item) return null;

        const ret: ToDoItemByIdType = {
            item: item,
            index: itemIndex,
        };
        // console.log(ret);

        return ret;
    };

    const updateToDoCompleteStatusById = (
        toDoListManageObj: ToDoListManageObjType,
        id: string,
        completeStatus: boolean = false,
    ): void => {
        const item: ToDoItemByIdType | null = toDoListManageObj.getToDoItemById(toDoListManageObj, id);
        if (item === null) {
            alert('Cannot modify this item right now. Please try again later!');
            return;
        }

        const itemIndex: number = item.index;
        if (itemIndex === -99) {
            alert('Cannot modify this item right now. Please try again later!');
        } else {
            toDoListManageObj.getToDoList()[itemIndex].completeStatus = completeStatus;

            if (verifyItemExistInStorage('localStorage', id)) {
                deleteDataByKeyFromStorage('localStorage', id);
                saveDataToStorage('localStorage', 'toDo', toDoListManageObj.getToDoList()[itemIndex]);
            }
        }
    };

    const updateToDoItemById = (
        toDoListManageObj: ToDoListManageObjType,
        id: string,
        completeStatus: 'true' | 'false' | boolean = false,
        toDoItem: ToDoType,
    ): void => {
        const item: ToDoItemByIdType | null = toDoListManageObj.getToDoItemById(toDoListManageObj, id);

        if (item === null) {
            alert('Cannot modify this item right now. Please try again later!');
            return;
        }

        const itemIndex = item.index;
        if (itemIndex === -99) {
            alert('Cannot modify this item right now. Please try again later!');
        } else {
            let completeState;
            if (completeStatus === 'false') {
                completeState = false;
            } else if (completeStatus === 'true') {
                completeState = true;
            } else {
                completeState = completeStatus;
            }

            toDoListManageObj.getToDoList()[itemIndex].title = toDoItem.title;
            toDoListManageObj.getToDoList()[itemIndex].detail = toDoItem.detail;
            toDoListManageObj.getToDoList()[itemIndex].dueDate = toDoItem.dueDate;
            toDoListManageObj.getToDoList()[itemIndex].priority = toDoItem.priority;
            toDoListManageObj.getToDoList()[itemIndex].category = toDoItem.category;
            toDoListManageObj.getToDoList()[itemIndex].completeStatus = completeState;

            if (verifyItemExistInStorage('localStorage', id)) {
                deleteDataByKeyFromStorage('localStorage', id);
                saveDataToStorage('localStorage', 'toDo', toDoListManageObj.getToDoList()[itemIndex]);
            }
            // console.table(toDoList.getToDoList());
        }
    };

    const resetToDoList = (): void => {
        toDoList = [];
    };

    const addItemToToDoList = (saveItemToStorage: boolean = false, toDoItem: ToDoType): void => {
        let itemToAdd: ToDoType;
        if (
            toDoItem.type === 'toDo' &&
            toDoItem.hasOwnProperty('title') &&
            toDoItem.hasOwnProperty('detail') &&
            toDoItem.hasOwnProperty('dueDate') &&
            toDoItem.hasOwnProperty('priority') &&
            toDoItem.hasOwnProperty('category')
        ) {
            itemToAdd = createToDo(
                toDoItem.title,
                toDoItem.detail,
                toDoItem.dueDate,
                toDoItem.priority,
                toDoItem.category,
            );
            getToDoList().push(itemToAdd);

            if (saveItemToStorage) {
                saveDataToStorage('localStorage', 'toDo', itemToAdd);
            }
        }
        // console.log(itemToAdd);
    };

    const deleteToDoItemById = (
        deleteItemFromStorage: boolean = false,
        toDoListManageObj: ToDoListManageObjType,
        id: string,
    ): void => {
        const item: ToDoItemByIdType | null = toDoListManageObj.getToDoItemById(toDoListManageObj, id);
        // console.log(item.index);

        if (item === null) {
            alert('Cannot modify this item right now. Please try again later!');
            return;
        }

        if (item.index !== -99) {
            toDoListManageObj.getToDoList().splice(item.index, 1);

            if (deleteItemFromStorage) {
                if (verifyItemExistInStorage('localStorage', id)) {
                    deleteDataByKeyFromStorage('localStorage', id);
                }
            }
        }
    };

    return {
        getToDoList,
        getToDoListByCategory,
        getToDoItemById,
        updateToDoCompleteStatusById,
        updateToDoItemById,
        resetToDoList,
        deleteToDoItemById,
        initializeToDoList,
        addItemToToDoList,
    };
};

export { createToDo, toDoListManage };
