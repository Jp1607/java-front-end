
import { Product } from "./TableFetch";
import DefaultFetch from "./DefaultFetch";

function PostNewProduct(product: Product): Promise<string> {

  return DefaultFetch<string>('POST', '/product', product) as Promise<string>;

}
export default PostNewProduct;
