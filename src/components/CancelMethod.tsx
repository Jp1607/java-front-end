import React from "react";
import { useNavigate } from "react-router-dom";
const CancelButton = () => {

    const navigate = useNavigate()
    //const HandleCancel = (props: string) => {
    const HandleCancel = () => {

        //const[buttonText, setButtonText] = React.useState(props)
        navigate(-1);
    }

    return (

        // <button onClick={HandleCancel} value={'CANCELAR'}></button>
        <button onClick={HandleCancel} className="button-abled-content">CANCELAR</button>
    )
}
export default CancelButton;