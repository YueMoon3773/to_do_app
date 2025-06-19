const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === 'QuotaExceededError' &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
};

const clearStorage = (type) => {
    let storage = window[type];
    storage.clear();
};

const verifyItemExistInStorage = (type, itemKey) => {
    let storage = window[type];

    if (storage.getItem(JSON.stringify(itemKey)) !== null) {
        return true;
    } else {
        return false;
    }
};

const saveDataToStorage = (type, dataType = 'toDo', objData) => {
    if (storageAvailable(type)) {
        let storage = window[type];
        if (dataType === 'toDo' || dataType === 'note') {
            storage.setItem(`${objData.id}`, JSON.stringify(objData));
        } else {
            storage.setItem(`${objData.text}`, JSON.stringify(objData));
        }
    } else {
        alert('Cannot save date to storage.');
        return false;
    }
};

const deleteDataByKeyFromStorage = (type, objDataKey) => {
    let storage = window[type];
    storage.removeItem(JSON.stringify(objDataKey));
};

export { storageAvailable, clearStorage, verifyItemExistInStorage, saveDataToStorage, deleteDataByKeyFromStorage };
