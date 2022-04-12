import {combineReducers, createStore} from "redux";
import {TaskReducer} from "./TaskReducer/TaskReducer";
import {TodolistReducer} from "./TodolistReducer/TodolistReducer";

export const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolist: TodolistReducer,
});

// let preloadedState;
// const persistedTodosString = localStorage.getItem('state');
// if (persistedTodosString) {
//     preloadedState = JSON.parse(persistedTodosString);
// }

export let store = createStore(rootReducer);
export type rootStoreType = ReturnType<typeof rootReducer>;

// store.subscribe(() => {
//    localStorage.setItem('state', JSON.stringify(store.getState()))
// });

// @ts-ignore
window.store = store;
