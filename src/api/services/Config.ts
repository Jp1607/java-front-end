type HeadersDefault = HeadersInit & {

    Authorization: string;
    "Content-Type": string;
}

export interface Config {

    readonly url: string;
    readonly headers: HeadersDefault;
}

const Configuration: Config = {
    url: 'http://localhost:8080',
    headers: {

        "Content-Type": "application/json",
        Authorization: ''
    }
}

export default Configuration;