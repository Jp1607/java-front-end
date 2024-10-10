import { MU } from "../entities/MU"
import DefaultFetch from "../services/DefaultFetch"

export const GETMUs = (name?: string): Promise<MU[]> => {

    return DefaultFetch<MU[]>('GET', '/mu', undefined, `?${name ? `name=${name}` : ''}`) as Promise<MU[]>;
}

export const GETMU = (id: number): Promise<MU> => {

    return DefaultFetch<MU>('GET', '/mu', undefined,  `/${id}`) as Promise<MU>;
}

export const POSTMU = (mu: MU): Promise<string> => {

    mu.active = true;
    return DefaultFetch<string>('POST', '/mu', mu) as Promise<string>;
}

export function PUTMu(mu: MU): Promise<string> {

    return DefaultFetch<string>('PUT', '/mu/edit', mu) as Promise<string>;
}

export const StateMU = (id: number): Promise<string> => {

    return DefaultFetch<string>('PUT', '/mu', undefined, id) as Promise<string>;
}