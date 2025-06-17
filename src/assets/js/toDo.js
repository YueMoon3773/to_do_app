import { storageAvailable, clearStorage, saveDataToStorage, deleteDataByKeyFromStorage } from './localStorageVerify';

const createToDo = (title, detail, dueDate, priority, category, completeStatus = false) => {
    const toDo = {
        id: crypto.randomUUID(),
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
            'Lorem ipsum dolor',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
            '2025-06-18',
            'low',
            'personal',
            false,
        ),
        createToDo(
            'Learn objects',
            'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
            '2028-06-11',
            'low',
            'javascript',
            false,
        ),
        createToDo(
            'Consectetur adipiscing elit',
            'dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            '2025-11-15',
            'medium',
            'personal',
            false,
        ),
        createToDo(
            'Functions basic',
            'occaecat cupidatat non proident, sunt in culpa qui',
            '2027-11-05',
            'medium',
            'javascript',
            true,
        ),
        createToDo(
            'sed do eiusmod',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            '2026-10-15',
            'high',
            'personal',
            true,
        ),
        createToDo(
            'labore et dolore magna aliqua',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum',
            '2027-07-09',
            'high',
            'personal',
            true,
        ),
        createToDo('velit esse cillum', 'aute irure dolor in reprehenderit', '2026-02-19', 'low', 'personal', false),
        createToDo(
            'sunt in culpa qui officia',
            'esse cillum dolore eu fugiat nulla',
            '2028-12-17',
            'low',
            'personal',
            true,
        ),
        createToDo(
            'Object advanced',
            'velit esse cillum dolore eu fugiat nulla pariatur. Excepteur',
            '2029-12-19',
            'high',
            'javascript',
            false,
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
            'exercitation ullamco',
            'nostrud exercitation ullamco laboris',
            '2035-11-23',
            'low',
            'personal',
            false,
        ),
        createToDo(
            'laboris nisi ut aliquip ex',
            'aliquip ex ea commodo consequat. Duis aute irure dolor',
            '2025-06-19',
            'low',
            'personal',
            false,
        ),
        createToDo(
            'irure dolor in reprehenderit',
            'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
            '2037-03-14',
            'medium',
            'personal',
            true,
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
            'Ut enim ad minim veniam',
            'tempor incididunt ut labore et dolore magna aliqua',
            '2025-11-25',
            'low',
            'personal',
            false,
        ),
        createToDo(
            'do eiusmod tempor incididunt',
            'dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            '2025-06-30',
            'medium',
            'personal',
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
            'Classes',
            'commodo consequat. Duis aute irure dolor in reprehenderit',
            '2037-04-14',
            'low',
            'javascript',
            true,
        ),
        createToDo(
            'Modules',
            'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non',
            '2028-10-11',
            'medium',
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
            // console.log(localStorage.getItem(localStorage.key(i)));
            // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
            let localStorageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (localStorageItem.type === 'toDo') {
                addItemToToDoList(localStorageItem);
            }
        }
    };
    // initializeToDoList();

    const getToDoListByCategory = (category = 'personal') => {
        let ret = getToDoList().filter((toDoItem, index) => {
            return toDoItem.category === category;
        });
        // console.log('ret: ');
        // console.table(ret);

        return ret;
    };

    const getToDoItemById = (toDoList, id) => {
        const ret = toDoList.getToDoList().find((toDoItem) => {
            return toDoItem.id === id;
        });
        // console.log(ret);

        return ret;
    };

    const resetToDoList = () => {
        toDoList = [];
    };

    const addItemToToDoList = (toDoItem) => {
        if (
            toDoItem.type === 'to-do' &&
            toDoItem.hasOwnProperty('title') &&
            toDoItem.hasOwnProperty('detail') &&
            toDoItem.hasOwnProperty('dueDate') &&
            toDoItem.hasOwnProperty('priority') &&
            toDoItem.hasOwnProperty('category') &&
            toDoItem.hasOwnProperty('completeStatus')
        ) {
            const itemToAdd = createToDo(
                toDoItem.title,
                toDoItem.detail,
                toDoItem.dueDate,
                toDoItem.priority,
                toDoItem.category,
                toDoItem.completeStatus,
            );
            getToDoList().push(itemToAdd);
            saveDataToStorage('localStorage', itemToAdd);
        }
    };

    const deleteToDoItemById = (id) => {
        let index = -99;
        for (let i = 0; i < getToDoList().length; i++) {
            if (getToDoList()[i].id === id) {
                index = i;
                break;
            }
        }
        // console.log(index);
        if (index !== -99) {
            deleteDataByKeyFromStorage('localStorage', getToDoList()[index].id);
            getToDoList().splice(index, 1);
        }
    };

    return {
        getToDoList,
        getToDoListByCategory,
        getToDoItemById,
        resetToDoList,
        deleteToDoItemById,
        initializeToDoList,
        addItemToToDoList,
    };
};

export { createToDo, toDoListManage };
