import { useNavigate } from "react-router-dom";


export default function HandleView (id: number, path: string) {
    
    const navigate = useNavigate();

    if (id) {
        navigate(path)
    } else {
        window.alert("Selecione um id válido")
    }
}