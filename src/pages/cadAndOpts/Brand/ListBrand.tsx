import React from "react"
import { Brand } from "../../../api/entities/brand"
import { GETBrands, StateBrand } from "../../../api/requests/brandRequests"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender, {Headers} from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"
import ButtonComponent from "../../../components/buttons/Button"
import Active from "../../../api/services/activeInterface"
import InputSelect from "../../../components/inputs/selectInput"
import { useNavigate } from "react-router-dom"

const BrandListRender = () => {

    const navigate = useNavigate();

    const [show, setShow] = React.useState<boolean>(false);
    const [showActives, setShowActives] = React.useState<Active>({ description: '', value: false });
    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [brand, setBrand] = React.useState<Brand>({
        description: "",
        active: false,
        killed: 0
    });

    const requestGet = async () => {

        await GETBrands().then((response: Brand[]) => setBrands(response)).catch(() => { });
    }

    React.useEffect(() => {

        requestGet()
    }, []);

    const handleTableClick = (r: Brand) => {

        setBrand(r);
    }

    const handleShow = () => {

        setShow(true)
    }

    const handleDelete = (brand: Brand) => {

        StateBrand(brand.id)
        setShow(false)
    }

    const handleClose = () => {

        setShow(false);
    }

    const handleChange = <T extends keyof Brand>(key: T, newValue: Brand[T]) => {

        const COPY_BRAND: Brand = Object.assign({}, brand);
        COPY_BRAND[key] = newValue;
        setBrand(COPY_BRAND);

    }

    const handleSearch = () => {

        GETBrands(brand.description, showActives.value).then((response: Brand[]) => setBrands(response)).catch(() => { })
    }

    const handleView = () => {

        if (brand.id) {
            navigate(`/viewBrand/${brand.id}`)
        } else {
            window.alert("Selecione uma marca para válida")
        }
    }
    const handleEdit = () => {

        if (brand.id) {
            navigate(`/editBrand/${brand.id}`)
        } else {
            window.alert("Selecione uma marca válida")
        }
    }

    return (

        <div>

            <ActionsModal
                isOpen={show}
                onClose={handleClose}
                closeLabel="CANCELAR"
                eventButtons={[
                    { label: "DELETAR", cb: () => handleDelete(brand) }
                ]}>

            </ActionsModal>

            <ButtonsBar
                createPath="/createBrand"
                excludeAction={handleShow}
                editIsPresent={true}
                editAction={handleEdit}
                viewAction={handleView}
                reloadAction={requestGet} />

            <form onSubmit={handleSearch} className="search-filters-container">

                <InputComponent
                    id="BrandId"
                    label="Marca: "
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
                values={brands}
                onTableClick={handleTableClick}
            />

        </div>
    )
}

export default BrandListRender;