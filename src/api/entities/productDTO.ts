import { Brand } from "./brand"
import { Group } from "./group"
import { MU } from "./MU"
import { Product } from "./product"
import { Type } from "./type"

export type ProductDTO = {
    [x: string]: any

    id?: number,
    name: string,
    description: string,
    barCode: string,
    active: boolean,
    brandDesc: string,
    groupDesc: string,
    typeDesc: string,
    muDesc: string
}

export function ProductDTO(product: Product): ProductDTO {
    return {
        id: product.id ? product.id : 0,
        name: product.name ? product.name.charAt(0).toUpperCase(): "",
        description: product.description ? product.brand.description.charAt(0).toUpperCase() : "",
        barCode: product.barCode ? product.barCode : '',
        active: product.active ? product.active : false,
        brandDesc: product.brand.description ? product.brand.description.charAt(0).toUpperCase() : "",
        groupDesc: product.group.description ? product.group.description.charAt(0).toUpperCase() : "",
        typeDesc: product.type.description ? product.type.description.charAt(0).toUpperCase() : "",
        muDesc: product.mu.description ? product.mu.description.charAt(0).toUpperCase() : ""
    }

}