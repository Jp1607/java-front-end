import ActionsModal from "../../components/modals/ActionsModal";
import TableRender from "../../components/tableRender";
import React, { useEffect, useState } from "react";
import '../css/listPage.css';
import ButtonsBar from "../../components/ButtonsBar";
import InputComponent from "../../components/inputs/InputComponent";
import { ProductDTO } from "../../api/entities/productDTO";
import { GETProducts, StateProduct } from "../../api/requests/productRequests";
import { capitalize } from "../../api/Methods/capitalizeFunction";
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

const ProductListRender: React.FC = () => {
    
    const [showActives, setShowActives] = React.useState<Active>({ description: '', value: false });
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [types, setTypes] = React.useState<Type[]>([]);
    const [MUs, setMUs] = React.useState<MU[]>([]);
    const [products, setProducts] = useState([])
    const [product, setProduct] = React.useState<Product>({
        active: null,
        barCode: null,
        brand: null,
        description: null,
        group: null,
        mu: null,
        name: null,
        type: null
    })
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

        await GETProducts().then((response: ProductDTO[]) =>setProducts(response)).catch(() => { })
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

    const handleSubmit = () => {  console.log('product', product);
        const brandId = product.brand ? product.brand.id : null;
        const groupId = product.group ? product.group.id : null;
        const typeId = product.type ? product.type.id : null;
        const muId = product.mu ? product.mu.id : null;
        GETProducts(product.name, product.barCode, brandId, groupId, typeId, muId, showActives.value).then((response: ProductDTO[]) => setProducts(response)).catch(() => { })
        
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
                            handleChange("barCode", parseInt(e.target.value))}
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

                    <ButtonComponent
                        action={handleSubmit}
                        id="sub-search"
                        label="BUSCAR"
                        type="button"
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
                    values={products}
                    selectedRow={productDTO}
                    onTableClick={handleTableClick}
                // onClickActions={() => setOpen(true)}
                />
            </div>

        </>
    )
}
export default ProductListRender;