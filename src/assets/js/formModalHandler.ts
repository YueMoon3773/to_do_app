import { ToDoType, ToDoListManageObjType } from './toDo';
import { NoteType, NoteListManageObjType } from './notes';
import { SideBarManageObjType } from './sideBar';

import { ToDoPriorityType } from './toDo';

interface FormModalManageObjType {
    addProjectHandler: () => void;
    addNoteHandler: () => void;
    addToDoHandler: () => void;
    editToDoHandler: () => void;
}

const formModalManage = (
    toDoListManageObj: ToDoListManageObjType,
    noteListManageObj: NoteListManageObjType,
    sideBarManageObj: SideBarManageObjType,
    hiddenIdInpValue: string,
    // hiddenCompleteStatusInpValue: 'true' | 'false' | boolean,
    hiddenCompleteStatusInpValue: 'true' | 'false',
    titleInpValue: string,
    detailInpValue: string,
    dateInpValue: string,
    projectSelectInpValue: string,
    priorityValue: ToDoPriorityType,
): FormModalManageObjType => {
    const addProjectHandler = (): void => {
        sideBarManageObj.addSideBarProjectChild(true, titleInpValue);
    };

    const addNoteHandler = (): void => {
        const noteItemToAdd: Omit<NoteType, 'id'> = {
            title: titleInpValue,
            detail: detailInpValue,
            type: 'note',
        };
        noteListManageObj.addItemToNotesList(true, noteItemToAdd);
    };

    const addToDoHandler = (): void => {
        const toDoItemToAdd: Omit<ToDoType, 'id' | 'completeStatus'> = {
            title: titleInpValue,
            detail: detailInpValue,
            dueDate: dateInpValue,
            priority: priorityValue,
            category: projectSelectInpValue,
            type: 'toDo',
        };
        toDoListManageObj.addItemToToDoList(true, toDoItemToAdd);
    };

    const editToDoHandler = (): void => {
        const toDoItemToAdd: Omit<ToDoType, 'id' | 'completeStatus'> = {
            title: titleInpValue,
            detail: detailInpValue,
            dueDate: dateInpValue,
            priority: priorityValue,
            category: projectSelectInpValue,
            type: 'toDo',
        };

        toDoListManageObj.updateToDoItemById(
            toDoListManageObj,
            hiddenIdInpValue,
            hiddenCompleteStatusInpValue,
            toDoItemToAdd,
        );
    };

    return {
        addProjectHandler,
        addNoteHandler,
        addToDoHandler,
        editToDoHandler,
    };
};

export default formModalManage;
