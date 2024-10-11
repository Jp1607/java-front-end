import { ProductDTO } from "../entities/productDTO";
import { Product } from "../entities/product";
import DefaultFetch from "../services/DefaultFetch";

export function GETProductById(id?: number): Promise<Product> {

    return DefaultFetch<Product>('GET', '/product', undefined, `/${id}`) as Promise<Product>;
}

export function GETProducts(name?: string, barCode?: number, brandId?: number, groupId?: number, typeId?: number, muId?: number, active?: boolean): Promise<ProductDTO[]> {
    let urlParam: string = `?${name ? `name=${name}&` : ''}${barCode ? `barCode=${barCode}&` : ''}${brandId ? `brandId=${brandId}&` : ''}${groupId ? `groupId=${groupId}&` : ''}${typeId ? `typeId=${typeId}&` : ''}${muId ? `muId=${muId}&` : ''}${active ? `active=${active}&` : ''}`;

    console.log('asudhasudhus', urlParam)
    return DefaultFetch<ProductDTO[]>('GET', '/product', undefined, urlParam) as Promise<ProductDTO[]>;
}

export function POSTProduct(product: Product): Promise<string> {

    return DefaultFetch<string>('POST', '/product', product) as Promise<string>;
}

export function PUTProduct(product: Product): Promise<string> {

    return DefaultFetch<string>('PUT', '/product/edit', product) as Promise<string>;
}

export function StateProduct(id: number): Promise<string> {

    return DefaultFetch<string>('PUT', '/product/edit', undefined, `/${id}`) as Promise<string>;
}