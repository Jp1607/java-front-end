import DefaultFetch from './DefaultFetch';

export type Product = {
    name: string,
    description: string,
    barCode: number,
    active: boolean
}

function getProducts(): Promise<Product[]> {
    
    return DefaultFetch<Product[]>('GET', '/product');
    
}   

export default getProducts;


