import DefaultFetch from "../services/DefaultFetch";
import { StorageCenter } from "../entities/storage"

export function getStorages(id?: number, name?: string, active?: boolean): Promise<StorageCenter[]> {
    return DefaultFetch<StorageCenter[]>('GET', '/storage', null, `?${name ? `name=${name}&` : ''}${id ? `id=${id}&` : ''}${active ? `active=${active}&` : ''}`) as Promise<StorageCenter[]>;
}

export function  getStorage(id: number): Promise<StorageCenter> {
    return DefaultFetch<StorageCenter>('GET', '/storage', null, `?${id ? `id=${id}` : ''}`) as Promise<StorageCenter>;
}

export function POSTStorage(storage: StorageCenter): Promise<string> {
    return DefaultFetch<string>('POST', '/storage', storage) as Promise<string>;
}

export function PUTExcludeStorage(id: number): Promise<string> {
    return DefaultFetch<string>('PUT', '/storage/exclude', null, `?id=${id}`) as Promise<string>;
}

export function PUTEditStorage(storage: StorageCenter): Promise<string> {
    return DefaultFetch<string>('PUT', '/storage/edit', storage) as Promise<string>;
}