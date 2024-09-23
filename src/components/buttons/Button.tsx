import React from "react";
import "../css/button.css"

type buttonType = 'submit' | 'button'
export type buttonStyle = 'button' | 'linkButton'

type buttonProps = {

    label: string;
    type: buttonType;
    id?: string;
    style?: buttonStyle;
    action: (event: React.FormEvent | React.MouseEvent) => void;
}

const ButtonComponent: React.FC<buttonProps> = ({ label, type, id, style, action }): JSX.Element => {

    return (

        <button
        className = {style ? style: "button"}
            onClick={action}
            id={id}
            type={type}>
            {label}
        </button>
    )
}

export default ButtonComponent;