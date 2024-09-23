import React, { ReactElement } from "react";
import Modal from "./modal";
import ButtonComponent from "../buttons/Button";
import "../css/modal.css"

type cbType =  React.FormEvent | React.MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>

type EventButtons = {
    label: string;
    cb: (event?: cbType, param?: any) => void;
}

type ActionsModalProps = {
    isOpen: boolean
    children?: React.ReactElement | ReactElement[];
    title?: string;
    eventButtons?: EventButtons[];
    closeLabel?: string;
    onClose: () => void;
}


const ActionsModal: React.FC<ActionsModalProps> = ({ isOpen, children, title, eventButtons, closeLabel, onClose }): JSX.Element => {

    return (
        <Modal isOpen={isOpen}>
            <div className="pop-up">
                <div className="pop-up-header">

                    <h1 
                    className="pop-up-head">
                     {title ? title : "POP-UP"}
                    </h1>

                </div>

                <div className="pop-up-body">

                    <div className="pop-up-content" >
                         {children ? children : ""}
                    </div>

                </div>

                <div
                    className="pop-up-footer">

                    {
                        eventButtons !== undefined && eventButtons.map((b: EventButtons) => (

                            <ButtonComponent type = "button" label = {b.label} action = {b.cb}/>
                        ))
                    }

                   
                    <ButtonComponent
                    label = {closeLabel ? closeLabel : "CANCELAR"}
                    type = "button"
                    action = {onClose}/>

                </div>
            </div>
        </Modal>
    )
}

export default ActionsModal;