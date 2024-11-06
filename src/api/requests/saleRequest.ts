import { BuyItem, SellItem } from "../entities/saleItem";
import { StorageCenter } from "../entities/storage";
import DefaultFetch from "../services/DefaultFetch";
import Discount from "../services/DiscountType";

export function GETStorages(prodId: number): Promise<StorageCenter[]> {
    return DefaultFetch<StorageCenter[]>('GET', '/sale', undefined, `?prodId=${prodId}`) as Promise<StorageCenter[]>;
}

export function POSTSell(SaleItem: SellItem[], payment: string): Promise<String> {
    return DefaultFetch<String>('POST', '/sale/sell', SaleItem, `?payment=${payment}`) as Promise<string>;
}

export function POSTBuy(SaleItem: BuyItem[]): Promise<String> {
    return DefaultFetch<String>('POST', '/sale/buy', SaleItem) as Promise<string>;
}
