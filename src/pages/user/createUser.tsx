import React from "react"
import { User } from "../../api/entities/user"
import ThemeToggler from "../../components/buttons/themeToggle"
import InputComponent from "../../components/inputs/InputComponent"
import { POSTUser } from "../../api/requests/userRequests"
import '../css/login.css';
import ButtonComponent from "../../components/buttons/Button"
import { useNavigate } from "react-router-dom"
import ActionsModal from "../../components/modals/ActionsModal"

const MandatoryFields: Array<{ key: keyof User, description: string }> = [
    { key: 'name', description: 'Nome do usuário' },
];

const CreateUser = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState<boolean>(false);
    const [fieldsError, setFieldsError] = React.useState<string[]>([]);
    const [user, setUser] = React.useState<User>(null)

    const handleChange = <T extends keyof User>(key: T, newValue: User[T]) => {

        setUser((previous: User) => ({

            ...previous,
            [key]: newValue

        }))
    }

    const verifyEmpty = (user: User): { ret: boolean, fields: string[] } => {
        let ret: boolean = true;
        const FIELDS: string[] = [];
        for (let index = 0; index < MandatoryFields.length; index++) {
            const USER = user[MandatoryFields[index].key];
            if (USER === undefined || USER === '' || USER === null) {
                ret = false;
                FIELDS.push(MandatoryFields[index].description);
            }
        }
        return { ret, fields: FIELDS };
    }

    const handleSubmit = () => {

        const RET = verifyEmpty(user);
        if (RET.ret) {
            POSTUser(user).catch(() => { });
        } else {
            setFieldsError(RET.fields);
            setOpen(true);
        }
        navigate('listUsers')
    }

    return (

        <div id="login-page">

            <ActionsModal
                isOpen={open}
                onClose={() => { setOpen(false); setFieldsError([]); }}
                title="ATENÇÃO"
            >
                <p>
                    Há alguns campos obrigatórios não preenchidos!
                    <br />
                    {fieldsError.map((f: string) => (<>{`-Campo: ${f}.`}<br /></>))}
                </p>
            </ActionsModal>

            <div id="login-page-container">
                <div id="login-page-header">

                    <h1 id="login-title">

                        NOVO

                    </h1>

                    <ThemeToggler />

                </div>

                <form onSubmit={handleSubmit} id="login-form">

                    <InputComponent
                        id="userNameInput"
                        label="Nome: "
                        type="text"
                        action={(event: React.ChangeEvent<HTMLInputElement>) => handleChange("name", event.target.value.toString())} />

                    <InputComponent
                        id="userPassInput"
                        label="Senha:"
                        type="password"
                        action={(event: React.ChangeEvent<HTMLInputElement>) => handleChange("password", parseInt(event.target.value))} />

                    <ButtonComponent
                        id="subCad"
                        label="ENVIAR"
                        type="submit"
                        action={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default CreateUser;