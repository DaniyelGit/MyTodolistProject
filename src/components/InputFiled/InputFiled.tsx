import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from "react";
import s from './InputFiled.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";


type InputFiledPropsType =  {
    callBack: (valueInput: string) => void
    placeholder: string
}

export const InputFiled: React.FC<InputFiledPropsType> = ({callBack, placeholder}) => {

    const [valueInput, setValueInput] = useState<string>(''); // useState for valueInput
    const [error, setError] = useState<string>(''); // useState for error

    const changeTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value);
        setError('');
    } // handler for change value input
    const addNewTaskHandler = () => {
        if (valueInput.trim() !== '') {
            callBack(valueInput.trim());
            setValueInput('');
        } else {
            setError('Title is not required!');
        }
    } // handler for add new task
    const keyPressOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTaskHandler();
        }
    } // function add task on Enter


    return (
        <>
            <div className={s.inputFiledWrapper}>
                <input
                    type="text"
                    className={`${s.inputForTasks} ${error ? s.inputError : ''}`}
                    value={valueInput}
                    placeholder={placeholder}
                    onChange={changeTitleTaskHandler}
                    onKeyPress={keyPressOnEnter}
                />
                <button className={s.inputFiledButton} onClick={addNewTaskHandler}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            {error ? <div className={s.errorMessage}>{error}</div> : ''}
        </>
    );
}