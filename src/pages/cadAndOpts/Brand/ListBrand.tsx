import React from "react"
import { Brand } from "../../../api/entities/brand"
import { GETBrand, GETBrands, PUTBrand } from "../../../api/requests/brandRequests"
import ButtonsBar from "../../../components/ButtonsBar"
import InputComponent from "../../../components/inputs/InputComponent"
import TableRender from "../../../components/tableRender"
import ActionsModal from "../../../components/modals/ActionsModal"

const BrandListRender = () => {

    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [brand, setBrand] = React.useState<Brand>(null);
    const [show, setShow] = React.useState<boolean>(false);

    const requestGet = async () => {

        await GETBrands().then((response: Brand[]) => (
            setBrands(response)
        )).catch(() => { });

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

        PUTBrand(brand.id)
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
                    { label: "DELETAR", cb: () => handleDelete(brand) }
                ]}>

            </ActionsModal>

            <ButtonsBar
                createPath="/createBrand"
                excludeAction={handleShow} />

            <div className="default-content">

                <InputComponent
                    id="BrandId"
                    label="Código: "
                    type="number"
                    className="search-filter"
                    action={() => { }} />

                <InputComponent
                    id="BrandName"
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
                values={brands}
                filter={filter}
                onTableClick={handleTableClick}
                selectedRow={brand}

            />

        </div>
    )
}

export default BrandListRender;