import { JsxElement } from "typescript";
import InputSelect from "./inputs/selectInput";
import InputComponent from "./inputs/InputComponent";
import { StorageCenter } from "../api/entities/storage";
import { Product } from "../api/entities/product";
import { ProductDTO } from "../api/entities/productDTO";
import Discount from "../api/services/DiscountType";
import "./css/saleItem.css"
import React, { useEffect } from "react";
import { GETProducts } from "../api/requests/productRequests";
import { GETStorages } from "../api/requests/saleRequest";
import { SaleItem } from "../api/entities/sellItem";

function defaultProductDTO(): ProductDTO {
    return {
        active: false,
        barCode: '',
        brandDesc: '',
        currentStock: 0,
        description: '',
        groupDesc: '',
        muDesc: '',
        name: '',
        negativeStock: false,
        price: 0,
        storageId: 0,
        typeDesc: '',
    }
}

type JAO_GAY = 'BIXA' | 'VIADO';

const X: Record<string, JAO_GAY> = {
    'a': "BIXA",
    'b': "BIXA" 
}

const SaleItemComponent: React.FC<{ saleItems: SaleItem[], discountValueCB: (param: number) => void, changeAction: <T extends keyof SaleItem>(key: T, index: number, newValue: SaleItem[T]) => void }> = ({ saleItems, discountValueCB, changeAction }) => {

    const [products, setProducts] = React.useState<ProductDTO[]>([]);
    const [productDTO, setProductDTO] = React.useState<Record<number, ProductDTO>>({});
    const [storages, setStorages] = React.useState<StorageCenter[]>([]);
    const [discount, setDiscount] = React.useState<Discount>(undefined);
    const [storage, setStorage] = React.useState<StorageCenter>(undefined);

    useEffect(() => {
        GETProducts().then((response: ProductDTO[]) => setProducts(response)).catch(() => { });
    }, [])

    const japGay = async (p: ProductDTO, index: number) => {
        setProductDTO(p);
        // setProductDTO((previous: Record<number, ProductDTO>) => ({
        //     ...previous,
        //     [index]: p
        // }));
        setProductDTO({
            ...productDTO,
            [index]: p
        });
        const STORAGES: StorageCenter[] = await GETStorages(p.id).then((response: StorageCenter[]) => response).catch(() => { return [] });
        setStorages(STORAGES);
        changeAction("productId", index, p.id);
    }

    console.log(productDTO, storage);

    return (
        <div id="sale-item-container">
            {saleItems.map((saleItem: SaleItem, index: number) => (
                <div key={index}>

                    <InputSelect<ProductDTO>
                        id="select-prod"
                        idKey="id"
                        label="Produto"
                        labelKey="name"
                        onValueChange={(param) => japGay(param, index)}
                        options={products}
                        value={productDTO[index] !== undefined ? productDTO[index] : null}
                    />

                    <InputComponent
                        action={(e: React.ChangeEvent<HTMLInputElement>) => changeAction("quantity", index, parseInt(e.target.value))}
                        max={productDTO[index] !== undefined ? productDTO[index].currentStock : null}
                        id="qnt"
                        label="Quantidade"
                        type="number"
                    />

                    <InputSelect<StorageCenter>
                        id="select-storage"
                        idKey="id"
                        label="Depósito"
                        labelKey="description"
                        onValueChange={(s) => {
                            changeAction("storageCenterId", index, s.id)
                            setStorage(s)
                        }}
                        options={storages}
                        value={storage ? storage : null}
                        readonly={productDTO ? false : true}
                    />

                    <InputSelect<Discount>
                        id="select-discount"
                        idKey="id"
                        label="Tipo de desconto"
                        labelKey="desc"
                        onValueChange={(d) => {
                            setDiscount(d)
                            changeAction("discountType", index, d.type)
                        }}
                        options={[
                            { id: 0, type: "PERCENTAGE", desc: "Porcentagem" },
                            { id: 1, type: "DECIMAL", desc: "Decimal" }
                        ]}
                        value={discount ? discount : null}
                    />

                    <InputComponent
                        id="discount-value"
                        action={(e) => {
                            discountValueCB(parseInt(e.target.value))
                            changeAction("discountValue", index, parseInt(e.target.value))
                        }}
                        label="Valor do desconto"
                        type="number"
                    />
                </div>
            ))}
        </div>
    )
}

export default SaleItemComponent;