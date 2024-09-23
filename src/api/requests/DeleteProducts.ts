import DefaultFetch from "../services/DefaultFetch";
import { Product } from "./GET";

const DeleteProds = (product: Product) => {


    return DefaultFetch<string>('DELETE', '/product', null, product.id) as Promise<string>;
}

export default DeleteProds;
