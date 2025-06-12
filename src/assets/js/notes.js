import storageAvailable from './localStorageVerify';

const createNote = (title, detail) => {
    const note = {
        id: crypto.randomUUID(),
        title,
        detail,
        type: 'note',
    };

    return { ...note };
};

const notesListManage = () => {
    const sampleNotesList = [
        createNote(
            'elit dolor',
            'uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis au',
        ),
        createNote(
            'sit amet, consectetur',
            'nt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation u',
        ),
        createNote('Lorem ipsum dolor', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed'),
        createNote('Consectetur adipiscing elit', 'dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
        createNote('sed do eiusmod', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
    ];
    let noteList = [];

    const getSampleNotesList = () => {
        return sampleNotesList;
    };

    const getNotesList = () => {
        return noteList;
    };

    const resetNotesList = () => {
        noteList = [];
    };

    const initializeNotesList = () => {
        // Add sample to do items
        if (getNotesList().length === 0) {
            noteList = [...getSampleNotesList()];
        }
        //Check Local storage and add to list if storage is ok
        if (!storageAvailable('localStorage')) {
            alert('Failed to add note to storage. Please try again');
            localStorage.clear();
            return false;
        }

        for (let i = 0; i < localStorage.length; i++) {
            // console.log(localStorage.getItem(localStorage.key(i)));
            // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
            let localStorageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));

            addItemToNotesList(localStorageItem);
        }
    };

    const addItemToNotesList = (noteItem) => {
        if (noteItem.type === 'note' && noteItem.hasOwnProperty('title') && noteItem.hasOwnProperty('detail')) {
            noteList.push(createNote(noteItem.title, noteItem.detail));
        }
    };

    const deleteNoteItemById = (id) => {
        let index = -99;
        for (let i = 0; i < getNotesList().length; i++) {
            if (getNotesList()[i].id === id) {
                index = i;
                break;
            }
        }
        // console.log(index);
        if (index !== -99) {
            getNotesList().splice(index, 1);
        }
    };

    return {
        getNotesList,
        resetNotesList,
        initializeNotesList,
        deleteNoteItemById,
        addItemToNotesList,
    };
};

export { createNote, notesListManage };
