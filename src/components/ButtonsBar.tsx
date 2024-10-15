import { useNavigate } from "react-router-dom"
import ButtonComponent from "./buttons/Button"
import LinkButton from "./buttons/LinkButton"
import "./css/buttonsBar.css"

type ButtonsBarProps = {

    createPath: string;
    editIsPresent?: boolean;
    editPath?: string;
    viewPath?: string;
    viewAction?: () => void;
    editAction?: () => void;
    reloadAction: () => void
    excludeAction: () => void;
}

const ButtonsBar: React.FC<ButtonsBarProps> = ({ createPath, editIsPresent, editPath, viewPath, viewAction, editAction, reloadAction, excludeAction }) => {

    const navigate = useNavigate();

    const edit = () => {
        if (editAction) {
            editAction()
        } else {
            navigate(editPath)
        }
    }

    const view = () => {
        if (viewAction) {
            viewAction()
        } else {
            navigate(editPath)
        }
    }

    return (

        <div className="buttons-bar-container">

            <LinkButton
                dest={createPath}
                label="CRIAR"
                style="button"
            />

            {editIsPresent &&
                <ButtonComponent
                    label="EDITAR"
                    type="button"
                    action={edit} />
            }

            <ButtonComponent
                label="VISUALIZAR"
                type="button"
                action={view} />

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