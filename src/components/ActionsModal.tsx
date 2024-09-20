import React, { Children, ReactElement } from "react";
import Modal from "./modal";
import { JsxElement } from "typescript";
import ButtonComponent from "./Button";
import "./css/modal.css"

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

                    <p className="pop-up-content" >
                         {children ? children : ""}
                    </p>

                </div>

                <div
                    className="pop-up-footer">

                    {
                        eventButtons !== undefined && eventButtons.map((b: EventButtons) => (

                            <ButtonComponent type = "button" label = {b.label} action = {b.cb}/>
                        ))
                    }
                    <button className='pop-up-buttons' onClick={onClose}> {closeLabel} </button>

                </div>
            </div>
        </Modal>
    )
}

export default ActionsModal;