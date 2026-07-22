import { ToDoType } from './toDo';
import { NoteType } from './notes';
import { ProjectChildType } from './sideBar';

type StorageType = 'localStorage' | 'sessionStorage';

const storageAvailable = (type: StorageType): boolean => {
    let storage: Storage | undefined;
    try {
        storage = window[type];
        const x: string = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === 'QuotaExceededError' &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage?.length !== 0
        );
    }
};

const clearStorage = (type: StorageType): void => {
    let storage: Storage = window[type];
    storage.clear();
};

const verifyItemExistInStorage = (type: StorageType, itemKey: string): boolean => {
    let storage: Storage = window[type];
    let key: string;
    key = typeof itemKey === 'string' ? (key = itemKey) : (key = JSON.stringify(itemKey));

    if (storage.getItem(key) !== null) {
        return true;
    } else {
        return false;
    }
};

const saveDataToStorage = (
    type: StorageType,
    dataType = 'toDo',
    objData: ToDoType | NoteType | ProjectChildType,
): void | false => {
    if (storageAvailable(type)) {
        let storage = window[type];
        if (dataType === 'toDo' || dataType === 'note') {
            const data = objData as ToDoType | NoteType;
            storage.setItem(`${data.id}`, JSON.stringify(objData));
        } else {
            const data = objData as ProjectChildType;
            storage.setItem(`${data.text}`, JSON.stringify(objData));
        }
    } else {
        alert('Cannot save date to storage.');
        return false;
    }
};

const deleteDataByKeyFromStorage = (type: StorageType, itemKey: string): void => {
    let storage:Storage = window[type];
    if (typeof itemKey === 'string') {
        storage.removeItem(itemKey);
    } else {
        storage.removeItem(JSON.stringify(itemKey));
    }
};

export { storageAvailable, clearStorage, verifyItemExistInStorage, saveDataToStorage, deleteDataByKeyFromStorage };
