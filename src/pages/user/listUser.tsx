import ActionsModal from "../../components/modals/ActionsModal";
import TableRender from "../../components/tableRender"
import React from "react";
import { User } from "../../api/entities/user";
import { GETUsers, PUTUser } from "../../api/requests/userRequests";
import ButtonsBar from "../../components/ButtonsBar";
import InputComponent from "../../components/inputs/InputComponent";
import { capitalize } from "../../api/Methods/capitalizeFunction";
import ButtonComponent from "../../components/buttons/Button";

const UserListRender = () => {

    const [show, setShow] = React.useState<boolean>(undefined)
    const [users, setUsers] = React.useState<User[]>([]);
    const [user, setUser] = React.useState<User>({
        name: '',
        password: null,
        active: false
    });

    const requestGet = async () => {

        await GETUsers().then((response: User[]) => {
            const capitalizedUsers =
                response.map((u: User) => {
                    return {
                        ...u,
                        name: capitalize(u.name)
                    }

                })
            setUsers(capitalizedUsers)
        }).catch(() => { })
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

                setUsers(response)
            }).
            catch(() => { })
    }

    const handleClick = (row: User) => {

        setUser(row as User)
    }

    const handleFilter = (r: User): boolean => {

        return (r.active == false ? true : false)
    }

    const handleChange = <T extends keyof User>(key: T, newValue: User[T]) => {

        const COPY_USER: User = Object.assign({}, user);
        COPY_USER[key] = newValue;
        setUser(COPY_USER);

    }

    const handleSubmit = () => {

        GETUsers(user.name).then((response: User[]) => setUsers(response)).catch(() => { })

    }

        return (

            <div className="default-page">
                <div className="default-content">

                    <ActionsModal
                        isOpen={show}
                        onClose={() => { setShow(false) }}
                        eventButtons={[
                            { label: user.active ? "DESATIVAR" : "ATIVAR", cb: handlePUT }
                        ]}
                    />

                    <ButtonsBar
                        createPath="/createUser"
                        excludeAction={() => setShow(true)}
                        reloadAction={requestGet}
                    />

                    <div id="search-filters-container">

                        <InputComponent
                            id="srcName"
                            label="Nome: "
                            type="text"
                            className="search-filter"
                            action={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange('name', e.target.value.toString())}
                        />

                        <ButtonComponent
                            action={handleSubmit}
                            id="sub-search"
                            label="BUSCAR"
                            type="button"
                        />

                    </div>

                    <TableRender

                        values={users}
                        headers={[
                            { gridType: "FLEX", width: 1, attributeName: "id", label: "Identificador" },
                            { gridType: "FLEX", width: 1, attributeName: "name", label: "Nome" },

                        ]}
                        filter={handleFilter}
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