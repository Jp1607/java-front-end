import ActionsModal from "../../components/modals/ActionsModal";
import TableRender from "../../components/tableRender"
import React from "react";
import { User } from "../../api/entities/user";
import { GETUsers, PUTUser } from "../../api/requests/userRequests";
import ButtonsBar from "../../components/ButtonsBar";
import InputComponent from "../../components/inputs/InputComponent";

const UserListRender = () => {

    const [show, setShow] = React.useState<boolean>(undefined)
    const [users, setUsers] = React.useState<User[]>([]);
    const [user, setUser] = React.useState<User>({
        name: '',
        active: false
    });

    React.useEffect(() => {

        const requestGet = async () => {

            await GETUsers().then((response: User[]) => {

                setUsers(response)
            }).catch(() => { })
        }

        requestGet()
    }, [user])

    const handlePUT = async (): Promise<void> => {

        await PUTUser(user.id).
            then((response: string) => console.log("Sucesso! ", response)).
            catch((e: string) => console.log(e))

        setShow(false)

        await GETUsers().
            then((response: User[]) => { setUsers(response) }).
            catch(() => { })
    }

    const handleClick = (row: User) => {

        setUser(row as User)
    }

    const handleFilter = (r: User): boolean => {

        return (r.active == false ? true : false)
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
                    createPath="/listUser"
                    excludeAction={() => setShow(true)}
                />

                <div id="search-filters-container">

                    <InputComponent
                        id="srcCod"
                        label="Código: "
                        type="number"
                        className="search-filter"
                        action={() => { }} />

                    <InputComponent
                        id="srcName"
                        label="Nome: "
                        type="text"
                        className="search-filter"
                        action={() => { }}
                    />

                    <InputComponent
                        id="srcMU"
                        label="Un. Medida: "
                        type="number"
                        className="search-filter"
                        action={() => { }} />

                    <InputComponent
                        id="srcType"
                        label="Tipo: "
                        type="text"
                        className="search-filter"
                        action={() => { }} />

                    <InputComponent
                        id="srcGroup"
                        label="Grupo: "
                        type="text"
                        className="search-filter"
                        action={() => { }} />

                    <InputComponent
                        id="srcBrand"
                        label="Marca: "
                        type="text"
                        className="search-filter"
                        action={() => { }} />
                </div>

                <TableRender

                    values={users}
                    headers={[
                        { gridType: "FLEX", width: 1, attributeName: "id", label: "Identificador" },
                        { gridType: "FLEX", width: 1, attributeName: "name", label: "Nome" },
                        { gridType: "FLEX", width: 1, attributeName: "active", label: "Estado" }
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