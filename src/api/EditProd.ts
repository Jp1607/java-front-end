
import { Product } from "./TableFetch";
import DefaultFetch from "./DefaultFetch";

function EditProduct(product: Product): Promise<string> {
  return DefaultFetch<string>('PUT', '/product', product) as Promise<string>;

}
export default EditProduct;