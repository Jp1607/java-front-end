import ButtonComponent, { buttonStyle } from "./Button";
import { useNavigate } from "react-router-dom";
import "../css/button.css";

type lbProps = {
    dest: string;
    label: string;
    style?: buttonStyle;
}
const LinkButton: React.FC<lbProps> = ({ dest, label, style }) => {

    const navigate = useNavigate()

    const onClick = () => {

        navigate(dest);
    }

    return (

        <ButtonComponent

            label={label}
            type="button"
            classname={style ? style : "link-button"}
            action={() => (onClick())} />

    )
}

export default LinkButton;