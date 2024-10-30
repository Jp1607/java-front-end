import React, { useEffect } from "react";
import { Product } from "../../api/entities/product"
import { StorageCenter } from "../../api/entities/storage"
import InputSelect from "../../components/inputs/selectInput"
import { GETProducts } from "../../api/requests/productRequests";
import { ProductDTO } from "../../api/entities/productDTO";
import InputComponent from "../../components/inputs/InputComponent";
import { GETStorages } from "../../api/requests/storageRequests";
import { SaleItem } from "../../api/entities/sellItem";
import { Discount } from "../../api/services/discountType";
import ButtonComponent from "../../components/buttons/Button";
import TableRender from "../../components/tableRender";
import ActionsModal from "../../components/modals/ActionsModal";

const SellProd = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [count, setCount] = React.useState<number>(0);
    const [products, setProducts] = React.useState<ProductDTO[]>([]);
    const [storages, setStorages] = React.useState<StorageCenter[]>([]);
    const [discount, setDiscount] = React.useState<Discount>();
    const [saleItems, setSaleItems] = React.useState<SaleItem[]>([]);
    const [saleItem, setSaleItem] = React.useState<SaleItem>({
        discountType: '',
        discountValue: 0,
        productId: 0,
        quantity: 0,
        storageCenterId: 0
    });
    const [storage, setStorage] = React.useState<StorageCenter>({
        active: false,
        description: '',
        excluded: false
    })
    const [product, setProduct] = React.useState<ProductDTO>({
        active: false,
        brandDesc: '',
        groupDesc: '',
        muDesc: '',
        typeDesc: '',
        barCode: '',
        name: '',
        description: '',
        storageId: 0
    });

    useEffect(() => {
        GETProducts().then((response: ProductDTO[]) => setProducts(response));
        GETStorages().then((response: StorageCenter[]) => setStorages(response));
    }, [])

    const handleChange = <T extends keyof SaleItem>(key: T, newValue: SaleItem[T]) => {

        const COPY_ITEM: SaleItem = Object.assign({}, saleItem);
        COPY_ITEM[key] = newValue;
        setSaleItem(COPY_ITEM);

    }

    const handleSubmit = () => {

    }

    const handleAction = (param: boolean, product: ProductDTO) => {
        setSaleItem(SaleItem(product))
        if (param) {
            saleItems.push(saleItem);
            setCount(count + 1);
        } else {
            const filtered = saleItems.filter((saleItem: SaleItem) => saleItem.productId == product.id)
            setSaleItems(filtered);
            setCount(count - 1);
        }
    }

    return (
        <div>

            <ActionsModal
                isOpen={open}
                onClose={() => setOpen(false)}
                closeLabel="CANCELAR"
                eventButtons={[
                    { label: "FINALIZAR", cb: () => SellProd }
                ]}
                title="FINALIZAR COMPRA"
            >
                <InputSelect<StorageCenter>
                    id="select-storage"
                    label="Centro de armazenamento"
                    idKey="id"
                    labelKey="description"
                    value={storage ? storage : null}
                    options={storages}
                    onValueChange={(storage: StorageCenter) =>
                        handleChange('storageCenterId', storage.id)}
                />

                <InputSelect<Discount>
                    id="select-discount"
                    label="Desconto"
                    idKey="id"
                    labelKey="type"
                    value={discount ? discount : null}
                    options={[
                        { id: 0, type: "PERCENTAGE" },
                        { id: 1, type: "DECIMAL" }
                    ]}
                    onValueChange={(discount: Discount) =>
                        handleChange('discountType', discount.type)}
                />


                <InputComponent
                    id="input-value"
                    label="Valor do desconto"
                    type="number"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("discountValue", parseInt(e.target.value))}
                />
            </ActionsModal>

            <TableRender<ProductDTO>
                values={products}
                count={count}
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
                productAction={handleAction}

            />

            <ButtonComponent
                id="sub-sell"
                label="FINALIZAR VENDA"
                type="submit"
                action={handleSubmit} />

        </div>
    )
}