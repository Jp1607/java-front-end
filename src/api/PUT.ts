
import { Product } from "./GET";
import DefaultFetch from "./DefaultFetch";

type Path = '/product' | '/users'


function Edit<T>(value: T, path: Path): Promise<string> {
  return DefaultFetch<string>('PUT', path, value) as Promise<string>;

}
export default Edit;