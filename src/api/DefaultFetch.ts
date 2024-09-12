import Configuration from "./Config";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Path = '/login' | '/product';

function DefaultFetch<T>(method: Method, path: Path, body?: any, pathParam?: string | number): Promise<T | void> {

    return new Promise(async (resolve, reject) => {

        try {

            const Url: string = 
            pathParam === undefined || 
            pathParam === null ? 
            `${Configuration.url}${path}` : 
            `${Configuration.url}${path}/${pathParam}`;

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

                    return resolve(await FETCH.json());
                } else if (FETCH.headers.get('content-type')?.indexOf('text/plain') !== -1) {

                    return resolve(await FETCH.text() as T);
                }
            }

            return resolve();
        } catch (e) {
          
            return reject({ error: "internal_error", error_description: "Problema de conexão com o servidor ou internet." });
        }
    });
}

export default DefaultFetch;