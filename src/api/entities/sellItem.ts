import { ProductDTO } from "./productDTO"

export type SaleItem = {
    quantity: number,
    storageCenterId: number,
    productId: number,
    discountType: string,
    discountValue: number
}

export function SaleItem(product: ProductDTO): SaleItem {
    return ({
        quantity: 0,
        discountType: '',
        discountValue: 0,
        storageCenterId: product.storageId,
        productId: product.id
    })
}