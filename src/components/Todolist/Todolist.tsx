import React, {ChangeEvent,} from "react";
import s from './Todolist.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {Button} from "../Button/Button";
import {InputFiled} from "../InputFiled/InputFiled";
import {EditSpan} from "../EditSpan/EditSpan";
import {filterForTodolist} from "../../redux/TodolistReducer/TodolistReducer";
import {TasksTypeElements} from "../../redux/TaskReducer/TaskReducer";


type TodolistPropsType = {
    tasks: Array<TasksTypeElements>
    todolistID: string
    titleTodolist: string
    removeTask: (tasksID: string, todolistID: string) => void
    changeFilterTasks: (filterValue: filterForTodolist, todolistID: string) => void
    changeStatusTask: (todolistID: string, taskID: string, conditionTask: boolean) => void
    addTask: (todolistID: string, valueInput: string) => void
    removeTodolist: (todolistID: string) => void
    editTaskTitle: (valueInput: string, todolistID: string, taskID: string) => void
    editTodolistTitle: (valueInput: string, todolistID: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = (
    {
        tasks, todolistID,
        titleTodolist, removeTask, changeFilterTasks,
        changeStatusTask, addTask, removeTodolist,
        editTaskTitle, editTodolistTitle,
    }
) => {

    const removeTaskHandler = (taskID: string) => {
        removeTask(taskID, todolistID);
    } // Handler for remove task
    const filteredTasksHandler = (valueFilter: filterForTodolist) => changeFilterTasks(valueFilter, todolistID); // Handler for filter
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        changeStatusTask(todolistID, taskID, e.currentTarget.checked);
    } // Handler for change status
    const removeHandlerForTodolist = () => removeTodolist(todolistID); // handler for remove todolist. button on 57 string.
    const addTaskHandler = (valueInput: string) => {
        addTask(todolistID, valueInput);
    } // handler for add new task
    const editHandlerForTaskTitle = (valueInput: string, taskID: string) => {
        editTaskTitle(valueInput, todolistID, taskID);
    }
    const editHandlerForTodolistTitle = (valueInput: string) => editTodolistTitle(valueInput, todolistID);

    return (
        <div className={s.todolistWrapper}>
            <div className={s.formForRemoveTodolist}>
                <EditSpan className={s.titleTodolist} title={titleTodolist} callBack={editHandlerForTodolistTitle}/>
                <Button
                    className={s.removeTodolistBtn}
                    callBack={removeHandlerForTodolist}
                    value={<FontAwesomeIcon icon={faTimes}/>}
                />
            </div>

            <div className={s.inputFiled}>
                <InputFiled callBack={addTaskHandler} placeholder={'Add your new todo'}/>
            </div>

            <ul className={s.todolist}>
                {tasks.map(t => {
                    return (
                        <li key={t.id} className={`${s.todolistItem} ${t.isDone ? s.todolistItemCompleted : ''}`}>
                            <input className={s.checkboxTask}
                                   type={'checkbox'}
                                   checked={t.isDone}
                                   onChange={(e) => changeStatusHandler(e, t.id)}
                            />
                            <EditSpan className={s.tasksTitle}
                                      title={t.title}
                                      callBack={(valueInput) => editHandlerForTaskTitle(valueInput, t.id)}
                            />
                            <Button
                                className={s.btnRemove}
                                callBack={() => removeTaskHandler(t.id)}
                                value={<FontAwesomeIcon icon={faTrash}/>}
                            />
                        </li>
                    );
                })}
            </ul>

            <div className={s.footer}>
                <Button
                    className={s.btnFilter}
                    value={'All'}
                    callBack={() => {
                        filteredTasksHandler('all')
                    }}
                />
                <Button
                    className={s.btnFilter}
                    value={'Active'}
                    callBack={() => {
                        filteredTasksHandler('active')
                    }}
                />
                <Button
                    className={s.btnFilter}
                    value={'Completed'}
                    callBack={() => {
                        filteredTasksHandler('completed')
                    }}
                />
            </div>
        </div>
    );
}