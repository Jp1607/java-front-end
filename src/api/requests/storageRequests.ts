import DefaultFetch from "../services/DefaultFetch";
import { StorageCenter } from "../entities/storage"

export function getStorages(id?: number, name?: string, active?: boolean): Promise<StorageCenter[]> {
    return DefaultFetch<StorageCenter[]>('GET', '/storage', null, `?${name ? `name=${name}&` : ''}${id ? `id=${id}&` : ''}${active ? `active=${active}&` : ''}`) as Promise<StorageCenter[]>;
}

export function  getStorage(id: number): Promise<StorageCenter> {
    return DefaultFetch<StorageCenter>('GET', '/storage', null, `?${id ? `id=${id}` : ''}`) as Promise<StorageCenter>;
}

export function stateStorage(id: number): Promise<string> {
    return DefaultFetch<string>('PUT', '/storage/exclude', null, `/${id}`) as Promise<string>;
}
