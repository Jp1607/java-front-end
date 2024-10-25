import React from "react"
import { MU } from "../../../api/entities/MU"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender, {Headers} from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"
import { GETMUs, StateMU } from "../../../api/requests/MURequests"
import ButtonComponent from "../../../components/buttons/Button"
import { capitalize } from "../../../api/Methods/capitalizeFunction"
import Active from "../../../api/services/activeInterface"
import InputSelect from "../../../components/inputs/selectInput"
import { useNavigate } from "react-router-dom"

const MUListRender = () => {

    const navigate = useNavigate();

    const [showActives, setShowActives] = React.useState<Active>({ description: '', value: false });
    const [mus, setMUs] = React.useState<MU[]>([]);
    const [mu, setMU] = React.useState<MU>({
        description: "",
        active: false
    });
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETMUs().then((response: MU[]) => setMUs(response)).catch(() => { });
    }

    React.useEffect(() => {

        requestGet();

    }, []);

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

        GETMUs(mu.description, showActives.value).then((response: MU[]) => setMUs(response)).catch(() => { })
    }

    const handleView = () => {

        if (mu.id) {
            navigate(`/viewMU/${mu.id}`)
        } else {
            window.alert("Selecione uma unidade válida")
        }
    }
    const handleEdit = () => {

        if (mu.id) {
            navigate(`/editMU/${mu.id}`)
        } else {
            window.alert("Selecione uma unidade válida")
        }
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
                editAction={handleEdit}
                viewAction={handleView}
                reloadAction={requestGet} />

            <form onSubmit={handleSearch} className="search-filters-container">

                <InputComponent
                    id="MUName"
                    label="Uni. de medida: "
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


            </form>

            <ButtonComponent
                action={handleSearch}
                id="sub-search"
                label="BUSCAR"
                type="button"
            />

            <TableRender
                headers={[
                    { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Identificador' },
                    { gridType: 'FLEX', attributeName: 'description', width: 1, label: 'Nome' }
                ]}
                values={mus}
                onTableClick={handleTableClick}
            />

        </div>
    )
}

export default MUListRender;