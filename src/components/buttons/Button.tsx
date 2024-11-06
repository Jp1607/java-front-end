import React from "react";
import "../css/button.css"

type buttonType = 'submit' | 'button'
export type buttonStyle = 'button' | 'link-button' | 'add-sub-button'

type buttonProps = {

    label: string;
    type: buttonType;
    disable?: boolean;
    id?: string;
    classname?: buttonStyle | string;
    action: (event: React.FormEvent | React.MouseEvent) => void;
}

const ButtonComponent: React.FC<buttonProps> = ({ label, type, disable, id, classname, action }): JSX.Element => {

    return (

        <button
        disabled={disable}
        className = {classname ? classname: "button"}
            onClick={action}
            id={id}
            type={type}>
            {label}
        </button>
    )
}

export default ButtonComponent;