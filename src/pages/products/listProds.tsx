import ActionsModal from "../../components/modals/ActionsModal";
import TableRender from "../../components/tableRender";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../css/listPage.css';
import ButtonsBar from "../../components/ButtonsBar";
import InputComponent from "../../components/inputs/InputComponent";
import { ProductDTO } from "../../api/entities/productDTO";
import { GETProducts, StateProduct } from "../../api/requests/productRequests";
;


const ProductListRender: React.FC = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState<boolean>(false);
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [productsDTO, setProductsDTO] = useState<ProductDTO[]>([])
    const [productDTO, setProductDTO] = useState<ProductDTO>({
        name: '',
        description: "",
        barCode: 0,
        active: false,
        brandDesc: '',
        groupDesc: '',
        typeDesc: '',
        muDesc: ''
    })

    const requestGetData = async () => {

        await GETProducts().then((response: ProductDTO[]) => {

            setProductsDTO(response as ProductDTO[])
        }).catch(() => { })
    }

    useEffect(() => {

        requestGetData()
    }, [])

    const handleTableClick = (param: ProductDTO) => {

        setProductDTO(param as ProductDTO);
    }

    const handleState = (id: number): void => {

        StateProduct(id).catch(() => { })
        setOpenDelete(false);
    }

    const filter = (r: ProductDTO): boolean => {

        return (r.active == false ? true : false);
    }

    return (
        <>

           <ActionsModal
                isOpen={openDelete}
                onClose={() => { setOpenDelete(false); setOpen(true) }}
                title="ATENÇÃO!"
                eventButtons={[
                    { label: 'DELETAR', cb: () => handleState(productDTO.id) }
                ]}
            >

                <p>
                    Você tem certeza de que deseja deletar este produto?
                </p>

            </ActionsModal> 

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
                    editPath={`/editProd/${productDTO.id}`}
                    excludeAction={() => setOpenDelete(true)}
                    reloadAction={requestGetData} />

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

                <TableRender<ProductDTO>

                    headers={[
                        { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Código do produto' },
                        { gridType: 'FLEX', attributeName: 'name', width: 1, label: 'Produto' },
                        { gridType: 'FLEX', attributeName: 'description', width: 1, label: 'Descrição' },
                        { gridType: 'FLEX', attributeName: 'barCode', width: 1, label: 'Código de barras' },
                        { gridType: 'FLEX', attributeName: 'brandDesc', width: 1, label: 'Marca' },
                        { gridType: 'FLEX', attributeName: 'groupDesc', width: 1, label: 'Grupo' },
                        { gridType: 'FLEX', attributeName: 'typeDesc', width: 1, label: 'Tipo' },
                        { gridType: 'FLEX', attributeName: 'muDesc', width: 1, label: 'Unidade de Medida' }
                    ]}


                    values={productsDTO}
                    filter={filter}
                    selectedRow={productDTO}
                    onTableClick={handleTableClick}
                    onClickActions={() => setOpen(true)}
                />
            </div>

        </>
    )
}
export default ProductListRender;