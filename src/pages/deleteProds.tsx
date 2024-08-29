import React, { useEffect } from "react"
import DeleteProds from "../api/DeleteProducts"
import getProducts, { Product } from "../api/TableFetch"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CancelButton from "../components/CancelMethod";

const DeleteProduct = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const [products, setProducts] = React.useState<Product[]>([])
    const [product, setProduct] = React.useState<Product>(null)

    useEffect(() => {

        if (id !== undefined) {

            const getProductById = async () => {

                await getProducts(parseInt(id, 10)).then((response: Product) => {

                    setProduct(response);
                }).catch((e) => {

                    console.log('Falha ao buscar produto', e);
                    setProduct(null)
                })
            }

            getProductById();
        }
    }, [])

    const delProds = () => {

        if (product !== null) {

            DeleteProds(product).then((response: string) => { console.log(response) }).catch((e) => console.log('Error ao deletar produto', e));

            navigate(-1);
        } else {

            console.log('não existe produto a ser deletado');
        }
    }

    return (

        <div>

            <h1>ATENÇÃO!</h1>

            <p>
                Você tem certeza que deseja excluir este produto?
            </p>

            <button onClick={delProds} className="content-abled-button">EXCLUIR</button>

            <CancelButton />

        </div>
    )
}

export default DeleteProduct;