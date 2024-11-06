import React, { useEffect } from "react";
import InputSelect from "../../components/inputs/selectInput"
import { GETProducts } from "../../api/requests/productRequests";
import { ProductDTO } from "../../api/entities/productDTO";
import { SellItem } from "../../api/entities/saleItem";
import ButtonComponent from "../../components/buttons/Button";
import ActionsModal from "../../components/modals/ActionsModal";
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
    const [discountValue, setDiscountValue] = React.useState<number>(0);
    const [payment, setPayment] = React.useState<Payment>();
    const [saleItemsList, setSalesItemsList] = React.useState<SellItem[]>([])
    const [newComponent, setNewComponent] = React.useState<boolean>(true);

    useEffect(() => {
        GETProducts().then((response: ProductDTO[]) => setProducts(response));
    }, [])

    const handleChange = <T extends keyof SellItem>(key: T, index: number, newValue: SellItem[T]) => {
        console.log('change', key, index, newValue);
        const COPY_ITEM: SellItem[] = Object.assign([], saleItemsList);
        COPY_ITEM[index][key] = newValue;

        let flag: boolean = true;
        for (let i = 0; i < COPY_ITEM.length; i++) {
            for (const VALUE of Object.values(COPY_ITEM[i])) {
                if (VALUE === undefined || VALUE === '' || VALUE === null) {
                    flag = false;
                }
            }
        }
        setNewComponent(flag);
    }

    const handleSubmit = () => {
        console.log(saleItemsList)
        POSTSell(saleItemsList, payment.type).then((response: String) => console.log(response)).catch(() => { })
    }

    const calcInfo = () => {
        saleItemsList.map((saleItem: SellItem, index: number) => {
            setTotalQnt(totalQnt + saleItem.quantity);
            const prod = products.find((product: ProductDTO) => product.id == saleItem.productId)
            setFinalValue(finalValue + (prod ? prod.price * saleItem.quantity : 0));
            if (saleItem.discountType == "PERCENTAGE") {
                setSubtotal(subtotal + (prod.price - prod.price / 100 * discountValue) * saleItem.quantity)
            } else {
                setSubtotal(subtotal + (prod.price - discountValue) * saleItem.quantity)
            }
        })
    }

    const handleNewComponent = () => {
        if (newComponent) {
            const item: SellItem = {
                discountType: '',
                discountValue: 0,
                productId: undefined,
                quantity: 0,
                storageCenterId: undefined
            };
            setSalesItemsList([...saleItemsList, item]);
            setNewComponent(false);
            calcInfo()
        }
    }

    return (
        <div id="sell-page">
            <ActionsModal
                classname="finish-sale"
                isOpen={open}
                onClose={() => setOpen(false)}
                closeLabel="CANCELAR"
                eventButtons={
                    [
                        <ButtonComponent
                            disable={payment ? false : true}
                            label="FINALIZAR"
                            type="button"
                            action={() => handleSubmit()}
                        />
                    ]
                }
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
                    classname="header-button"
                    disable={!newComponent}
                    action={() => handleNewComponent()}
                    label="ADICIONAR ITEM"
                    type="button"
                />
                <ButtonComponent
                    classname="header-button"
                    action={() => {
                        setSalesItemsList([]);
                        setNewComponent(true)
                    }}
                    label="LIMPAR VENDA"
                    type="button"
                />

            </div>
            {saleItemsList.length >= 1 &&
            <hr/>
            }
            <div id="body">

                <SaleItemComponent
                    saleItems={saleItemsList}
                    changeAction={handleChange}
                    discountValueCB={(value) => setDiscountValue(value)}
                />

            </div>
            {saleItemsList.length >= 1 &&
            <hr/>
            }
            <div id="footer">

                <label className="label-sale"> Quantidade de itens: {totalQnt} </label>
                <label className="label-sale"> Valor total: {finalValue} </label>
                <label className="label-sale"> Subtotal: {subtotal} </label>

                <ButtonComponent
                    id="sub-sell"
                    label="FINALIZAR VENDA"
                    type="submit"
                    action={() => setOpen(true)} />

            </div>
        </div>
    )
}

export default SellProd;