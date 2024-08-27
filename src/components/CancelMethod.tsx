import { useNavigate } from "react-router-dom";
const CancelButton = () => {
    const navigate = useNavigate()
 const HandleCancel = () => {

    navigate(-1);

}

return (
    <button onClick={HandleCancel}>CANCELAR</button>
)
}
export default CancelButton;