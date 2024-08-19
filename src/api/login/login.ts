import DefaultFetch from '../DefaultFetch';

export type LoginForm = {
    username: string;
    password: string;
}

export type LoginResponseBody = {
    name: string;
    token: string;
    roles: string[]
}

export default function Login(form: LoginForm): Promise<LoginResponseBody> {
    return DefaultFetch<LoginResponseBody>('POST', '/login', form);
}