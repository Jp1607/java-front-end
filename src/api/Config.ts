type HeadersDefault = HeadersInit & {

    Authorization: string;
    "Content-Type": string;
}

console.log('Iniciou a configuração do headers');

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