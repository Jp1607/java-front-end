import React from "react"
import { Type } from "../../../api/entities/type"
import { GETType, GETTypes, PUTType, StateType } from "../../../api/requests/typeRequests"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"
import ButtonComponent from "../../../components/buttons/Button"
import { capitalize } from "../../../api/Methods/capitalizeFunction"

const TypeListRender = () => {

    const [types, setTypes] = React.useState<Type[]>([]);
    const [type, setType] = React.useState<Type>({
        description: "",
        active: false
    });
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETTypes().then((response: Type[]) => {
            const capitalizedTypes = response.map((t: Type) => {
                return {
                    ...t,
                    description: capitalize(t.description)
                }
            })
            setTypes(capitalizedTypes);
        }).catch(() => { });

        console.log(types);
    }

    React.useEffect(() => {

        requestGet()

    }, []);

    const filter = (r: Type): boolean => {

        return (r.active ? false : true);
    }

    const handleTableClick = (r: Type) => {

        setType(r);
    }

    const handleShow = () => {

        setShow(true)
    }

    const handleDelete = (type: Type) => {

        StateType(type.id)
        setShow(false)
    }

    const handleClose = () => {

        setShow(false);
    }

    const handleChange = <T extends keyof Type>(key: T, newValue: Type[T]) => {

        const COPY_TYPE: Type = Object.assign({}, type);
        COPY_TYPE[key] = newValue;
        setType(COPY_TYPE);

    }

    const handleSearch = () => {

        GETTypes(type.description).then((response: Type[]) => setTypes(response)).catch(() => { })
    }

    return (

        <div>

            <ActionsModal
                isOpen={show}
                onClose={handleClose}
                closeLabel="CANCELAR"
                eventButtons={[
                    { label: "DELETAR", cb: () => handleDelete(type) }
                ]}>

            </ActionsModal>

            <ButtonsBar
                createPath="/createType"
                excludeAction={handleShow}
                editIsPresent={true}
                editPath={`/editType/${type.id}`}
                reloadAction={requestGet} />

            <div className="search-filters-container">

                <InputComponent
                    id="TypeName"
                    label="Tipo: "
                    type="text"
                    className="search-filter"
                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value.toString())} />

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
                values={types}
                filter={filter}
                onTableClick={handleTableClick}
                selectedRow={type}

            />

        </div>
    )
}

export default TypeListRender;