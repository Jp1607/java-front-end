import ActionsModal from "../../components/modals/ActionsModal";
import TableRender from "../../components/tableRender";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../css/listPage.css';
import ButtonsBar from "../../components/ButtonsBar";
import InputComponent from "../../components/inputs/InputComponent";
import { ProductDTO } from "../../api/entities/productDTO";
import { GETProducts, StateProduct } from "../../api/requests/productRequests";
import { capitalize } from "../../api/Methods/capitalizeFunction";
;


const ProductListRender: React.FC = () => {

    // const navigate = useNavigate();
    // const [open, setOpen] = React.useState<boolean>(false);


    const [openDelete, setOpenDelete] = React.useState<boolean>(false);

    const [searchItem, setSearchItem] = React.useState<string>('');
    const [productsDTO, setProductsDTO] = useState<ProductDTO[]>([])
    const [filteredProducts, setFilteredProducts] = useState([])

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
            const capitalizedProducts: ProductDTO[] =
                response.map((p: ProductDTO) => {
                    return {
                        ...p,
                        description: capitalize(p.description),
                        name: capitalize(p.name),
                        brandDesc: capitalize(p.brandDesc),
                        groupDesc: capitalize(p.groupDesc),
                        typeDesc: capitalize(p.typeDesc),
                        muDesc: capitalize(p.muDesc)

                    }
                })

            setProductsDTO(capitalizedProducts);
            setFilteredProducts(capitalizedProducts);
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

    // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const filterTerm = e.target.value;
    //     setSearchItem(filterTerm);

    //     const filteringProds = (values?: ProductDTO[]) => {
    //         if (values == undefined || values.length == 0 || values == null || filterTerm.length == 0) {
    //             const filtering = productsDTO.filter((p: ProductDTO) =>
    //                 p.name.includes(filterTerm.toUpperCase()))
    //             console.log(values + filterTerm)
    //             setFilteredProducts(filtering)
    //         } else {
    //             const filtering = values.filter((p: ProductDTO) =>
    //                 p.name.includes(filterTerm.toUpperCase()))
    //             console.log(values + filterTerm)
    //             setFilteredProducts(filtering)
    //         }
    //     }

    //     filteredProducts.length == null ? filteringProds() : filteringProds(filteredProducts);
    // }

    // const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const filterTerm = e.target.value;
    //     setSearchItem(filterTerm);

    //     const filteringProds =
    //         productsDTO.filter((p: ProductDTO) =>
    //             p.brandDesc.includes(filterTerm.toUpperCase()))

    //     setFilteredProducts(filteringProds);
    // }

    // const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const filterTerm = e.target.value;
    //     setSearchItem(filterTerm);

    //     const filteringProds = (values?: ProductDTO[]) => {
    //         if (values == undefined || values.length == 0 || values == null || filterTerm.length == 0) {
    //             const filtering = productsDTO.filter((p: ProductDTO) =>
    //                 p.brandDesc.includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         } else {
    //             const filtering = values.filter((p: ProductDTO) =>
    //                 p.brandDesc.includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         }
    //     }

    //     filteredProducts.length == null ? filteringProds() : filteringProds(filteredProducts);
    // }

    // const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const filterTerm = e.target.value;
    //     setSearchItem(filterTerm);

    //     const filteringProds = (values?: ProductDTO[]) => {
    //         if (values == undefined || values.length == 0 || values == null || filterTerm.length == 0) {
    //             const filtering = productsDTO.filter((p: ProductDTO) =>
    //                 p.groupDesc.includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         } else {
    //             const filtering = values.filter((p: ProductDTO) =>
    //                 p.groupDesc.includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         }
    //     }

    //     filteredProducts.length == null ? filteringProds() : filteringProds(filteredProducts);
    // }

    // const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const filterTerm = e.target.value;
    //     setSearchItem(filterTerm);

    //     const filteringProds = (values?: ProductDTO[]) => {
    //         if (values == undefined || values.length == 0 || values == null || filterTerm.length == 0) {
    //             const filtering = productsDTO.filter((p: ProductDTO) =>
    //                 p.typeDesc.includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         } else {
    //             const filtering = values.filter((p: ProductDTO) =>
    //                 p.typeDesc.includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         }
    //     }

    //     filteredProducts.length == null ? filteringProds() : filteringProds(filteredProducts);
    // }

    // const handleMUChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const filterTerm = e.target.value;
    //     setSearchItem(filterTerm);

    //     const filteringProds = (values?: ProductDTO[]) => {
    //         if (values == undefined || values.length == 0 || values == null || filterTerm.length == 0) {
    //             const filtering = productsDTO.filter((p: ProductDTO) =>
    //                 p.muDesc.includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         } else {
    //             const filtering = values.filter((p: ProductDTO) =>
    //                 p.muDesc.includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         }
    //     }

    //     filteredProducts.length == null ? filteringProds() : filteringProds(filteredProducts);
    // }

    // const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const filterTerm = e.target.value;
    //     setSearchItem(filterTerm);

    //     const filteringProds = (values?: ProductDTO[]) => {
    //         if (values == undefined || values.length == 0 || values == null || filterTerm.length == 0) {
    //             const filtering = productsDTO.filter((p: ProductDTO) =>
    //                 p.barCode.toString().includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         } else {
    //             const filtering = values.filter((p: ProductDTO) =>
    //                 p.barCode.toString().includes(filterTerm.toUpperCase()))
    //             setFilteredProducts(filtering)
    //         }
    //     }

    //     filteredProducts.length == null ? filteringProds() : filteringProds(filteredProducts);
    // }

    const handleSearch = (param: keyof ProductDTO, e: React.ChangeEvent<HTMLInputElement>) => {

        const filterTerm = e.target.value;
        setSearchItem(filterTerm);

        const filteringProds = (values?: ProductDTO[]) => {
            if (values) {
                const filtering = values.filter((p: ProductDTO) =>
                    p[param].toString().includes(filterTerm.toUpperCase()))
                setFilteredProducts(filtering)
            } else {
                const filtering = productsDTO.filter((p: ProductDTO) =>
                    p[param].toString().includes(filterTerm.toUpperCase()))
                setFilteredProducts(filtering)
            }
        }

        filteredProducts.length == 0 ? filteringProds() : filteringProds(filteredProducts);

    }

    return (
        <>

            <ActionsModal
                isOpen={openDelete}
                onClose={() => { setOpenDelete(false) }}
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
                        label="Código De Barras: "
                        type="number"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch("barCode", e)}
                    // action={handleCodeChange} 
                    />

                    <InputComponent
                        id="srcName"
                        label="Nome: "
                        type="text"
                        // value={searchItem}
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch("name", e)}
                    // action={handleNameChange}
                    // placeHolder="Produto" 
                    />

                    <InputComponent
                        id="srcMU"
                        label="Un. Medida: "
                        type="text"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch("muDesc", e)}
                    // action={handleMUChange} 
                    />

                    <InputComponent
                        id="srcType"
                        label="Tipo: "
                        type="text"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch("typeDesc", e)}
                    // action={handleTypeChange} 
                    />

                    <InputComponent
                        id="srcGroup"
                        label="Grupo: "
                        type="text"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch("groupDesc", e)}
                    // action={handleGroupChange} 
                    />

                    <InputComponent
                        id="srcBrand"
                        label="Marca: "
                        type="text"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch("brandDesc", e)}
                    // action={handleBrandChange} 
                    />

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


                    values={filteredProducts}
                    filter={filter}
                    selectedRow={productDTO}
                    onTableClick={handleTableClick}
                // onClickActions={() => setOpen(true)}
                />
            </div>

        </>
    )
}
export default ProductListRender;