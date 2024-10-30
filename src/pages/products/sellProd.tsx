import React, { useEffect } from "react";
import { Product } from "../../api/entities/product"
import { StorageCenter } from "../../api/entities/storage"
import InputSelect from "../../components/inputs/selectInput"
import { GETProducts } from "../../api/requests/productRequests";
import { ProductDTO } from "../../api/entities/productDTO";
import InputComponent from "../../components/inputs/InputComponent";
import { GETStorages } from "../../api/requests/storageRequests";
import { SaleItem } from "../../api/entities/sellItem";
import ButtonComponent from "../../components/buttons/Button";
import TableRender from "../../components/tableRender";
import ActionsModal from "../../components/modals/ActionsModal";
import { Discount } from "../../api/services/DiscountType";
import "../css/sellProd.css"
import { POSTSell } from "../../api/requests/saleRequest";

const SellProd = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<ProductDTO[]>([]);
    const [subtotal, setSubtotal] = React.useState<number>(0);
    const [finalValue, setFinalValue] = React.useState<number>(0);
    const [totalQnt, setTotalQnt] = React.useState<number>(0);
    const [storages, setStorages] = React.useState<StorageCenter[]>([]);
    const [discount, setDiscount] = React.useState<Discount>();
    const [discountValue, setDiscountValue] = React.useState<number>();
    const [saleItemsList, setSalesItemsList] = React.useState<SaleItem[]>([])
    const [saleItem, setSaleItem] = React.useState<SaleItem>({
        // discountType: '',
        //  discountValue: 0,
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
        count: 0,
        active: false,
        brandDesc: '',
        groupDesc: '',
        muDesc: '',
        typeDesc: '',
        barCode: '',
        name: '',
        description: '',
        storageId: 0,
        currentStock: 0,
        negativeStock: '',
        price: 0
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
        POSTSell(saleItemsList, discount, discountValue).then((response: String) => console.log(response)).catch(() => {})
        console.log(saleItemsList)
    }
    
    const handleAction = (param: boolean, product: ProductDTO) => {
        setSaleItem(SaleItem(product))
        saleItem.storageCenterId = product.storageId;
        if (param) {
            let x = saleItemsList.find(saleItem => saleItem.productId == product.id);
            if(x){
              x.quantity = x.quantity + 1;
            } else {
                saleItemsList.push(saleItem);
            }
            console.log(saleItemsList)
        } else {
            let x = saleItemsList.find(saleItem => saleItem.productId = product.id)
            if (x.quantity > 1) {
                x.quantity = x.quantity - 1;
            } else {
                const filtered = saleItemsList.filter((saleItem: SaleItem) => saleItem.productId == product.id)
                setSalesItemsList(filtered);
            }
        }
    }

    return (
        <div>
            <div id="header">

                <InputSelect<Discount>
                    id="select-discount"
                    label="Desconto"
                    idKey="id"
                    labelKey="desc"
                    value={discount ? discount : null}
                    options={[
                        { id: 0, type: "PERCENTAGE", desc: "Porcentagem" },
                        { id: 1, type: "DECIMAL", desc: "Decimal" }
                    ]}
                    onValueChange={(discount: Discount) =>
                      setDiscount(discount)}
                />

                <InputComponent
                    id="input-value"
                    label="Valor do desconto"
                    type="number"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                       setDiscountValue(parseInt(e.target.value))} />
{/* 
                <InputSelect<StorageCenter>
                    id="select-storage"
                    label="Centro de armazenamento"
                    idKey="id"
                    labelKey="description"
                    value={storage ? storage : null}
                    options={storages}
                    onValueChange={(storage: StorageCenter) =>
                        handleChange('storageCenterId', storage.id)}
                /> */}

            </div>
            <ActionsModal
                isOpen={open}
                onClose={() => setOpen(false)}
                closeLabel="CANCELAR"
                eventButtons={[
                    { label: "FINALIZAR", cb: () => SellProd }
                ]}
                title="FINALIZAR COMPRA"
            >

            </ActionsModal>

            <TableRender<ProductDTO>
                values={products}
                count={product.count}
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
                productAction={handleAction}

            />
            <div id="footer">

                <ButtonComponent
                    id="sub-sell"
                    label="FINALIZAR VENDA"
                    type="submit"
                    action={handleSubmit} />

                <label className="label-sale"> Subtotal da venda: {subtotal} </label>
                <label className="label-sale"> Valor final: {finalValue} </label>
                <label className="label-sale"> Quantidade de itens: {totalQnt} </label>
            </div>
        </div>
    )
}

export default SellProd;