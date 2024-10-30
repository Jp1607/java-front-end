import ActionsModal from "../../components/modals/ActionsModal";
import TableRender, { Headers } from "../../components/tableRender";
import React, { useEffect, useState } from "react";
import '../css/listPage.css';
import ButtonsBar from "../../components/ButtonsBar";
import InputComponent from "../../components/inputs/InputComponent";
import { ProductDTO } from "../../api/entities/productDTO";
import { GETProducts, StateProduct } from "../../api/requests/productRequests";
import InputSelect from "../../components/inputs/selectInput";
import ButtonComponent from "../../components/buttons/Button";
import { Brand } from "../../api/entities/brand";
import { GETBrands } from "../../api/requests/brandRequests";
import { Group } from "../../api/entities/group";
import { Type } from "../../api/entities/type";
import { MU } from "../../api/entities/MU";
import { GETGroups } from "../../api/requests/groupRequests";
import { GETTypes } from "../../api/requests/typeRequests";
import { GETMUs } from "../../api/requests/MURequests";
import { Product } from "../../api/entities/product";
import Active from "../../api/services/activeInterface";
import { useNavigate } from "react-router-dom";

const ProductListRender: React.FC = () => {

    const navigate = useNavigate();
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [types, setTypes] = React.useState<Type[]>([]);
    const [MUs, setMUs] = React.useState<MU[]>([]);
    const [products, setProducts] = useState<ProductDTO[]>([])
    const [product, setProduct] = React.useState<Product>({
        active: null,
        barCode: null,
        brand: null,
        description: null,
        group: null,
        mu: null,
        name: null,
        type: null,
        storage: null,
        killed: null
    })
    const [productDTO, setProductDTO] = useState<ProductDTO>({
        name: '',
        description: "",
        barCode: '',
        active: false,
        brandDesc: '',
        groupDesc: '',
        typeDesc: '',
        muDesc: '',
        storageId: 0,
        currentStock: 0,
        negativeStock: '',
        price: 0,
        count: 0                                                                
    })

    const requestGetData = async () => {

        await GETProducts().then((response: ProductDTO[]) => setProducts(response)).catch(() => { })
        await GETBrands().then((reponse: Brand[]) => (setBrands(reponse))).catch(() => { })
        await GETGroups().then((reponse: Group[]) => (setGroups(reponse))).catch(() => { })
        await GETTypes().then((reponse: Type[]) => (setTypes(reponse))).catch(() => { })
        await GETMUs().then((reponse: MU[]) => (setMUs(reponse))).catch(() => { })
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

    const handleChange = <T extends keyof Product>(key: T, newValue: Product[T]) => {

        const COPY_PRODUCT: Product = Object.assign({}, product);
        COPY_PRODUCT[key] = newValue;
        setProduct(COPY_PRODUCT);

    }

    const handleSubmit = () => {
        console.log(product)
        const brandId = product.brand ? product.brand.id : null;
        const groupId = product.group ? product.group.id : null;
        const typeId = product.type ? product.type.id : null;
        const muId = product.mu ? product.mu.id : null;
        GETProducts(product.id, product.name, product.barCode, brandId, groupId, typeId, muId, product.active).then((response: ProductDTO[]) => setProducts(response)).catch(() => { })

    }

    const handleEdit = () => {

        if (productDTO.id) {
            navigate(`/editProd/${productDTO.id}`)
        } else {
            window.alert("Selecione um produto para edição válido")
        }
    }

    const handleView = () => {

        if (productDTO.id) {
            navigate(`/viewProd/${productDTO.id}`)
        } else {
            window.alert("Selecione um produto para visualização válido")
        }
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
                    Você tem certeza de que deseja deletar este produto? Ele será marcado no banco de dados e não poderá mais ser acessado.
                </p>

            </ActionsModal>

            <div className="default-content">

                <ButtonsBar
                    editIsPresent={true}
                    createPath="/createProd"
                    editAction={handleEdit}
                    viewAction={handleView}
                    excludeAction={() => setOpenDelete(true)}
                    reloadAction={requestGetData} />

                <form onSubmit={handleSubmit} id="search-filters-container">

                    <InputComponent
                        id="srcId"
                        label="Código Do Produto: "
                        type="number"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange("id", parseInt(e.target.value))}
                    />

                    <InputComponent
                        id="srcBarCod"
                        label="Código De Barras: "
                        type="number"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange("barCode", e.target.value.toString())}
                    />

                    <InputComponent
                        id="srcName"
                        label="Nome: "
                        type="text"
                        className="search-filter"
                        action={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange("name", e.target.value.toString())}
                    />

                    <InputSelect<Brand>
                        classname="search-filter"
                        id="select-brand"
                        label="Marca: "
                        value={product ? product.brand : null}
                        options={brands}
                        labelKey="description"
                        idKey="id"
                        onValueChange={(b: Brand) =>
                            handleChange("brand", b)} />

                    <InputSelect<Group>
                        classname="search-filter"
                        id="select-group"
                        label="Grupo: "
                        value={product ? product.group : null}
                        options={groups}
                        labelKey="description"
                        idKey="id"
                        onValueChange={(g: Group) =>
                            handleChange("group", g)} />

                    <InputSelect<Type>
                        classname="search-filter"
                        id="select-type"
                        label="Tipo: "
                        value={product ? product.type : null}
                        options={types}
                        labelKey="description"
                        idKey="id"
                        onValueChange={(t: Type) =>
                            handleChange('type', t)} />

                    <InputSelect<MU>
                        classname="search-filter"
                        id="select-mus"
                        label="Uni. de Medida: "
                        value={product ? product.mu : null}
                        options={MUs}
                        labelKey="description"
                        idKey="id"
                        onValueChange={(m: MU) =>
                            handleChange('mu', m)} />

                    <InputSelect<Active>
                        classname="search-filter"
                        id="search-filter-active"
                        label="Exibir desativados:"
                        idKey="value"
                        labelKey="description"
                        onValueChange={(active: Active) =>
                            handleChange('active', active.value)}
                        options={[
                            { description: "Exibir", value: true },
                            { description: "Não exibir", value: false }
                        ]}
                        value={product !== null ?
                            product.active ? { description: "Exibir", value: true } :
                                { description: "Não exibir", value: false } : null} />

                    <ButtonComponent
                        action={handleSubmit}
                        id="sub-search"
                        label="BUSCAR"
                        type="button"
                    />

                </form>

                <TableRender<ProductDTO>
                    headers={[
                        { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Código do produto' },
                        { gridType: 'FLEX', attributeName: 'name', width: 1, label: 'Produto' },
                        { gridType: 'FLEX', attributeName: 'description', width: 1, label: 'Descrição' },
                        { gridType: 'FLEX', attributeName: 'barCode', width: 1, label: 'Código de barras' },
                        { gridType: 'FLEX', attributeName: 'brandDesc', width: 1, label: 'Marca' },
                        { gridType: 'FLEX', attributeName: 'groupDesc', width: 1, label: 'Grupo' },
                        { gridType: 'FLEX', attributeName: 'typeDesc', width: 1, label: 'Tipo' },
                        { gridType: 'FLEX', attributeName: 'muDesc', width: 1, label: 'Unidade de Medida' },
                        { gridType: 'FLEX', attributeName: 'price', width: 1, label: 'Preço' },
                        { gridType: 'FLEX', attributeName: 'currentStock', width: 1, label: 'Em estoque' },
                        { gridType: 'FLEX', attributeName: 'negativeStock', width: 1, label: 'Permite estoque negativo' }
                    ]}
                    values={products}
                    onTableClick={handleTableClick}
                />
            </div>
        </>
    )
}
export default ProductListRender;