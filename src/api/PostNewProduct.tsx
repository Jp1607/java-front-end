import React from "react";
import { Product } from "./TableFetch";
import DefaultFetch from "./DefaultFetch";

  function PostNewProduct(product: Product): void {

    DefaultFetch<Product>('POST', '/product', product);

}
export default PostNewProduct;
