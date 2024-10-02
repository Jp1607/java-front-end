import React from "react"
import { Type } from "../../../api/entities/type"
import { GETType, GETTypes, PUTType } from "../../../api/requests/typeRequests"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"

const TypeListRender = () => {

    const [types, setTypes] = React.useState<Type[]>([]);
    const [type, setType] = React.useState<Type>(null);
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETTypes().then((response: Type[]) => (
            setTypes(response)
        )).catch(() => { });

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

        PUTType(type.id)
        setShow(false)
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
                    { label: "DELETAR", cb: () => handleDelete(type) }
                ]}>

            </ActionsModal>

            <ButtonsBar
                createPath="/createType"
                excludeAction={handleShow} 
                reloadAction={requestGet}/>

            <div className="default-content">

                <InputComponent
                    id="TypeId"
                    label="Código: "
                    type="number"
                    className="search-filter"
                    action={() => { }} />

                <InputComponent
                    id="TypeName"
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
                values={types}
                filter={filter}
                onTableClick={handleTableClick}
                selectedRow={type}

            />

        </div>
    )
}

export default TypeListRender;