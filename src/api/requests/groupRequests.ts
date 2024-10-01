import { Group } from "../entities/group";
import DefaultFetch from "../services/DefaultFetch"

export const GETGroups = (): Promise<Group[]> => {

    return DefaultFetch<Group[]>('GET', '/group') as Promise<Group[]>;
}

export const GETGroup = (id: number): Promise<Group> => {

    return DefaultFetch<Group>('GET', '/group', undefined, id) as Promise<Group>;
}

export const POSTGroup = (group: Group): Promise<string> => {

    group.active = true;
    return DefaultFetch<string>('POST', '/group', group) as Promise<string>;
}

export const PUTGroup = (id: number): Promise<string> => {

    return DefaultFetch<string>('PUT', '/group', undefined, id) as Promise<string>;
}