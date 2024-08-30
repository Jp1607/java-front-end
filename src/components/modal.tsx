import { ReactElement } from "react";

type modalProps = {

    isOpen: boolean;
    children: React.ReactElement
}

const Modal: React.FC<modalProps> = ({ isOpen, children }): JSX.Element => {

    return isOpen ?

        <div
        className="pop-up"
        >

            {children}
        </div> : null
}

export default Modal