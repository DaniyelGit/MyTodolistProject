import {
    addNewTodolistAC,
    changeFilterTodolistAC,
    editTodolistTitleAC,
    removeTodolistAC,
    TodolistReducer
} from "./TodolistReducer";
import {v1} from "uuid";
import {filterForTodolist, todolistArr} from "../../App";

test('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<todolistArr> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ];

    const action = removeTodolistAC(todolistID2);

    const endState = TodolistReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID1);
})

test('correct todolist should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const newTodolistTitle = 'Films for viewing';
    let testID = v1();

    const startState: Array<todolistArr> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ];

    const action = addNewTodolistAC(newTodolistTitle, testID);

    const endState = TodolistReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[1].id).toBe(todolistID1);
})

test('correct filter todolist should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let filter: filterForTodolist = 'active';

    const startState: Array<todolistArr> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ];

    const action = changeFilterTodolistAC(filter, todolistID2);

    const endState = TodolistReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(filter);
})

test('correct title for todolist should be edit', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTitle = 'What movie to see';

    const startState: Array<todolistArr> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ];

    const action = editTodolistTitleAC(newTitle, todolistID2);

    const endState = TodolistReducer(startState, action);

    expect(endState[1].title).toBe(newTitle);
    expect(endState[0].title).toBe('What to learn');
})