import ButtonComponent from "./buttons/Button"
import LinkButton from "./buttons/LinkButton"
import "./css/buttonsBar.css"

type ButtonsBarProps = {

    createPath: string;
    editIsPresent?: boolean;
    editPath?: string;
    reloadAction: () => void
    excludeAction: () => void;
}

const ButtonsBar: React.FC<ButtonsBarProps> = ({ createPath, editIsPresent, editPath, reloadAction, excludeAction }) => {

    return (

        <div className="buttons-bar-container">

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

            <ButtonComponent
                label="🗘"
                id="reload"
                type="button"
                style="button"
                action={reloadAction}
            />

        </div>
    )
}

export default ButtonsBar;