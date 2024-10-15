import ActionsModal from "../../components/modals/ActionsModal";
import TableRender, { Headers } from "../../components/tableRender"
import React from "react";
import { User } from "../../api/entities/user";
import { GETUsers, PUTUser } from "../../api/requests/userRequests";
import ButtonsBar from "../../components/ButtonsBar";
import InputComponent from "../../components/inputs/InputComponent";
import { capitalize } from "../../api/Methods/capitalizeFunction";
import ButtonComponent from "../../components/buttons/Button";
import InputSelect from "../../components/inputs/selectInput";
import Active from "../../api/services/activeInterface";
import { useNavigate } from "react-router-dom";

const HEADERS: Headers<User>[] = [
    { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Identificador' },
    { gridType: 'FLEX', attributeName: 'name', width: 1, label: 'Nome' }
]

const UserListRender = () => {

    const navigate = useNavigate();

    const [show, setShow] = React.useState<boolean>(undefined)
    const [users, setUsers] = React.useState<User[]>([]);
    const [user, setUser] = React.useState<User>({ name: '', password: null, active: false });
    const [showActives, setShowActives] = React.useState<Active>({ description: '', value: false });

    const requestGet = async () => {

        await GETUsers().then((response: User[]) => setUsers(response)).catch(() => { })
    }

    React.useEffect(() => {

        requestGet()
    }, [])

    const handlePUT = async (): Promise<void> => {

        await PUTUser(user.id).
            then((response: string) => console.log("Sucesso! ", response)).
            catch((e: string) => console.log(e))

        setShow(false)

        await GETUsers().
            then((response: User[]) => {

                const capitalizedUsers = response.map((u: User) => {
                    return {
                        ...u,
                        description: capitalize(u.name)
                    }
                })
                setUsers(capitalizedUsers);
            }).
            catch(() => { })
    }

    const handleClick = (row: User) => {

        setUser(row as User)
    }

    const handleChange = <T extends keyof User>(key: T, newValue: User[T]) => {

        const COPY_USER: User = Object.assign({}, user);
        COPY_USER[key] = newValue;
        setUser(COPY_USER);

    }

    const handleSubmit = () => {

        GETUsers(user.name, showActives.value).then((response: User[]) => setUsers(response)).catch(() => { })

    }

    const handleView = () => {

        if (user.id) {
            navigate(`/viewUser/${user.id}`)
        } else {
            window.alert("Selecione um usuário para visualização válido")
        }
    }

    const handleHeaders = React.useMemo((): Headers<User>[] => {
        const h = Object.assign([], HEADERS);
        if (showActives.value) {
            h.push({ gridType: 'FLEX', attributeName: 'active', width: 1, label: 'Estado' });
        }
        return h;
    }, [showActives])

    return (

        <div className="default-page">
            <div className="default-content">

                <ActionsModal
                    isOpen={show}
                    onClose={() => { setShow(false) }}
                    title="ATENÇÃO!!"
                    children={
                        <p>
                            Você tem certeza de que deeja excluir este usuário?
                        </p>
                    }
                    eventButtons={[
                        { label: user.active ? "DESATIVAR" : "ATIVAR", cb: handlePUT }
                    ]}
                />

                <ButtonsBar
                    createPath="/createUser"
                    excludeAction={() => setShow(true)}
                    viewAction={handleView}
                    reloadAction={requestGet}
                />

                <div className="search-filters-container">

                    <InputComponent
                        id="srcName"
                        label="Nome: "
                        type="text"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange('name', e.target.value.toString())}
                    />

                    <InputSelect<Active>
                        classname="search-filter"
                        id="search-active"
                        label="Exibir desativados"
                        idKey="value"
                        labelKey="description"
                        onValueChange={(a: Active) => setShowActives(a.value ? { description: "Exibir", value: true } : { description: "Não exibir", value: false })}
                        options={[
                            { description: "Exibir", value: true },
                            { description: "Não exibir", value: false }
                        ]}
                        value={showActives.value ? { description: "Exibir", value: true } : { description: "Não exibir", value: false }} />

                </div>

                <ButtonComponent
                    action={handleSubmit}
                    id="sub-search"
                    label="BUSCAR"
                    type="button"
                />

                <TableRender

                    values={users}
                    headers={handleHeaders}
                    onTableClick={handleClick}
                    selectedRow={user}
                    actionsLabel={user.active ? 'DESATIVAR' : 'ATIVAR'}
                    onClickActions={() => (setShow(true))}
                />

            </div>
        </div>
    )
}

export default UserListRender