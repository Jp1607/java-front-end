import { interceptor } from "../context/AuthContext";
import Configuration from "./Config";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Path = '/login' | '/product' | '/product/edit' | '/users' | '/brand' | '/group' | '/type' | '/mu';

function DefaultFetch<T>(method: Method, path: Path, body?: any, pathParam?: string | number): Promise<T | void> {

    return new Promise(async (resolve, reject) => {

        try {


            const Url: string =
                pathParam === undefined ||
                    pathParam === null ?
                    `${Configuration.url}${path}` :
                    `${Configuration.url}${path}${pathParam}`;

            console.log('URL', Url)
     

            const RequestBody: RequestInit = {

                method: method,
            }

            const TOKEN: string | null =
                localStorage.getItem('token');

            if (TOKEN !== null) {

                Configuration.headers.Authorization = `Bearer ${TOKEN}`;
            }

            RequestBody.headers = Configuration.headers;
            RequestBody.mode = 'cors';

            if (body !== undefined && body !== null) {

                RequestBody.body = JSON.stringify(body);
            }

            const FETCH = await fetch(Url, RequestBody);

            if (!FETCH.ok) {

                if (FETCH.status >= 400) {
                    if (FETCH.status === 401) {
                        if (interceptor) {
                            interceptor(false);
                        }
                    }

                    if (FETCH.headers.get('content-type') !== null) {

                        if (FETCH.headers.get('content-type') === 'application/json') {

                            return reject(await FETCH.json());
                        } else if (FETCH.headers.get('content-type')?.indexOf('text/plain') !== -1) {

                            return reject(await FETCH.text() as T);
                        }
                    }

                    return reject();
                }
            }

            if (FETCH.headers.get('content-type') !== null) {

                if (FETCH.headers.get('content-type') === 'application/json') {
                    console.log(FETCH)
                    return resolve(await FETCH.json());
                } else if (FETCH.headers.get('content-type')?.indexOf('text/plain') !== -1) {

                    console.log(FETCH)
                    return resolve(await FETCH.text() as T);
                }
            }

            console.log(FETCH)
            return resolve();
        } catch (e) {

            return reject({ error: "internal_error", error_description: "Problema de conexão com o servidor ou internet." });
        }
    });
}

export default DefaultFetch;