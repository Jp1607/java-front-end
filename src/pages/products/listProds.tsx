import ActionsModal from "../../components/modals/ActionsModal";
import TableRender from "../../components/tableRender";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../css/listPage.css';
import ButtonsBar from "../../components/ButtonsBar";
import InputComponent from "../../components/inputs/InputComponent";
import { Product } from "../../api/entities/product";
import { GETProducts, StateProduct } from "../../api/requests/productRequests";
;


const ProductListRender: React.FC = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState<boolean>(false);
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>({
        name: '',
        description: "",
        barCode: 0,
        active: false
    })

    const requestGetData = async () => {

        await GETProducts().then((response: Product[]) => {

            setProducts(response as Product[])
        }).catch(() => { })
    }

    useEffect(() => {

        requestGetData()
    }, [])

    const handleTableClick = (param: Product) => {

        setProduct(param as Product);
    }

    const handleState = (id: number): void => {

        StateProduct(id).catch(() => { })
    }

    const filter = (r: Product): boolean => {

        return (r.active == false ? true : false);
    }

    return (
        <>

            {/* <ActionsModal
                isOpen={openDelete}
                onClose={() => { setOpenDelete(false); setOpen(true) }}
                title="ATENÇÃO!"
                eventButtons={[
                    { label: 'DELETAR', cb: handleChangeState }
                ]}
            >

                <p>
                    Você tem certeza de que deseja deletar este produto?
                </p>

            </ActionsModal> */}

            {/* <ActionsModal

                isOpen={open}
                onClose={() => setOpen(false)}
                eventButtons={[
                    { label: 'DELETAR PRODUTO', cb: handleDeleteProduct },
                    { label: 'EDITAR', cb: handleEditAction }
                ]}
                title={"OPÇÕES "} /> */}


            <div className="default-content">

                <ButtonsBar
                    editIsPresent={true}
                    createPath="/createProd"
                    editPath={`/editProd/${product.id}`}
                    excludeAction={() => handleState(product.id)} />

                <div id="search-filters-container">

                    <InputComponent
                        id="srcCod"
                        label="Código: "
                        type="number"
                        className="search-filter"
                        action={() => { }} />

                    <InputComponent
                        id="srcName"
                        label="Nome: "
                        type="text"
                        className="search-filter"
                        action={() => { }}
                    // placeHolder="Produto" 
                    />

                    <InputComponent
                        id="srcMU"
                        label="Un. Medida: "
                        type="number"
                        className="search-filter"
                        action={() => { }} />

                    <InputComponent
                        id="srcType"
                        label="Tipo: "
                        type="text"
                        className="search-filter"
                        action={() => { }} />

                    <InputComponent
                        id="srcGroup"
                        label="Grupo: "
                        type="text"
                        className="search-filter"
                        action={() => { }} />

                    <InputComponent
                        id="srcBrand"
                        label="Marca: "
                        type="text"
                        className="search-filter"
                        action={() => { }} />

                </div>

                <TableRender<Product>

                    headers={[
                        { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Código do produto' },
                        { gridType: 'FLEX', attributeName: 'name', width: 1, label: 'Produto' },
                        { gridType: 'FLEX', attributeName: 'description', width: 1, label: 'Descrição' },
                        { gridType: 'FLEX', attributeName: 'barCode', width: 1, label: 'Código de barras' },
                        // { gridType: 'FLEX', attributeName: 'active', width: 1, label: 'Marca' },
                        // { gridType: 'FLEX', attributeName: 'active', width: 1, label: 'Grupo' },
                        // { gridType: 'FLEX', attributeName: 'active', width: 1, label: 'Tipo' },
                        // { gridType: 'FLEX', attributeName: 'active', width: 1, label: 'Unidade de Medida' }
                    ]}


                    values={products}
                    filter={filter}
                    selectedRow={product}
                    onTableClick={handleTableClick}
                    onClickActions={() => setOpen(true)}
                />
            </div>

        </>
    )
}
export default ProductListRender;