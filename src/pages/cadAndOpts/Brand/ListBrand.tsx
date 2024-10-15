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

const HEADERS: Headers<Brand>[] = [
    { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Identificador' },
    { gridType: 'FLEX', attributeName: 'description', width: 1, label: 'Nome' }
]

const BrandListRender = () => {

    const [show, setShow] = React.useState<boolean>(false);
    const [showActives, setShowActives] = React.useState<Active>({ description: '', value: false });
    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [brand, setBrand] = React.useState<Brand>({
        description: "",
        active: false
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

    const handleHeaders = React.useMemo((): Headers<Brand>[] => {
        const h = Object.assign([], HEADERS);
        if (showActives.value) {
            h.push({ gridType: 'FLEX', attributeName: 'active', width: 1, label: 'Estado' });
        }
        return h;
    }, [showActives])

    const handleSearch = () => {

        GETBrands(brand.description, showActives.value).then((response: Brand[]) => setBrands(response)).catch(() => { })
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
                editPath={`/editBrand/${brand.id}`}
                reloadAction={requestGet} />

            <div className="search-filters-container">

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


            </div>

            <ButtonComponent
                action={handleSearch}
                id="sub-search"
                label="BUSCAR"
                type="button"
            />

            <TableRender
                headers={handleHeaders}
                values={brands}
                onTableClick={handleTableClick}
                selectedRow={brand}

            />

        </div>
    )
}

export default BrandListRender;