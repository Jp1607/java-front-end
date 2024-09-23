import DefaultFetch from "../services/DefaultFetch";

type Path = '/product' | '/users' | `/users/${number}`

function Edit<T>(path: Path, value?: T): Promise<string> {

  return DefaultFetch<string>('PUT', path, value) as Promise<string>;
}

export default Edit;