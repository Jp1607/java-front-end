import React, { useEffect } from "react";
import getProducts, { Product } from "../api/TableFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import TableRender from "../components/tableRender";
import ReturnButton from "../components/returnButton";
import '../css/table.css';

const ProductListRender: React.FC = () => {

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

    return (

        <div className="default-page">
            <div className="default-content">
            <Link to={'/createProd'}>
                <button

                    id="content-abled-button-list">
                    CRIAR PRODUTO

                </button>
            </Link>

{/* <Link to = {'/'}>
<button
className = "content-abled-button-list" >
    VOLTAR
</button>
</Link> */}
        {/* <ReturnButton action = "menu"> VOLTAR </ReturnButton> */}
           
            <TableRender

                products={products}
                selectedRow={product}
                onTableClick={handleTableClickCity}

            />
        </div>
        </div>
    )
}
export default ProductListRender;