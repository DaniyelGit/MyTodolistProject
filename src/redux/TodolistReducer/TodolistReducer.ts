import {filterForTodolist, todolistArr} from "../../App";

export type ActionsType =
    removeTodolistACType
    | addNewTodolistACType
    | changeFilterTodolistACType
    | editTodolistTitleType;

export const TodolistReducer = (state: Array<todolistArr>, action: ActionsType): Array<todolistArr> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD-TODOLIST": {
            return [{id: action.todolistID, title: action.valueInput, filter: 'all'}, ...state];
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return (state.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filterValue} : tl));
        }
        case 'EDIT-TODOLIST-TITLE': {
            return (state.map(tl => tl.id === action.todolistID ? {...tl, title: action.valueInput} : tl));
        }
        default: {
            return state;
        }
    }
}


type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

type addNewTodolistACType = ReturnType<typeof addNewTodolistAC>;
export const addNewTodolistAC = (valueInput: string, todolistID: string) => {
    return {
        type: 'ADD-TODOLIST',
        valueInput,
        todolistID
    } as const
}

type changeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>
export const changeFilterTodolistAC = (filterValue: filterForTodolist, todolistID: string) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        filterValue,
        todolistID
    } as const
}

type editTodolistTitleType = ReturnType<typeof editTodolistTitleAC>
export const editTodolistTitleAC = (valueInput: string, todolistID: string) => {
    return {
        type: 'EDIT-TODOLIST-TITLE',
        valueInput,
        todolistID
    } as const
}