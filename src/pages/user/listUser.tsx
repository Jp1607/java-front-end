import { useNavigate } from "react-router-dom"
import TableRender from "../../components/tableRender"
import React from "react";
import getFunction, { User } from "../../api/GET";
import Edit from "../../api/PUT";
import ActionsModal from "../../components/ActionsModal";

const UserListRender = () => {

    const [show, setShow] = React.useState<boolean>(undefined)
    const [users, setUsers] = React.useState<User[]>([]);
    const [user, setUser] = React.useState<User>({
        name: '',
        active: false
    });

    React.useEffect(() => {

        const fetch = async () => {

            await getFunction('/users').then((response: User[]) => {

                setUsers(response)
            }).catch(() => { })
        }

        fetch()
    }, [, user])

    const handlePUT = async (): Promise<void> => {

        await Edit(`/users/${user.id}`).
        then((response: string) => console.log("Sucesso! ", response)).
        catch((e) => console.log(e))
        
        setShow(false)
      
        await getFunction('/users').
        then((response: User[]) => {setUsers(response)}).
        catch(() => { })
    }

    const handleClick = (row: User) => {

        setUser(row as User)
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
                    onTableClick={handleClick}
                    selectedRow={user}
                    onClickActions={() => (setShow(true))}
                />
            </div>
        </div>
    )
}

export default UserListRender