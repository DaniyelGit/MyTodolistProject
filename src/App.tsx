import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {InputFiled} from "./components/InputFiled/InputFiled";

export type filterForTodolist = 'all' | 'active' | 'completed'; // filter for todolist tasks
type todolistArr = {
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

    const [todolists, setTodolist] = useState<todolistArr[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<TasksType>({
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
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)});
    } // function for remove task
    const changeFilterTasks = (filterValue: filterForTodolist, todolistID: string) => {
        setTodolist(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filterValue}: tl))
    }; // function for changeFilterTasks
    const changeStatusTask = (todolistID: string, taskID: string, conditionTask: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => taskID === t.id ? {...t, isDone: conditionTask} : t)})
    } // function change status task
    const addTask = (todolistID: string, valueInput: string) => {
        const newTask = {id: v1(), title: valueInput, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    } // function add new task in todolist
    const removeTodolist = (todolistID: string) => {
        setTodolist(todolists.filter(tl => tl.id !== todolistID));
    } // function for remove todolist
    const addNewTodolist = (valueInput: string) => {
        let todolistID = v1();
        setTodolist([{id: todolistID, title: valueInput, filter: 'all'}, ...todolists]);
        setTasks({...tasks, [todolistID]: []});
    }
    const editTaskTitle = (valueInput: string, todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: valueInput} : t)});
    }
    const editTodolistTitle = (valueInput: string, todolistID: string) => {
        setTodolist(todolists.map(tl => todolistID === tl.id ? {...tl, title: valueInput} : tl));
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





