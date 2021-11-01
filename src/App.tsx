import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {InputFiled} from "./components/InputFiled/InputFiled";
import {
    addNewTodolistAC,
    changeFilterTodolistAC,
    editTodolistTitleAC,
    removeTodolistAC,
    TodolistReducer
} from "./redux/TodolistReducer/TodolistReducer";
import {
    addTaskAC,
    addTodolistInTasksAC,
    changeTaskStatusAC, editTaskTitleAC,
    removeTaskAC, removeTodolistInTasksAC,
    TaskReducer
} from "./redux/TaskReducer/TaskReducer";

export type filterForTodolist = 'all' | 'active' | 'completed'; // filter for todolist tasks
export type todolistArr = {
    id: string,
    title: string,
    filter: filterForTodolist
} // type for todolist
export type TasksTypeElements = {
    id: string,
    title: string,
    isDone: boolean,
} // type for tasks elements
export type TasksType = {
    [key: string]: Array<TasksTypeElements>;
} // type for state tasks


function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, todolistsDispatch] = useReducer(TodolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);


    const [tasks, tasksDispatch] = useReducer(TaskReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'NativeJS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Eggs', isDone: true},
            {id: v1(), title: 'Sausage', isDone: false},
            {id: v1(), title: 'Potatoes', isDone: false},
        ]
    });

    const removeTask = (taskID: string, todolistID: string) => {
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)});
        tasksDispatch(removeTaskAC(taskID, todolistID));
    } // function for remove task
    const changeFilterTasks = (filterValue: filterForTodolist, todolistID: string) => {
        todolistsDispatch(changeFilterTodolistAC(filterValue, todolistID));
    }; // function for changeFilterTasks
    const changeStatusTask = (todolistID: string, taskID: string, conditionTask: boolean) => {
        tasksDispatch(changeTaskStatusAC(todolistID, taskID, conditionTask));
    } // function change status task
    const addTask = (todolistID: string, valueInput: string) => {
        tasksDispatch(addTaskAC(todolistID, valueInput));
    } // function add new task in todolist
    const removeTodolist = (todolistID: string) => {
        todolistsDispatch(removeTodolistAC(todolistID));
        tasksDispatch(removeTodolistInTasksAC(todolistID))
    } // function for remove todolist
    const addNewTodolist = (valueInput: string) => {
        let todolistID = v1();
        todolistsDispatch(addNewTodolistAC(valueInput, todolistID));
        tasksDispatch(addTodolistInTasksAC(todolistID));
    }
    const editTaskTitle = (valueInput: string, todolistID: string, taskID: string) => {
       tasksDispatch(editTaskTitleAC(valueInput, todolistID, taskID));
    }
    const editTodolistTitle = (valueInput: string, todolistID: string) => {
        todolistsDispatch(editTodolistTitleAC(valueInput, todolistID));
    }

    return (
        <div className="App">
            <div className={'wrapperForm'}>
                <InputFiled callBack={addNewTodolist} placeholder={'Add your new todolist'}/>
            </div>
            <div className={'border'}></div>

            <div className={'wrapper'}>
                {todolists.map(tl => {
                    let newTasks = tasks[tl.id];
                    if (tl.filter === 'active') newTasks = newTasks.filter(t => !t.isDone);
                    if (tl.filter === 'completed') newTasks = newTasks.filter(t => t.isDone)
                    return (
                        <Todolist
                            key={tl.id}
                            tasks={newTasks}
                            todolistID={tl.id}
                            titleTodolist={tl.title}
                            removeTask={removeTask}
                            changeFilterTasks={changeFilterTasks}
                            changeStatusTask={changeStatusTask}
                            addTask={addTask}
                            removeTodolist={removeTodolist}
                            editTaskTitle={editTaskTitle}
                            editTodolistTitle={editTodolistTitle}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;





