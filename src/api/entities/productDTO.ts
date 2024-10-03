import { Brand } from "./brand"
import { Group } from "./group"
import { MU } from "./MU"
import { Product } from "./product"
import { Type } from "./type"

export type ProductDTO = {

    id?: number,
    name: string,
    description: string,
    barCode: number,
    active: boolean,
    brandDesc: string,
    groupDesc: string,
    typeDesc: string,
    muDesc: string
}

export function ProductDTO(product: Product): ProductDTO {
    return {
        id: product.id ? product.id : 0,
        name: product.name ? product.name: "",
        description: product.description ? product.brand.description : "",
        barCode: product.barCode ? product.barCode : 0,
        active: product.active ? product.active : false,
        brandDesc: product.brand.description ? product.brand.description : "",
        groupDesc: product.group.description ? product.group.description : "",
        typeDesc: product.type.description ? product.type.description : "",
        muDesc: product.mu.description ? product.mu.description : ""
    }

}