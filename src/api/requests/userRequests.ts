import { User } from "../entities/user";
import DefaultFetch from "../services/DefaultFetch";

export function GETUsers(name?: string): Promise<User[]> {
    return DefaultFetch<User[]>('GET', "/users", undefined, `${name ? `?name=${name}` : ''}`) as Promise<User[]>;
}

export function GETUserById(id: number): Promise<User> {

    return DefaultFetch<User>('GET', '/users', undefined, id) as Promise<User>;
}

export function POSTUser(user: User): Promise<string> {

    return DefaultFetch<string>('POST', '/users', user) as Promise<string>;
}

export function PUTUser(id: number): Promise<string> {

    return DefaultFetch<string>('PUT', '/users', undefined, id) as Promise<string>;
}