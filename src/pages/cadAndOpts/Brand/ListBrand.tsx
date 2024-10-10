import React from "react"
import { Brand } from "../../../api/entities/brand"
import { GETBrand, GETBrands, PUTBrand, StateBrand } from "../../../api/requests/brandRequests"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"
import ButtonComponent from "../../../components/buttons/Button"
import { capitalize } from "../../../api/Methods/capitalizeFunction"

const BrandListRender = () => {

    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [brand, setBrand] = React.useState<Brand>({
        description: "",
        active: false
    });
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETBrands().then((response: Brand[]) => {
            const capitalizedBrands = response.map((b: Brand) => {
                return {
                    ...b,
                    description: capitalize(b.description)
                }
            })
            setBrands(capitalizedBrands);
        }).catch(() => { });

        console.log(brands);
    }

    React.useEffect(() => {

        requestGet()
    }, []);

    const filter = (r: Brand): boolean => {

        return (r.active ? false : true);
    }

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

        GETBrands(brand.description).then((response: Brand[]) => setBrands(response)).catch(() => { })
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

                {/* <InputComponent
                    id="BrandName"
                    label="Ativo: "
                    type="text"
                    className="search-filter"
                    action={() => { }} /> */}

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
                values={brands}
                filter={filter}
                onTableClick={handleTableClick}
                selectedRow={brand}

            />

        </div>
    )
}

export default BrandListRender;