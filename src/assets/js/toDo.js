import { nanoid } from 'nanoid';
import {
    storageAvailable,
    clearStorage,
    verifyItemExistInStorage,
    saveDataToStorage,
    deleteDataByKeyFromStorage,
} from './localStorageVerify';

const createToDo = (title, detail = '', dueDate = '', priority = '', category = '', completeStatus = false) => {
    const toDo = {
        id: nanoid(),
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
    const sampleToDoList = [
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
    let toDoList = [];

    const getSampleToDoList = () => {
        return sampleToDoList;
    };

    const getToDoList = () => {
        return toDoList;
    };

    const initializeToDoList = () => {
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

        for (let i = 0; i < localStorage.length; i++) {
            let localStorageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (localStorageItem.type === 'toDo') {
                toDoList.push(localStorageItem);
            }
        }
    };

    const getToDoListByCategory = (category = 'personal') => {
        let ret = getToDoList().filter((toDoItem, index) => {
            return toDoItem.category === category;
        });
        // console.log('ret: ');
        // console.table(ret);

        return ret;
    };

    const getToDoItemById = (toDoList, id) => {
        let itemIndex = -99;
        const item = toDoList.getToDoList().find((toDoItem, index) => {
            if (toDoItem.id === id) {
                itemIndex = index;
            }
            return toDoItem.id === id;
        });

        const ret = {
            item: item,
            index: itemIndex,
        };
        // console.log(ret);

        return ret;
    };

    const updateToDoCompleteStatusById = (toDoList, id, completeStatus = false) => {
        const itemIndex = toDoList.getToDoItemById(toDoList, id).index;
        if (itemIndex === -99) {
            alert('Cannot modify this item right now. Please try again later!');
        } else {
            toDoList.getToDoList()[itemIndex].completeStatus = completeStatus;

            if (verifyItemExistInStorage('localStorage', id)) {
                deleteDataByKeyFromStorage('localStorage', id);
                saveDataToStorage('localStorage', 'toDo', toDoList.getToDoList()[itemIndex]);
            }
        }
    };

    const updateToDoItemById = (toDoList, id, completeStatus = false, toDoItem) => {
        const itemIndex = toDoList.getToDoItemById(toDoList, id).index;
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

            toDoList.getToDoList()[itemIndex].title = toDoItem.title;
            toDoList.getToDoList()[itemIndex].detail = toDoItem.detail;
            toDoList.getToDoList()[itemIndex].dueDate = toDoItem.dueDate;
            toDoList.getToDoList()[itemIndex].priority = toDoItem.priority;
            toDoList.getToDoList()[itemIndex].category = toDoItem.category;
            toDoList.getToDoList()[itemIndex].completeStatus = completeState;

            if (verifyItemExistInStorage('localStorage', id)) {
                deleteDataByKeyFromStorage('localStorage', id);
                saveDataToStorage('localStorage', 'toDo', toDoList.getToDoList()[itemIndex]);
            }
            // console.table(toDoList.getToDoList());
        }
    };

    const resetToDoList = () => {
        toDoList = [];
    };

    const addItemToToDoList = (saveItemToStorage = false, toDoItem) => {
        let itemToAdd;
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
        }
        if (saveItemToStorage) {
            saveDataToStorage('localStorage', 'toDo', itemToAdd);
        }
        // console.log(itemToAdd);
    };

    const deleteToDoItemById = (deleteItemFromStorage = false, toDoList, id) => {
        const item = toDoList.getToDoItemById(toDoList, id);
        // console.log(item.index);

        if (item.index !== -99) {
            toDoList.getToDoList().splice(item.index, 1);

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
