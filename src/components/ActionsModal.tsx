import React, { Children, ReactElement } from "react";
import Modal from "./modal";
import { JsxElement } from "typescript";

type EventButtons = {
    label: string;
    cb: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>, param?: any) => void;
}

type ActionsModalProps = {
    isOpen: boolean
    children?: React.ReactElement | ReactElement[];
    title?: string;
    eventButtons?: EventButtons[];
    onClose: () => void;
}


const ActionsModal: React.FC<ActionsModalProps> = ({ isOpen, children, title, eventButtons, onClose }): JSX.Element => {



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

                            <button className="content-abled-button" onClick={b.cb}>{b.label}</button>
                        ))
                    }
                    <button className={'content-abled-button'} onClick={onClose}> CANCELAR</button>

                </div>
            </div>
        </Modal>
    )
}

export default ActionsModal;