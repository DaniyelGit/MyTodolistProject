import {v1} from "uuid";



export type filterForTodolist = 'all' | 'active' | 'completed'; // filter for todolist tasks
export type todolistArr = {
    id: string,
    title: string,
    filter: filterForTodolist
} // type for todolist


export type ActionsType =
    removeTodolistACType
    | addNewTodolistACType
    | changeFilterTodolistACType
    | editTodolistTitleType;

export const todolistID1 = v1();
export const todolistID2 = v1();

let initialState: Array<todolistArr> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const TodolistReducer = (state = initialState, action: ActionsType): Array<todolistArr> => {
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