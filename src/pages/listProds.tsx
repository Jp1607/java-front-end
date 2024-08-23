import React, { useEffect } from "react";
import getProducts, { Product } from "../api/TableFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import TableRender from "../components/tableRender";


const ProductListRender: React.FC = () => {

console.log('teste')

    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>({
        //  id: 0,
        name: '',
        description: "",
        barCode: 0,
        active: false

    })

    useEffect(() => {

        const fetchData = async () => {

            await getProducts().then((response: Product[]) => {
                setProducts(response)
            }).catch(() => { })
        }

        fetchData()

    }, [])

    const handleTableClickCity = (param: Product) => {

        setProduct(param);

    }



    const [productId, setProductId] = React.useState<number>()

    React.useEffect(() => {
        if (product.id !== undefined) {
            setProductId(product.id)
        }
    }, [handleTableClickCity])

    //console.log(productId)



    return (

        <div>
            <TableRender
                products={products}
                selectedRow={product}
                onTableClick={handleTableClickCity}
            />

            <Link to={'/createProd'}><button>CRIAR PRODUTO</button></Link>
            <Link to={`/editProd/:${productId}?`}><button>EDITAR PRODUTO</button></Link>
        </div>

    )
}
export default ProductListRender;