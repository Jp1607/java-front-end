import { Type } from "../entities/type"
import DefaultFetch from "../services/DefaultFetch"

export const GETTypes = (name?: string, active?: boolean): Promise<Type[]> => {

    return DefaultFetch<Type[]>('GET', '/type', undefined, `?${name ? `name=${name}&` : ''}${active ? `active=${active}&` : ''}`) as Promise<Type[]>;
}

export const GETType = (id: number): Promise<Type> => {

    return DefaultFetch<Type>('GET', '/type', undefined,  `/${id}`) as Promise<Type>;
}

export const POSTType = (type: Type): Promise<string> => {

    type.active = true;
    return DefaultFetch<string>('POST', '/type', type) as Promise<string>;
}

export function PUTType(type: Type): Promise<string> {

    return DefaultFetch<string>('PUT', '/type/edit', type) as Promise<string>;
}

export const StateType = (id: number): Promise<string> => {

    return DefaultFetch<string>('PUT', '/type', undefined, `/${id}`) as Promise<string>;
}