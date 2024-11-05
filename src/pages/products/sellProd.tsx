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
import SaleItemComponent from "../../components/saleItemComponent";
import Payment from "../../api/paymentType";

const SellProd = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<ProductDTO[]>([]);
    const [subtotal, setSubtotal] = React.useState<number>(0);
    const [finalValue, setFinalValue] = React.useState<number>(0);
    const [totalQnt, setTotalQnt] = React.useState<number>(0);
    const [storages, setStorages] = React.useState<StorageCenter[]>([]);
    const [discount, setDiscount] = React.useState<Discount>();
    const [discountValue, setDiscountValue] = React.useState<number>(0);
    const [payment, setPayment] = React.useState<Payment>();
    const [saleItemsList, setSalesItemsList] = React.useState<SaleItem[]>([])
    const [newComponent, setNewComponent] = React.useState<boolean>(true);
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
        storageId: 0,
        currentStock: 0,
        negativeStock: false,
        price: 0
    });

    useEffect(() => {
        GETProducts().then((response: ProductDTO[]) => setProducts(response));
        GETStorages().then((response: StorageCenter[]) => setStorages(response));
    }, [])

    const handleChange = <T extends keyof SaleItem>(key: T, index: number, newValue: SaleItem[T]) => {
        console.log('change', key, index, newValue);
        const COPY_ITEM: SaleItem[] = Object.assign([], saleItemsList);
        COPY_ITEM[index][key] = newValue;

        let flag: boolean = true;
        for (let i = 0; i < COPY_ITEM.length; i++) {
            for (const VALUE of Object.values(COPY_ITEM[i])) {
                if (VALUE === undefined || VALUE === '' || VALUE === null) {
                    flag = false;
                }
            }
        }
        // setNewComponent(flag);
    }

    const handleSubmit = () => {
        POSTSell(saleItemsList, payment.type).then((response: String) => console.log(response)).catch(() => { })
        console.log(saleItemsList)
    }

    const handleAction = (param: boolean, product: ProductDTO) => {
        let sI: SaleItem;
        sI.storageCenterId = product.storageId;
        sI.productId = product.id;
        if (param) {
            let x = saleItemsList.find(saleItem => saleItem.productId == product.id);
            if (x) {
                x.quantity = x.quantity + 1;
            } else {
                saleItemsList.push(sI);
            }
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

    const calcInfo = () => {
        saleItemsList.map((saleItem: SaleItem, index: number) => {
            setTotalQnt(totalQnt + saleItem.quantity);
            const prod = products.find((product: ProductDTO) => product.id == saleItem.productId)
            setFinalValue(finalValue + (prod ? prod.price : 0));
            if (discount.id == 0) {
                setSubtotal(subtotal + (prod.price - prod.price / 100 * discountValue))
            } else {
                setSubtotal(subtotal + (prod.price - discountValue))
            }
        })
    }

    const handleNewComponent = () => {
        if (newComponent) {
            const item: SaleItem = {
                discountType: '',
                discountValue: 0,
                productId: undefined,
                quantity: 0,
                storageCenterId: undefined
            };
            setSalesItemsList([...saleItemsList, item]);
            // calcInfo();
            // setNewComponent(false);
        }
    }

    return (
        <div>
            <ActionsModal
                isOpen={open}
                onClose={() => setOpen(false)}
                closeLabel="CANCELAR"
                eventButtons={[
                    { label: "FINALIZAR", cb: () => handleSubmit }
                ]}
                title="FINALIZAR COMPRA"
            >
                <InputSelect<Payment>
                    id="select-payment"
                    idKey="id"
                    label="Forma de pagamento"
                    labelKey="desc"
                    onValueChange={(p) => setPayment(p)}
                    options={[
                        { id: 0, type: "CREDIT_CARD", desc: "CARTÃO DE CRÉDITO" },
                        { id: 1, type: "DEBIT_CARD", desc: "CARTÃO DE DÉBITO" }
                    ]}
                    value={payment ? payment : null}
                />
            </ActionsModal>
            <div id="header">

                <ButtonComponent
                    disable={!newComponent}
                    action={() => handleNewComponent()}
                    label="ADICIONAR ITEM"
                    type="button"
                />
                <ButtonComponent
                    action={() => { setSalesItemsList([]); setNewComponent(true) }}
                    label="LIMPAR VENDA"
                    type="button"
                />

            </div>

            <SaleItemComponent
                saleItems={saleItemsList}
                changeAction={handleChange}
                discountValueCB={(value) => setDiscountValue(value)}
            />

            <div id="footer">

                <ButtonComponent
                    id="sub-sell"
                    label="FINALIZAR VENDA"
                    type="submit"
                    action={() => setOpen(true)} />

                <label className="label-sale"> Quantidade de itens: {totalQnt} </label>
                <label className="label-sale"> Valor da venda: {finalValue} </label>
                <label className="label-sale"> Subtotal: {subtotal} </label>
            </div>
        </div>
    )
}

export default SellProd;