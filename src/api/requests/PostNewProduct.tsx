import { Product } from "./GET";
import DefaultFetch from "../services/DefaultFetch";

function PostNewProduct(product: Product): Promise<string> {

  return DefaultFetch<string>('POST', '/product', product) as Promise<string>;
}

export default PostNewProduct;
