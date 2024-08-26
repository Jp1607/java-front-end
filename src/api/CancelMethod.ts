import { useNavigate } from "react-router-dom";

export default function HandleCancel() {

    const navigate = useNavigate()

    navigate(-1);
}