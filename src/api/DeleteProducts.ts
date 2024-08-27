import DefaultFetch from "./DefaultFetch";
import { Product } from "./TableFetch";

const DeleteProds = (product: Product) => {


    console.log("Produto a ser deletado: ", product.id)
    return DefaultFetch<string>('DELETE', '/product', null, product.id) as Promise<string>;

}

export default DeleteProds;
