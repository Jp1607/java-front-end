import { SaleItem } from "../entities/sellItem";
import DefaultFetch from "../services/DefaultFetch";
import Discount from "../services/DiscountType";

export function POSTSell(SaleItem: SaleItem[], discount: Discount, discountValue: number): Promise<String> {
    return DefaultFetch<String>('POST', '/sale/sell', {SaleItem}, `?${discount ? `discount=${discount.type}` : ''}${discountValue ? `discountValue${discountValue}` : ''}`) as Promise<string>;
}