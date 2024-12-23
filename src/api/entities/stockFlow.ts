import { EnumType } from "typescript"

export type StockFlow = {

    id?: number,
    prodId: number,
    storageId: number,
    qnt: number,
    flow: string,
    date: Date
}