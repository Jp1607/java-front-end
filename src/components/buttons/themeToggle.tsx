import { useThemeContext } from "../../api/context/ThemeContext";
import ButtonComponent from "./Button";

const ThemeToggler = () => {

    const { toggleTheme } = useThemeContext()
 
    return (

        <ButtonComponent
        label = "TEMA"
        type = "button"
        action = {toggleTheme}/>
    )
}

export default ThemeToggler