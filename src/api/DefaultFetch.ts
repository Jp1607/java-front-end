import Configuration from "./Config";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Path = '/login';

function DefaultFetch<T>(method: Method, path: Path, body?: any, pathParam?: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
        try {

            const Url: string = pathParam === undefined || pathParam === null ? `${Configuration.url}${path}` : `${Configuration.url}${path}${pathParam}`;

            const RequestBody: RequestInit = {
                method: method,
            }

            RequestBody.headers = Configuration.headers;

            if (body !== undefined && body !== null) {
                RequestBody.body = JSON.stringify(body);
            }

            const FETCH = await fetch(Url,
                RequestBody
            );

            if (!FETCH.ok) {
                if (FETCH.status >= 400) {
                    return reject(await FETCH.json());
                }
            }

            return resolve(await FETCH.json() as T);
        } catch (e) {
            return reject({ error: "internal_error", error_description: "Problema de conexão com o servidor ou internet." });
        }
    });
}

export default DefaultFetch;