import { nanoid } from 'nanoid';
import {
    storageAvailable,
    verifyItemExistInStorage,
    saveDataToStorage,
    deleteDataByKeyFromStorage,
} from './localStorageVerify';

export interface NoteType {
    id: string;
    title: string;
    detail: string;
    type: 'note';
}

type LocalStorageKeyType = string | null;

export interface NoteListManageObjType {
    getNotesList: () => NoteType[];
    resetNotesList: () => void;
    initializeNotesList: () => void | false;
    addItemToNotesList: (saveItemToStorage: boolean, noteItem: NoteType) => void;
    deleteNoteItemById: (deleteItemFromStorage: boolean, noteListManageObj: NoteListManageObjType, id: string) => void;
}

const createNote = (title: string, detail: string): NoteType => {
    const note: NoteType = {
        id: nanoid(),
        title,
        detail,
        type: 'note',
    };

    return { ...note };
};

const notesListManage = (): NoteListManageObjType => {
    const sampleNotesList: NoteType[] = [
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
    let noteList: NoteType[] = [];

    const getSampleNotesList = (): NoteType[] => {
        return sampleNotesList;
    };

    const getNotesList = (): NoteType[] => {
        return noteList;
    };

    const resetNotesList = (): void => {
        noteList = [];
    };

    const initializeNotesList = (): void | false => {
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

        for (let i: number = 0; i < localStorage.length; i++) {
            let localStorageItem: NoteType;
            const localStorageKey: LocalStorageKeyType = localStorage.key(i);

            if (localStorageKey === null) continue;
            else {
                try {
                    const rawData: LocalStorageKeyType = localStorage.getItem(localStorageKey);

                    if (rawData === null) continue;
                    else {
                        localStorageItem = JSON.parse(rawData);

                        if (localStorageItem.type === 'note') {
                            noteList.push(localStorageItem);
                        }
                    }
                } catch (err) {
                    console.warn(`Corrupted entry "${localStorageKey}" removed:`, err);
                    localStorage.removeItem(localStorageKey);
                    continue;
                }
            }
        }
    };

    const addItemToNotesList = (saveItemToStorage: boolean = false, noteItem: NoteType): void => {
        let itemToAdd: NoteType;
        if (noteItem.type === 'note' && noteItem.hasOwnProperty('title') && noteItem.hasOwnProperty('detail')) {
            itemToAdd = createNote(noteItem.title, noteItem.detail);
            // console.log(itemToAdd);

            noteList.push(itemToAdd);

            if (saveItemToStorage) {
                saveDataToStorage('localStorage', 'note', itemToAdd);
            }
        }
    };

    const deleteNoteItemById = (
        deleteItemFromStorage: boolean = false,
        noteListManageObj: NoteListManageObjType,
        id: string,
    ): void => {
        let index: number = -99;
        for (let i: number = 0; i < noteListManageObj.getNotesList().length; i++) {
            if (noteListManageObj.getNotesList()[i].id === id) {
                index = i;
                break;
            }
        }
        // console.log(index);

        if (index !== -99) {
            noteListManageObj.getNotesList().splice(index, 1);

            if (deleteItemFromStorage) {
                if (verifyItemExistInStorage('localStorage', id)) {
                    deleteDataByKeyFromStorage('localStorage', id);
                }
            }
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
