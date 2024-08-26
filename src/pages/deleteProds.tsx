import React, { useEffect } from "react"
import DeleteProds from "../api/DeleteProducts"
import getProducts, { Product } from "../api/TableFetch"
import { useParams } from "react-router-dom";
import HandleCancel from "../api/CancelMethod";

const DeleteProduct = () => {

    const { id } = useParams();
    const [products, setProducts] = React.useState<Product[]>([])
    const [product, setProduct] = React.useState<Product>(
        {
            name: '',
            description: '',
            barCode: 0,
            active: false
        }
    )

    useEffect(() => {

        if (id !== undefined) {

            const getProductById = async () => {

                await getProducts().then((response: Product[]) => {

                    setProducts(response)
                }).catch(() => { })

                const prodById = products.find(product => product.id === parseInt(id))
                setProduct(prodById as Product)
            }

            getProductById();
        }
    }, [])

    const delProds = () => {
        DeleteProds(product)
    }

    return (

        <div>
            <h1>ATENÇÃO!</h1>

            <p>
                Você tem certeza que deseja excluir este produto?
            </p>

            <button onClick={delProds}>EXCLUIR</button>
            <button onClick={HandleCancel}>CANCELAR</button>
        </div>
    )
}

export default DeleteProduct;