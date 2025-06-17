function storageAvailable(type) {
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
}

const clearStorage = (type) => {
    let storage = window[type];
    storage.clear();
};

const saveDataToStorage = (type, objData) => {
    if (storageAvailable(type)) {
        let storage = window[type];
        storage.setItem(`${objData.id}`, JSON.stringify(objData));
    } else {
        alert('Cannot save date to storage.');
        return false;
    }
};

const deleteDataByKeyFromStorage = (type, objDataKey) => {
    let storage = window[type];
    storage.removeItem(objDataKey);
};

export { storageAvailable, clearStorage, saveDataToStorage, deleteDataByKeyFromStorage };
