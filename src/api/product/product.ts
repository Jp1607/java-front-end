import { Product } from "../entities/Product";
import { Path } from "../path";
import DefaultFetch from "../services/DefaultFetch";

function getProductById(id?: number) {
    return DefaultFetch<Product[] | Product>('GET', '/product', undefined, id) as Promise<Product[] | Product>;
}

function getProducts(): Promise<Product[]> {
    return DefaultFetch<Product[]>('GET', '/product', undefined, undefined) as Promise<Product[]>;
}

export { getProducts, getProductById };