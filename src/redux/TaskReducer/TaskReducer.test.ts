import {
    addTaskAC,
    addTodolistInTasksAC,
    changeTaskStatusAC,
    editTaskTitleAC,
    removeTaskAC, removeTodolistInTasksAC,
    TaskReducer, TasksType,
} from './TaskReducer';
import {v1} from 'uuid';



let todolistID1: string;
let todolistID2: string;

let startState: TasksType;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'NativeJS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Eggs', isDone: true},
            {id: v1(), title: 'Sausage', isDone: false},
            {id: v1(), title: 'Potatoes', isDone: false},
        ]
    };
})


test('correct todolist should be added in array tasks', () => {

    let testID = v1();

    const action = addTodolistInTasksAC(testID);

    const endState = TaskReducer(startState, action);

    expect(endState[testID]).toBe(endState[testID]);
})

test('correct task should be removed', () => {

    const action = removeTaskAC(startState[todolistID1][0].id, todolistID1);

    const endState = TaskReducer(startState, action);

    expect(endState[todolistID1].length).toBe(3);
    expect(endState[todolistID1][0].title).toBe('NativeJS');
})

test('correct task should be edit status', () => {

    const action = changeTaskStatusAC(todolistID2, startState[todolistID2][1].id, false);

    const endState = TaskReducer(startState, action);

    expect(endState[todolistID2][1].isDone).toBe(false);
    expect(endState[todolistID2][1].title).toBe('Eggs');
})

test('correct task should be added', () => {

    let newTaskTitle = 'TDD';

    const action = addTaskAC(todolistID1, newTaskTitle);

    const endState = TaskReducer(startState, action);

    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID1][0].title).toBe(newTaskTitle);
    expect(endState[todolistID2].length).toBe(4);
})

test('correct task should be edit title', () => {

    let editTitleTask = 'Vue';

    const action = editTaskTitleAC(editTitleTask, todolistID1, startState[todolistID1][1].id);

    const endState = TaskReducer(startState, action);

    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID1][1].title).toBe(editTitleTask);
    expect(endState[todolistID1][2].title).toBe('ReactJS');

})

test('correct todolist should be removed in array tasks', () => {

    const action = removeTodolistInTasksAC(todolistID1);

    const endState = TaskReducer(startState, action);

    expect(endState[todolistID1]).toBe(undefined);
    expect(Object.keys(endState).length).toBe(1);
})