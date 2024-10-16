import React, { useEffect } from "react"
import { User } from "../../api/entities/user"
import ThemeToggler from "../../components/buttons/themeToggle"
import InputComponent from "../../components/inputs/InputComponent"
import { GETUserById, POSTUser } from "../../api/requests/userRequests"
import '../css/login.css';
import ButtonComponent from "../../components/buttons/Button"
import { useNavigate, useParams } from "react-router-dom"
import ActionsModal from "../../components/modals/ActionsModal"
import LinkButton from "../../components/buttons/LinkButton"

const MandatoryFields: Array<{ key: keyof User, description: string }> = [
    { key: 'name', description: 'Nome do usuário' },
];

const CreateUser = () => {

    const { id } = useParams();
    const { viewId } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState<boolean>(false);
    const [fieldsError, setFieldsError] = React.useState<string[]>([]);
    const [user, setUser] = React.useState<User>(null)
    const [readOnly, setReadOnly] = React.useState<boolean>(false)

    const handleChange = <T extends keyof User>(key: T, newValue: User[T]) => {

        setUser((previous: User) => ({

            ...previous,
            [key]: newValue

        }))
    }

    const requestGetUser = (id: number) => {

        GETUserById(id).then((response: User) => setUser(response)).catch(() => { })
    }

    useEffect(() => {
        // if (id) {
        //     setWillEdit(true)
        //     requestGetProd(parseInt(id))
        // }

        if (viewId) {
            setReadOnly(true);
            requestGetUser(parseInt(viewId));
        }
    }, [])

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
        navigate('/listUsers')
    }

    return (

        <form onSubmit={handleSubmit} id="create-form">

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

            <InputComponent
                label="NOME: "
                id="inputDesc"
                type="text"
                value={user ? user.name : ""}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('name', event.target.value.toString())} />

            {!viewId &&
                <ButtonComponent
                    label={"CRIAR"}
                    type="submit"
                    action={handleSubmit} />}

            <LinkButton
                dest="/listUsers"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateUser;