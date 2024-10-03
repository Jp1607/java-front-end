import { ProductDTO } from "../entities/productDTO";
import { Product } from "../entities/product";
import DefaultFetch from "../services/DefaultFetch";

export function GETProductById(id?: number): Promise<Product> {

    return DefaultFetch<Product>('GET', '/product', undefined, id) as Promise<Product>;
}

export function GETProducts(): Promise<ProductDTO[]> {

    return DefaultFetch<ProductDTO[]>('GET', '/product', undefined, undefined) as Promise<ProductDTO[]>;
}

export function POSTProduct(product: Product): Promise<string> {

    return DefaultFetch<string>('POST', '/product', product) as Promise<string>;
}

export function PUTProduct(product: Product): Promise<string> {

    return DefaultFetch<string>('PUT', '/product/edit', product) as Promise<string>;
}

export function StateProduct(id: number): Promise<string> {

    return DefaultFetch<string>('PUT', '/product/edit', undefined, id) as Promise<string>;
}