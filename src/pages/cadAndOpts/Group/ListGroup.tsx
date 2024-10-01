import React from "react"
import { Group } from "../../../api/entities/group"
import { GETGroup, GETGroups, PUTGroup } from "../../../api/requests/groupRequests"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"

const GroupListRender = () => {

    const [groups, setGroups] = React.useState<Group[]>([]);
    const [group, setGroup] = React.useState<Group>(null);
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETGroups().then((response: Group[]) => (
            setGroups(response)
        )).catch(() => { });

        console.log(groups);
    }

    React.useEffect(() => {

        requestGet()
    }, []);

    const filter = (r: Group): boolean => {

        return (r.active ? false : true);
    }

    const handleTableClick = (r: Group) => {

        setGroup(r);
    }

    const handleShow = () => {

        setShow(true)
    }

    const handleDelete = (group: Group) => {

        PUTGroup(group.id)
    }

    const handleClose = () => {

        setShow(false);
    }

    return (

        <div>

            <ActionsModal
                isOpen={show}
                onClose={handleClose}
                closeLabel="CANCELAR"
                eventButtons={[
                    { label: "DELETAR", cb: () => handleDelete(group) }
                ]}>

            </ActionsModal>

            <ButtonsBar
                createPath="/createGroup"
                excludeAction={handleShow} />

            <div className="default-content">

                <InputComponent
                    id="GroupId"
                    label="Código: "
                    type="number"
                    className="search-filter"
                    action={() => { }} />

                <InputComponent
                    id="GroupName"
                    label="Marca: "
                    type="text"
                    className="search-filter"
                    action={() => { }} />

            </div>

            <TableRender
                headers={[
                    { attributeName: "id", label: "CÓDIGO", gridType: "FLEX", width: "1" },
                    { attributeName: "description", label: "DESCRIÇÃO", gridType: "FLEX", width: "1" }
                ]}
                values={groups}
                filter={filter}
                onTableClick={handleTableClick}
                selectedRow={group}

            />

        </div>
    )
}

export default GroupListRender;