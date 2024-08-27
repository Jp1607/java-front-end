import DefaultFetch from './DefaultFetch';

export type Product = {
    id?: number,
    name: string,
    description: string,
    barCode: number,
    active: boolean
}

function getProducts(): Promise<Product[]>
function getProducts(id: number): Promise<Product>
function getProducts(id?: number): Promise<Product[]> | Promise<Product> {
    if (id === undefined) {
        return DefaultFetch<Product[]>('GET', '/product') as Promise<Product[]>;
    }
    return DefaultFetch<Product>('GET', '/product', undefined, id) as Promise<Product>;

}

export default getProducts;


