import {TasksType} from "../../App";
import {v1} from "uuid";


type ActionsType =
    addTodolistInTasksACType
    | removeTaskACType
    | changeTaskStatusACType
    | addTaskACType
    | editTaskTitleACType
    | removeTodolistInTasksACType


export const TaskReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'ADD-TODOLIST-IN-TASKS': {
            return ({...state, [action.todolistID]: []});
        }
        case 'REMOVE-TASK': {
            return ({...state, [action.todolistID]: state[action.todolistID].filter(t => action.taskID !== t.id)});
        }
        case 'CHANGE-TASK-STATUS': {
            return ({
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.conditionTask
                } : t)
            });
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.valueInput, isDone: false};
            return ({...state, [action.todolistID]: [newTask, ...state[action.todolistID]]});
        }
        case 'EDIT-TASK-TITLE': {
            return ({...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.valueInput
                } : t)
            });
        }
        case 'REMOVE-TODOLIST-IN-TASKS': {
            delete state[action.todolistID];
            return {...state};
        }
        default: {
            return state;
        }
    }
}


type addTodolistInTasksACType = ReturnType<typeof addTodolistInTasksAC>
export const addTodolistInTasksAC = (todolistID: string) => {
    return {
        type: 'ADD-TODOLIST-IN-TASKS',
        todolistID
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todolistID
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (todolistID: string, taskID: string, conditionTask: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID,
        taskID,
        conditionTask
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (todolistID: string, valueInput: string) => {
    return {
        type: 'ADD-TASK',
        todolistID,
        valueInput
    } as const
}

type editTaskTitleACType = ReturnType<typeof editTaskTitleAC>;
export const editTaskTitleAC = (valueInput: string, todolistID: string, taskID: string) => {
    return {
        type: 'EDIT-TASK-TITLE',
        valueInput,
        todolistID,
        taskID
    } as const
}

type removeTodolistInTasksACType = ReturnType<typeof removeTodolistInTasksAC>
export const removeTodolistInTasksAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST-IN-TASKS',
        todolistID
    } as const
}



