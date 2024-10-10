import React from "react"
import { Group } from "../../../api/entities/group"
import { GETGroup, GETGroups, PUTGroup, StateGroup } from "../../../api/requests/groupRequests"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"
import ButtonComponent from "../../../components/buttons/Button"
import { capitalize } from "../../../api/Methods/capitalizeFunction"

const GroupListRender = () => {

    const [groups, setGroups] = React.useState<Group[]>([]);
    const [group, setGroup] = React.useState<Group>({
        description: "",
        active: false
    });
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETGroups().then((response: Group[]) => {
            const capitalizedGroups = response.map((g: Group) => {
                return {
                    ...g,
                    description: capitalize(g.description)
                }
            })
            setGroups(capitalizedGroups);
        }).catch(() => { });

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

        StateGroup(group.id)
        setShow(false)
    }

    const handleClose = () => {

        setShow(false);
    }

    const handleChange = <T extends keyof Group>(key: T, newValue: Group[T]) => {

        const COPY_GROUP: Group = Object.assign({}, group);
        COPY_GROUP[key] = newValue;
        setGroup(COPY_GROUP);

    }

    const handleSearch = () => {

        GETGroups(group.description).then((response: Group[]) => setGroups(response)).catch(() => { })
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
                excludeAction={handleShow} 
                editIsPresent={true}
                editPath={`/editGroup/${group.id}`}
                reloadAction={requestGet}/>

            <div className="search-filters-container">

                <InputComponent
                    id="GroupName"
                    label="Grupo: "
                    type="text"
                    className="search-filter"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange('description', e.target.value.toString())}/>

            </div>

            <ButtonComponent
                action={handleSearch}
                id="sub-search"
                label="BUSCAR"
                type="button"
            />

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