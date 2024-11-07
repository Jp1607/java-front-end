import InputSelect from "./inputs/selectInput";
import InputComponent from "./inputs/InputComponent";
import { StorageCenter } from "../api/entities/storage";
import { ProductDTO } from "../api/entities/productDTO";
import Discount from "../api/services/DiscountType";
import "./css/saleItem.css"
import React, { useEffect } from "react";
import { GETProducts } from "../api/requests/productRequests";
import { GETStorages } from "../api/requests/saleRequest";
import { SellItem } from "../api/entities/saleItem";

const SaleItemComponent: React.FC<{ saleItems: SellItem[], discountValueCB: (param: number) => void, changeAction: <T extends keyof SellItem>(key: T, index: number, newValue: SellItem[T]) => void }> = ({ saleItems, discountValueCB, changeAction }) => {

    const [products, setProducts] = React.useState<ProductDTO[]>([]);
    const [productDTO, setProductDTO] = React.useState<Record<number, ProductDTO>>({});
    const [storages, setStorages] = React.useState<StorageCenter[]>([]);
    const [discount, setDiscount] = React.useState<Record<number, Discount>>({});
    const [storage, setStorage] = React.useState<Record<number, StorageCenter>>({});
    const [productExists, setProductExists] = React.useState<boolean>(false)

    useEffect(() => {
        GETProducts().then((response: ProductDTO[]) => setProducts(response)).catch(() => { });
    }, [])

    const setProductFunc = async (p: ProductDTO, index: number) => {
        setProductExists(true);
        setProductDTO(p);
        setProductDTO({
            ...productDTO,
            [index]: p
        });
        const STORAGES: StorageCenter[] = await GETStorages(p.id).then((response: StorageCenter[]) => response).catch(() => { return [] });
        setStorages(STORAGES);
        changeAction("productId", index, p.id);
    }

    const setDiscountFunc = async (d: Discount, index: number) => {
        setProductExists(true);
        setDiscount(d);
        setDiscount({
            ...discount,
            [index]: d
        });
        changeAction("discountType", index, d.type);
    }

    const setStorageFunc = async (s: StorageCenter, index: number) => {
        setProductExists(true);
        setStorage(s);
        setStorage({
            ...storage,
            [index]: s
        });
        changeAction("storageCenterId", index, s.id);
    }

    return (
        <div>
            {saleItems.map((saleItem: SellItem, index: number) => (
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

                    <InputSelect<StorageCenter>
                        classname="sale-item-input"
                        id="select-storage"
                        idKey="id"
                        label="Depósito"
                        labelKey="description"
                        onValueChange={(s) => setStorageFunc(s, index)}
                        options={storages}
                        value={storage[index] ? storage[index] : null}
                        readonly={!productExists}
                    />

                    <InputSelect<Discount>
                        classname="sale-item-input"
                        id="select-discount"
                        idKey="id"
                        label="Tipo de desconto"
                        labelKey="desc"
                        onValueChange={(d) => setDiscountFunc(d, index)}
                        options={[
                            { id: 0, type: "PERCENTAGE", desc: "Porcentagem" },
                            { id: 1, type: "DECIMAL", desc: "Decimal" }
                        ]}
                        value={discount[index] ? discount[index] : null}
                        readonly={!productExists}
                    />

                    <InputComponent
                        classname="sale-item-input"
                        id="discount-value"
                        action={(e) => {
                            discountValueCB(parseInt(e.target.value))
                            changeAction("discountValue", index, parseInt(e.target.value))
                        }}
                        label="Valor do desconto"
                        type="number"
                        readonly={!productExists}
                    />

                            <InputComponent
        
                                classname="sale-item-input"
                                action={(e: React.ChangeEvent<HTMLInputElement>) => changeAction("quantity", index, parseInt(e.target.value))}
                                max={productDTO[index] !== undefined ? productDTO[index].currentStock : null}
                                id="qnt"
                                label="Quantidade"
                                type="number"
                                readonly={!productExists}
                            />
                </div>
            ))}
        </div>
    )
}

export default SaleItemComponent;