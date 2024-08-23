import DefaultFetch from './DefaultFetch';

export type Product = {
    id?: number,
    name: string,
    description: string,
    barCode: number,
    active: boolean
}

function getProducts(id?: number): Promise<Product[]> {

    return DefaultFetch<Product[]>('GET', '/product', id) as Promise<Product[]>;

}

export default getProducts;


