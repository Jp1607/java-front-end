import React from "react";
import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";

type buttonProps = {
    action: string;
    children: string
}

const ReturnButton: React.FC<buttonProps> = ({ action, children }): JSX.Element => {

    const navigate = useNavigate();

const handleClick = () => {
    if (action = 'login') {
        localStorage.clear();
        navigate('/login')
    } else if (action = 'return') {
        navigate(-1)
    } else if (action = 'menu') {
        navigate('/homePage')
    }
}

    return (
    

            <button className = "content-abled-button" onClick = {handleClick}> {children} </button>
        
    )

}

export default ReturnButton;