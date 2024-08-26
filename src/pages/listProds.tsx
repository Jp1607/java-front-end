import React, { useEffect } from "react";
import getProducts, { Product } from "../api/TableFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import TableRender from "../components/tableRender";


const ProductListRender: React.FC = () => {

    const [productId, setProductId] = React.useState<number>()
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>({
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

    useEffect(() => {

        if (product.id !== undefined) {

            setProductId(product.id)
        }
    }, [handleTableClickCity])

    return (

        <div>
            <TableRender
                products={products}
                selectedRow={product}
                onTableClick={handleTableClickCity}
            />

            <Link to={'/createProd'}><button>CRIAR PRODUTO</button></Link>
            <Link to={`/editProd/${productId}?`}><button>EDITAR PRODUTO</button></Link>
            <Link to={`/deleteProd/${productId}?`}><button>DELETAR PRODUTO</button></Link>
        </div>

    )
}
export default ProductListRender;