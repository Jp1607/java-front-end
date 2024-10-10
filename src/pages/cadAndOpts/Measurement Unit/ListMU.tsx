import React from "react"
import { MU } from "../../../api/entities/MU"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"
import { GETMUs, StateMU } from "../../../api/requests/MURequests"
import ButtonComponent from "../../../components/buttons/Button"
import { capitalize } from "../../../api/Methods/capitalizeFunction"

const MUListRender = () => {

    const [mus, setMUs] = React.useState<MU[]>([]);
    const [mu, setMU] = React.useState<MU>({
        description: "",
        active: false
    });
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETMUs().then((response: MU[]) => {
            const capitalizedMUs = response.map((m: MU) => {
                return {
                    ...m,
                    description: capitalize(m.description)
                }
            })
            setMUs(capitalizedMUs);
        }).catch(() => { });
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

        StateMU(mu.id)
        setShow(false)
    }

    const handleClose = () => {

        setShow(false);
    }

    const handleChange = <T extends keyof MU>(key: T, newValue: MU[T]) => {

        const COPY_MU: MU = Object.assign({}, mu);
        COPY_MU[key] = newValue;
        setMU(COPY_MU);

    }

    const handleSearch = () => {

        GETMUs(mu.description).then((response: MU[]) => setMUs(response)).catch(() => { })
    }

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
                editIsPresent={true}
                editPath={`/editMu/${mu.id}`}
                reloadAction={requestGet} />

            <div className="search-filters-container">

                <InputComponent
                    id="MUName"
                    label="Uni. de medida: "
                    type="text"
                    className="search-filter"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange('description', e.target.value.toString())} />

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
                values={mus}
                filter={filter}
                onTableClick={handleTableClick}
                selectedRow={mu}

            />

        </div>
    )
}

export default MUListRender;