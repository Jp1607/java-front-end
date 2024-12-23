import { Brand } from "./brand"
import { Group } from "./group"
import { MU } from "./MU"
import { StorageCenter } from "./storage"
import { Type } from "./type"

export type Product = {

    id?: number,
    name: string,
    description: string,
    barCode: string,
    active: boolean,
    brand: Brand,
    group: Group,
    type: Type,
    mu: MU,
    storage: StorageCenter,
    killed: number;
}