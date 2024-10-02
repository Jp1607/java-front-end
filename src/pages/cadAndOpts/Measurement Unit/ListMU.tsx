import React from "react"
import { MU } from "../../../api/entities/MU"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"
import { GETMUs, PUTMU } from "../../../api/requests/MURequests"

const MUListRender = () => {

    const [mus, setMUs] = React.useState<MU[]>([]);
    const [mu, setMU] = React.useState<MU>(null);
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = () => {

        GETMUs().then((response: MU[]) => {
            setMUs(response.filter((r: MU) => r.active));
        }).catch(() => { });

        console.log(mus);
    }

    React.useEffect(() => {

        requestGet();
    }, []);

    const filter = (r: MU): boolean => {

        return (r.active ? false : true);
    }

    const handleTableClick = (r: MU) => {

        setMU(r);
    }

    const handleShow = () => {

        setShow(true)
    }

    const handleDelete = (mu: MU) => {

        PUTMU(mu.id)
        setShow(false)
    }

    const handleClose = () => {

        setShow(false);
    }

    console.log(mus)

    return (

        <div>

            <ActionsModal
                isOpen={show}
                onClose={handleClose}
                closeLabel="CANCELAR"
                eventButtons={[
                    { label: "DELETAR", cb: () => handleDelete(mu) }
                ]}>

            </ActionsModal>

            <ButtonsBar
                createPath="/createMU"
                excludeAction={handleShow} 
                reloadAction={requestGet}/>

            <div className="default-content">

                <InputComponent
                    id="MUId"
                    label="Código: "
                    type="number"
                    className="search-filter"
                    action={() => { }} />

                <InputComponent
                    id="MUName"
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
                values={mus}
                filter={filter}
                onTableClick={handleTableClick}
                selectedRow={mu}

            />

        </div>
    )
}

export default MUListRender;