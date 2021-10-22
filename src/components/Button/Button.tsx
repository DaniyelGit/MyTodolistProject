import React from "react";
import s from  './Button.module.css';

type ButtonPropsType = {
    value: string | any
    callBack: () => void
    className: string
}

export const Button: React.FC<ButtonPropsType> = ({value, callBack, className}) => {

    const clickHandlerForButton = () => callBack();

    return (
        <button className={className} onClick={clickHandlerForButton}>{value}</button>
    );
}