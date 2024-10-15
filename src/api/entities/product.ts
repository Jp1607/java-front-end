import Active from "../services/activeInterface"
import { Brand } from "./brand"
import { Group } from "./group"
import { MU } from "./MU"
import { Type } from "./type"

export type Product = {

    id?: number,
    name: string,
    description: string,
    barCode: number,
    active: Active,
    brand: Brand,
    group: Group,
    type: Type,
    mu: MU
}