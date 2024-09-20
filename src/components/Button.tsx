import React from "react";
import "./css/button.css"

type buttonType = 'submit' | 'button'

type buttonProps = {

    label: string;
    id?: string;
    type: buttonType;
    action: (event: React.FormEvent | React.MouseEvent) => void;
}

const ButtonComponent: React.FC<buttonProps> = ({ label, id, type, action }): JSX.Element => {

    return (

        <button
            onClick={action}
            id={id}
            type={type}>
            {label}
        </button>
    )
}

export default ButtonComponent;