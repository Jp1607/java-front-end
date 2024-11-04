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

const SaleItemComponent: React.FC<{saleItems: SaleItem[], discountValueCB: (param: number) => void, changeAction: <T extends keyof SaleItem>(key: T, newValue: SaleItem[T]) => void}> = ({saleItems, discountValueCB, changeAction}) => {

    const [products, setProducts] = React.useState<ProductDTO[]>(undefined);
    const [productDTO, setProductDTO] = React.useState<ProductDTO>(undefined);
    const [saleItem, setSaleItem] = React.useState<SaleItem>(undefined);
    const [storages, setStorages] = React.useState<StorageCenter[]>(undefined);
    const [product, setProduct] = React.useState<Product>(undefined);
    const [discount, setDiscount] = React.useState<Discount>(undefined);
    const [storage, setStorage] = React.useState<StorageCenter>(undefined);

    useEffect(() => {
        GETProducts().then((response: ProductDTO[]) => setProducts(response)).catch(() => { });
    }, [])

    const getStorages = (p: ProductDTO) => {
        GETStorages(p.id).then((response: StorageCenter[]) => setStorages(response)).catch(() => { });
    }

    return (
        <div id="sale-item-container">
            {saleItems.map((saleItem: SaleItem, index: number) => (
                <div key={index}>

                <InputComponent
                action={(e: React.ChangeEvent<HTMLInputElement>) => changeAction("quantity", parseInt(e.target.value))}
                max={productDTO.negativeStock ? null : productDTO.currentStock}
                id="qnt"
                label="Quantidade"
                type="number"
                readonly={saleItems.length - 1 == index ? false : true}
                />

            <InputSelect<StorageCenter>
                id="select-storage"
                idKey="id"
                label="Depósito"
                labelKey="description"
                onValueChange={(s) => {
                    changeAction("storageCenterId", s.id)
                    setStorage(s)
                }}
                options={storages}
                value={storage ? storage : null}
                readonly={saleItems.length - 1 == index ? false : true}
                />

            <InputSelect<ProductDTO>
                id="select-prod"
                idKey="id"
                label="Produto"
                labelKey="description"
                onValueChange={(p) => {
                    changeAction("productId", p.id)
                    setProductDTO(p)
                    getStorages(p)
                }}
                options={products}
                value={productDTO ? productDTO : null}
                readonly={saleItems.length - 1 == index ? false : true}
                />

            <InputSelect<Discount>
                id="select-discount"
                idKey="id"
                label="Tipo de desconto"
                labelKey="desc"
                onValueChange={(d) => {
                    setDiscount(d)
                    changeAction("discountType", d.type)
                }}
                options={[
                    { id: 0, type: "PERCENTAGE", desc: "Porcentagem" },
                    { id: 1, type: "DECIMAL", desc: "Decimal" }
                ]}
                value={discount ? discount : null}
                readonly={saleItems.length - 1 == index ? false : true}
                />

            <InputComponent
                id="discount-value"
                action={(e) => {
                    discountValueCB(parseInt(e.target.value))
                    changeAction("discountValue", parseInt(e.target.value))
                }}
                label="Valor do desconto"
                type="number"
                readonly={saleItems.length - 1 == index ? false : true}
                />
                </div>
            ))}
        </div>
    )
}

export default SaleItemComponent;