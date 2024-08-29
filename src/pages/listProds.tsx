import React, { useEffect } from "react";
import getProducts, { Product } from "../api/TableFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import TableRender from "../components/tableRender";

const ProductListRender: React.FC = () => {

    const [buttonsDisabled, setButtonsDisabled] = React.useState<boolean>(true)
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
        setButtonsDisabled(false)
    }

    useEffect(() => {

        if (product.id !== undefined) {

            setProductId(product.id)
        }
    }, [handleTableClickCity])

    return (

        <div>

            <Link to={'/createProd'}>

                <button
                    className="content-abled-button">

                    CRIAR PRODUTO
                </button>
            </Link>

            <Link to={'/homePage'}>

                <button className="content-abled-button">

                    VOLTAR
                </button>
            </Link>

            <TableRender
                products={products}
                selectedRow={product}
                onTableClick={handleTableClickCity}
            />

            {/* <Modal 
        show={show} 
        backdrop="static"
        keyboard={false}>

            <ModalHeader closeButton>

                <ModalTitle> Atenção! </ModalTitle>

            </ModalHeader>

            <ModalBody>

                <ModalDialog>

                    <p> Você tem certeza de que deseja deletar este produto? </p>

                </ModalDialog>

            </ModalBody>

            <ModalFooter>

                <button onClick={handleDelete}>DELETAR</button>
                <button onClick={handleClose}>CANCELAR</button>

            </ModalFooter>

        </Modal> */}
        </div>
    )
}
export default ProductListRender;