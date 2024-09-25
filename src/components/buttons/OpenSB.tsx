import React from "react";
import "../css/button.css"

type OpenSBProps = {
    open: boolean;
    anexedBar: string;
    onCloseClick: () => void;
}

const OpenSb: React.FC<OpenSBProps> = ({ open, anexedBar, onCloseClick }) => {
    
    return (

        <button
            id="open-side-bar"
            onClick={onCloseClick}
        >
            {open ? '<' : '>'}

        </button>
    )
}

export default OpenSb;