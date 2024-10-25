import { StockFlow } from "../entities/stockFlow";
import { Flow } from "../Flow";
import DefaultFetch from "../services/DefaultFetch";

export function getStockFlows(type?: string, date1?: string, date2?: string, storageId?: number): Promise<StockFlow[]> {
    return DefaultFetch<StockFlow[]>('GET', '/stock_flow', null, `?${type ? `flow=${type}&` : ''}${date1 ? `initialDate=${date1}&` : ''}${date2 ? `finalDate=${date2}&` : ''}${storageId ? `storage=${storageId}&` : ''}`) as Promise<StockFlow[]>;
}

export function getStockFlow(id: number): Promise<StockFlow> {
    return DefaultFetch<StockFlow>('GET', '/stock_flow', null, `?${id ? `id=${id}` : ''}`) as Promise<StockFlow>;
}
