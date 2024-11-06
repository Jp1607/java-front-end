import InputSelect from "./inputs/selectInput";
import InputComponent from "./inputs/InputComponent";
import { StorageCenter } from "../api/entities/storage";
import { ProductDTO } from "../api/entities/productDTO";
import Discount from "../api/services/DiscountType";
import "./css/saleItem.css"
import React, { useEffect } from "react";
import { GETProducts } from "../api/requests/productRequests";
import { GETStorages } from "../api/requests/saleRequest";
import { BuyItem } from "../api/entities/saleItem";

const BuyItemComponent: React.FC<{ buyItems: BuyItem[], changeAction: <T extends keyof BuyItem>(key: T, index: number, newValue: BuyItem[T]) => void }> = ({ buyItems, changeAction }) => {

    const [products, setProducts] = React.useState<ProductDTO[]>([]);
    const [productDTO, setProductDTO] = React.useState<Record<number, ProductDTO>>({});
    const [storages, setStorages] = React.useState<StorageCenter[]>([]);
    const [storage, setStorage] = React.useState<Record<number, StorageCenter>>({});

    useEffect(() => {
        GETProducts().then((response: ProductDTO[]) => setProducts(response)).catch(() => { });
    }, [])

    const setProductFunc = async (p: ProductDTO, index: number) => {
        setProductDTO(p);
        setProductDTO({
            ...productDTO,
            [index]: p
        });
        const STORAGES: StorageCenter[] = await GETStorages(p.id).then((response: StorageCenter[]) => response).catch(() => { return [] });
        setStorages(STORAGES);
        changeAction("productId", index, p.id);
    }

    const setStorageFunc = async (s: StorageCenter, index: number) => {
        setStorage(s);
        setStorage({
            ...storage,
            [index]: s
        });
        changeAction("storageCenterId", index, s.id);
    }

    return (
        <div>
            {buyItems.map((saleItem: BuyItem, index: number) => (
                <div key={index} id="sale-item-container">

                    <InputSelect<ProductDTO>
                        id="select-prod"
                        classname="sale-item-input"
                        idKey="id"
                        label="Produto"
                        labelKey="name"
                        onValueChange={(param) => setProductFunc(param, index)}
                        options={products}
                        value={productDTO[index] !== undefined ? productDTO[index] : null}
                    />

                    <InputComponent
                        classname="sale-item-input"
                        action={(e: React.ChangeEvent<HTMLInputElement>) => changeAction("quantity", index, parseInt(e.target.value))}
                        max={productDTO[index] !== undefined ? productDTO[index].currentStock : null}
                        id="qnt"
                        label="Quantidade"
                        type="number"
                    />

                    <InputSelect<StorageCenter>
                        classname="sale-item-input"
                        id="select-storage"
                        idKey="id"
                        label="Depósito"
                        labelKey="description"
                        onValueChange={(s) => setStorageFunc(s, index)}
                        options={storages}
                        value={storage[index] ? storage[index] : null}
                        readonly={productDTO ? false : true}
                    />

                </div>
            ))}
        </div>
    )
}

export default BuyItemComponent;