import { Link, useLocation } from "react-router-dom"
import TableRender from "../../components/tableRender"
import React from "react";
import getFunction, { User } from "../../api/GET";
import Delete from "../../api/DeleteProducts";
import Edit from "../../api/PUT";

const UserListRender = () => {

console.log("entrou")

    const [users, setUsers] = React.useState<User[]>([]);
    const [user, setUser] = React.useState<User>({
        name: '',
        active: false
    });

const path = useLocation().pathname

    React.useEffect(() => {

        const fetch = async () => {
            await getFunction('/users').then((response: User[]) => {
                setUsers(response)
            }).catch(() => {})
        }

        console.log(users)
        fetch()
    }, [])

    const handlePUT = (row: any): void => {
        Edit(row, '/users').catch(() => { })
    }

    const handleClick = (row: User) => {
        setUser(row as User)
    }

    return (

        <div className="default-page">
            <div className="default-content">
                <TableRender
                    values={users}
                    headers={[
                        { gridType: "FLEX", width: 1, attributeName: "id", label: "Identificador" },
                        { gridType: "FLEX", width: 1, attributeName: "name", label: "Nome" },
                        { gridType: "FLEX", width: 1, attributeName: "active", label: "Estado" }
                    ]}
                    onTableClick={handleClick}
                    selectedRow={user}
                    eventButtons={[
                        { label: user.active ? "DESATIVAR" : "ATIVAR", cb: handlePUT }
                    ]}

                />

            </div>
        </div>
    )
}

export default UserListRender