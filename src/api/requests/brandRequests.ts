import { Brand } from "../entities/brand"
import DefaultFetch from "../services/DefaultFetch"

export const GETBrands = (name?: string): Promise<Brand[]> => {

    return DefaultFetch<Brand[]>('GET', '/brand', undefined, `?${name ? `name=${name}` : ''}`) as Promise<Brand[]>;
}

export const GETBrand = (id: number): Promise<Brand> => {

    return DefaultFetch<Brand>('GET', '/brand', undefined, `/${id}`) as Promise<Brand>;
}

export const POSTBrand = (brand: Brand): Promise<string> => {

    brand.active = true;
    return DefaultFetch<string>('POST', '/brand', brand) as Promise<string>;
}

export function PUTBrand(brand: Brand): Promise<string> {

    return DefaultFetch<string>('PUT', '/brand/edit', brand) as Promise<string>;
}

export const StateBrand = (id: number): Promise<string> => {

    return DefaultFetch<string>('PUT', '/brand', undefined, id) as Promise<string>;
}