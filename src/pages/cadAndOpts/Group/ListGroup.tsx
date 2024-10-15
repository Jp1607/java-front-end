import React from "react"
import { Group } from "../../../api/entities/group"
import { GETGroups, StateGroup } from "../../../api/requests/groupRequests"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender, {Headers} from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"
import ButtonComponent from "../../../components/buttons/Button"
import { capitalize } from "../../../api/Methods/capitalizeFunction"
import Active from "../../../api/services/activeInterface"
import InputSelect from "../../../components/inputs/selectInput"

const HEADERS: Headers<Group>[] = [
    { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Identificador' },
    { gridType: 'FLEX', attributeName: 'description', width: 1, label: 'Nome' }
]

const GroupListRender = () => {

    const [showActives, setShowActives] = React.useState<Active>({ description: '', value: false });
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [group, setGroup] = React.useState<Group>({
        description: "",
        active: false
    });
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETGroups().then((response: Group[]) => setGroups(response)).catch(() => { });

    }

    React.useEffect(() => {

        requestGet()
    }, []);

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

    const handleHeaders = React.useMemo((): Headers<Group>[] => {
        const h = Object.assign([], HEADERS);
        if (showActives.value) {
            h.push({ gridType: 'FLEX', attributeName: 'active', width: 1, label: 'Estado' });
        }
        return h;
    }, [showActives])

    const handleSearch = () => {

        GETGroups(group.description, showActives.value).then((response: Group[]) => setGroups(response)).catch(() => { })
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
                reloadAction={requestGet} />

            <div className="search-filters-container">

                <InputComponent
                    id="GroupName"
                    label="Grupo: "
                    type="text"
                    className="search-filter"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange('description', e.target.value.toString())} />

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
                action={handleSearch}
                id="sub-search"
                label="BUSCAR"
                type="button"
            />

            <TableRender
                headers={handleHeaders}
                values={groups}
                onTableClick={handleTableClick}
                selectedRow={group}

            />

        </div>
    )
}

export default GroupListRender;