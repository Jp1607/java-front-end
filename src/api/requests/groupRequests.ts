import { Group } from "../entities/group";
import DefaultFetch from "../services/DefaultFetch"

export const GETGroups = (name?: String): Promise<Group[]> => {

    return DefaultFetch<Group[]>('GET', '/group', undefined, `?${name ? `name=${name}` : ''}`) as Promise<Group[]>;
}

export const GETGroup = (id: number): Promise<Group> => {

    return DefaultFetch<Group>('GET', '/group', undefined, `/${id}`) as Promise<Group>;
}

export const POSTGroup = (group: Group): Promise<string> => {

    group.active = true;
    return DefaultFetch<string>('POST', '/group', group) as Promise<string>;
}

export function PUTGroup(group: Group): Promise<string> {

    return DefaultFetch<string>('PUT', '/group/edit', group) as Promise<string>;
}

export const StateGroup = (id: number): Promise<string> => {

    return DefaultFetch<string>('PUT', '/group', undefined, id) as Promise<string>;
}