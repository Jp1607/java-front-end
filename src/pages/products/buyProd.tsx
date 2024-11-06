import React, { useEffect } from "react";
import InputSelect from "../../components/inputs/selectInput"
import { GETProducts } from "../../api/requests/productRequests";
import { ProductDTO } from "../../api/entities/productDTO";
import ButtonComponent from "../../components/buttons/Button";
import ActionsModal from "../../components/modals/ActionsModal";
import "../css/sellProd.css"
import { POSTBuy, POSTSell } from "../../api/requests/saleRequest";
import BuyItemComponent from "../../components/buyItemComponent";
import { BuyItem } from "../../api/entities/saleItem";

const BuyProd = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<ProductDTO[]>([]);
    const [subtotal, setSubtotal] = React.useState<number>(0);
    const [totalQnt, setTotalQnt] = React.useState<number>(0);
    const [buyItemList, setSalesItemsList] = React.useState<BuyItem[]>([])
    const [newComponent, setNewComponent] = React.useState<boolean>(true);

    useEffect(() => {
        GETProducts().then((response: ProductDTO[]) => setProducts(response));
    }, [])

    const handleChange = <T extends keyof BuyItem>(key: T, index: number, newValue: BuyItem[T]) => {
        console.log('change', key, index, newValue);
        const COPY_ITEM: BuyItem[] = Object.assign([], buyItemList);
        COPY_ITEM[index][key] = newValue;

        let flag: boolean = true;
        for (let i = 0; i < COPY_ITEM.length; i++) {
            for (const VALUE of Object.values(COPY_ITEM[i])) {
                if (VALUE === undefined || VALUE === null) {
                    flag = false;
                }
            }
        }
        setNewComponent(flag);
    }

    const handleSubmit = () => {
        POSTBuy(buyItemList).then((response: String) => console.log(response)).catch(() => { })
    }

    const calcInfo = () => {
        buyItemList.map((buyItem: BuyItem, index: number) => {
            setTotalQnt(totalQnt + buyItem.quantity);
            const prod = products.find((product: ProductDTO) => product.id == buyItem.productId)
            setSubtotal(subtotal + prod.price * buyItem.quantity)
        })
    }


const handleNewComponent = () => {
    if (newComponent) {
        const item: BuyItem = {
            productId: undefined,
            quantity: 0,
            storageCenterId: undefined
        };
        setSalesItemsList([...buyItemList, item]);
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
                        label="FINALIZAR"
                        type="button"
                        action={() => handleSubmit()}
                    />
                ]
            }
            title="FINALIZAR COMPRA"
        >

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
        {buyItemList.length >= 1 &&
            <hr/>
            }
        <div id="body">

            <BuyItemComponent
                buyItems={buyItemList}
                changeAction={handleChange}
            />

        </div>
        {buyItemList.length >= 1 &&
            <hr/>
            }
        <div id="footer">

            <label className="label-sale"> Quantidade de itens: {totalQnt} </label>
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

export default BuyProd;