export const TOGGLE_DARKTHEME = "TOGGLE_DARKTHEME";
export const ADD_TO_LIST = "ADD_TO_LIST";

export const toggleDarkTheme = () => ({
    type: TOGGLE_DARKTHEME,
});

export const addToList = (id) => ({
    type: ADD_TO_LIST,
    payload:{
        id: id
    }
});