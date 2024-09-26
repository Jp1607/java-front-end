import ActionsModal from "../../components/modals/ActionsModal";
import TableRender from "../../components/tableRender"
import React from "react";
import { User } from "../../api/entities/user";
import { GETUsers, PUTUser } from "../../api/requests/userRequests";

const UserListRender = () => {

    const [show, setShow] = React.useState<boolean>(undefined)
    const [users, setUsers] = React.useState<User[]>([]);
    const [user, setUser] = React.useState<User>({
        name: '',
        active: false
    });

    React.useEffect(() => {

        const fetch = async () => {

            await GETUsers().then((response: User[]) => {

                setUsers(response)
            }).catch(() => { })
        }

        fetch()
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
                    actionsLabel = {user.active ? 'DESATIVAR' : 'ATIVAR'}
                    onClickActions={() => (setShow(true))}
                />
                
            </div>
        </div>
    )
}

export default UserListRender