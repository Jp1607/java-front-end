import DefaultFetch from "./DefaultFetch";
import { Product } from "./TableFetch";

const DeleteProds = (product: Product) => {

    return DefaultFetch<string>('DELETE', '/product', product.id) as Promise<string>;

}

export default DeleteProds;
