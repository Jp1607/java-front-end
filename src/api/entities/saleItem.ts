import { ProductDTO } from "./productDTO"

export type SellItem = {
    quantity: number,
    storageCenterId: number,
    productId: number,
     discountType: string,
     discountValue: number
}

export function SellItem(product: ProductDTO): SellItem {
    return ({
        quantity: 0,
        discountType: '',
        discountValue: 0,
        storageCenterId: product.storageId,
        productId: product.id
    })
}

export type BuyItem = {
    quantity: number,
    storageCenterId: number,
    productId: number
}