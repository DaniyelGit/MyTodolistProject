import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './EditSpan.module.css';

type EditSpanPropsType = {
    className: string
    title: string
    callBack: (valueInput: string) => void
}

export const EditSpan: React.FC<EditSpanPropsType> = ({className, title, callBack}) => {

    const [valueInput, setValueInput] = useState<string>(title);
    const [edit, setEdit] = useState<boolean>(false);

    const onDoubleClickHandler = () => {
        setEdit(true);
    }
    const onBlurHandler = () => {
        setEdit(false);
        callBack(valueInput);
    }
    const onChangeHandlerForInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value);
    }
    const onKeyPressHandlerForInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler();
        }
    }

    return (
        edit
            ? <input
                className={s.editSpan}
                type="text"
                value={valueInput}
                autoFocus
                onBlur={onBlurHandler}
                onChange={onChangeHandlerForInput}
                onKeyPress={onKeyPressHandlerForInput}
            />
            : <span
                className={className} onDoubleClick={onDoubleClickHandler}>{title}</span>
    );
}