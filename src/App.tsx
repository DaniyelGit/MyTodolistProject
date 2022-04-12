import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {InputFiled} from "./components/InputFiled/InputFiled";
import {
    addNewTodolistAC,
    changeFilterTodolistAC,
    editTodolistTitleAC, filterForTodolist,
    removeTodolistAC, todolistArr,
} from "./redux/TodolistReducer/TodolistReducer";
import {
    addTaskAC,
    addTodolistInTasksAC,
    changeTaskStatusAC, editTaskTitleAC,
    removeTaskAC, removeTodolistInTasksAC, TasksType,
} from "./redux/TaskReducer/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootStoreType} from "./redux/store";





function App() {
    let dispatch = useDispatch();

    let tasks = useSelector<rootStoreType, TasksType>(state => state.tasks);
    let todolists = useSelector<rootStoreType, Array<todolistArr>>(state => state.todolist);

    // @ts-ignore
    console.log(window.store);


    const removeTask = (taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(taskID, todolistID));
    } // function for remove task
    const changeFilterTasks = (filterValue: filterForTodolist, todolistID: string) => {
        dispatch(changeFilterTodolistAC(filterValue, todolistID));
    }; // function for changeFilterTasks
    const changeStatusTask = (todolistID: string, taskID: string, conditionTask: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, conditionTask));
    } // function change status task
    const addTask = (todolistID: string, valueInput: string) => {
        dispatch(addTaskAC(todolistID, valueInput));
    } // function add new task in todolist
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
        dispatch(removeTodolistInTasksAC(todolistID))
    } // function for remove todolist
    const addNewTodolist = (valueInput: string) => {
        let todolistID = v1();
        dispatch(addNewTodolistAC(valueInput, todolistID));
        dispatch(addTodolistInTasksAC(todolistID));
    }
    const editTaskTitle = (valueInput: string, todolistID: string, taskID: string) => {
       dispatch(editTaskTitleAC(valueInput, todolistID, taskID));
    }
    const editTodolistTitle = (valueInput: string, todolistID: string) => {
        dispatch(editTodolistTitleAC(valueInput, todolistID));
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





