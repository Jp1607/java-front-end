import ButtonComponent from "./buttons/Button"
import LinkButton from "./buttons/LinkButton"
import "./css/buttonsBar.css"

const ButtonsBar: React.FC = () => {

    return (

        <div id="buttons-bar-container">

            <LinkButton
                dest="/createProd"
                label="CRIAR"
                style="button"

            />

            <LinkButton
                dest="/editProd"
                label="EDITAR"
                style="button"
            />

            <ButtonComponent
                label="VISUALIZAR"
                type="button"
                action={() => { }} />

            <ButtonComponent
                label="EXCLUIR"
                type="button"
                style="button"
                action={() => { }}
            />

        </div>
    )
}

export default ButtonsBar;