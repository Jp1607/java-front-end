import '../css/modal.css';

type modalProps = {

    isOpen: boolean;
    children: React.ReactElement
}

const Modal: React.FC<modalProps> = ({ isOpen, children }): JSX.Element => {

    return isOpen ?
        <div className="pop-up-container">
            {children}
        </div> :
        null
}

export default Modal