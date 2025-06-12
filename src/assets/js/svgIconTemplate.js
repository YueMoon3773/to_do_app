const SVGIconTemplate = () => {
    const tCardCheckBoxBlank = (state) => {
        const ret = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="tCardCheckBoxBlank ${state}"
        >
            <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"
            />
        </svg>
        `;
        return ret;
    };
    // .insertAdjacentHTML('beforeend', bookCard);

    const tCardCheckBoxChecked = (state) => {
        const ret = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="tCardCheckBoxChecked ${state}"
        >
            <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q8 0 15 1.5t14 4.5l-74 74H200v560h560v-266l80-80v346q0 33-23.5 56.5T760-120H200Zm261-160L235-506l56-56 170 170 367-367 57 55-424 424Z"
            />
        </svg>
        `;
        return ret;
    };

    const tCardDetailsIcon = (state) => {
        const ret = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="tCardDetailsIcon ${state}">
            <title>Task details</title>
            <path
                d="M11 9H13V7H11V9M14 17V15H13V11H10V13H11V15H10V17H14M5 3H19C20.1 3 21 3.89 21 5V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 3.89 3.89 3 5 3M19 19V5H5V19H19Z"
            />
        </svg>
        `;
        return ret;
    };

    const tCardEditIcon = () => {
        const ret = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="tCardEditIcon">
            <title>Edit task</title>
            <path
                d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"
            />
        </svg>
        `;
        return ret;
    };

    const tCardDeleteIconBlank = () => {
        const ret = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="tCardDeleteIconBlank"
        >
            <title>Delete task</title>
            <path
                d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
            />
        </svg>
        `;
        return ret;
    };

    const tCardDeleteIconFull = () => {
        const ret = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="tCardDeleteIconFull hidden"
        >
            <title>Delete task</title>
            <path
                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            />
        </svg>
        `;
        return ret;
    };

    const noteCloseBtnIcon = () => {
        const ret = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="noteCloseBtnIcon">
            <title>Delete note</title>
            <path
                d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
            />
        </svg>
        `;

        return ret;
    };

    return {
        tCardCheckBoxBlank,
        tCardCheckBoxChecked,
        tCardDetailsIcon,
        tCardEditIcon,
        tCardDeleteIconBlank,
        tCardDeleteIconFull,
        noteCloseBtnIcon,
    };
};

export default SVGIconTemplate;
