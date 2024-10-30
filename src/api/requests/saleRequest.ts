import { SaleItem } from "../entities/sellItem";
import DefaultFetch from "../services/DefaultFetch";

export function POSTSell(SaleItem: SaleItem[], ): Promise<String> {
    return DefaultFetch<String>('POST', '/sale/sell', SaleItem, ) as Promise<string>;
}