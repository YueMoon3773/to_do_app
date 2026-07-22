const formModalManage = (
    toDo,
    notes,
    sideBar,
    hiddenIdInpValue,
    hiddenCompleteStatusInpValue,
    titleInpValue,
    detailInpValue,
    dateInpValue,
    projectSelectInpValue,
    priorityValue,
) => {
    const addProjectHandler = () => {
        sideBar.addSideBarProjectChild(true, titleInpValue);
    };

    const addNoteHandler = () => {
        const noteItemToAdd = {
            title: titleInpValue,
            detail: detailInpValue,
            type: 'note',
        };
        notes.addItemToNotesList(true, noteItemToAdd);
    };

    const addToDoHandler = () => {
        const toDoItemToAdd = {
            title: titleInpValue,
            detail: detailInpValue,
            dueDate: dateInpValue,
            priority: priorityValue,
            category: projectSelectInpValue,
            type: 'toDo',
        };
        toDo.addItemToToDoList(true, toDoItemToAdd);
    };

    const editToDoHandler = () => {
        const toDoItemToAdd = {
            title: titleInpValue,
            detail: detailInpValue,
            dueDate: dateInpValue,
            priority: priorityValue,
            category: projectSelectInpValue,
            type: 'toDo',
        };

        toDo.updateToDoItemById(toDo, hiddenIdInpValue, hiddenCompleteStatusInpValue, toDoItemToAdd);
    };

    return {
        addProjectHandler,
        addNoteHandler,
        addToDoHandler,
        editToDoHandler,
    };
};

export default formModalManage;
