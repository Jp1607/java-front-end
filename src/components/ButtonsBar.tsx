import ButtonComponent from "./buttons/Button"
import LinkButton from "./buttons/LinkButton"
import "./css/buttonsBar.css"

type ButtonsBarProps = {

    createPath: string;
    editIsPresent?: boolean;
    editPath?: string;
    excludeAction: () => void;
}

const ButtonsBar: React.FC<ButtonsBarProps> = ({ createPath, editIsPresent, editPath, excludeAction }) => {

    return (

        <div id="buttons-bar-container">

            <LinkButton
                dest={createPath}
                label="CRIAR"
                style="button"
            />

            {editIsPresent &&
                <LinkButton
                    dest={editPath}
                    label="EDITAR"
                    style="button"
                />
            }

            <ButtonComponent
                label="VISUALIZAR"
                type="button"
                action={() => { }} />

            <ButtonComponent
                label="EXCLUIR"
                type="button"
                style="button"
                action={excludeAction}
            />

        </div>
    )
}

export default ButtonsBar;