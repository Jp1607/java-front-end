import React, { useEffect, useLayoutEffect } from "react";
import getProducts, { Product, User } from "../../api/GET";
import { useState } from "react";
import { Link, Path, useLocation, useNavigate } from "react-router-dom";
import TableRender from "../../components/tableRender";
import '../../css/table.css';
import EditProduct from "../../api/PUT";

const ProductListRender: React.FC = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>({
        name: '',
        description: "",
        barCode: 0,
        active: false
    })

    const path: string = useLocation().pathname == "/listProds" ? "/product" : "/users"

    useEffect(() => {

        const fetchData = async () => {

            // if (useLocation().pathname == "/listProds"){
            //     setPath("/product")
            // } else {
            //    setPath("/users")
            // }

            await getProducts("/product").then((response: Product[] | User[]) => {

                    setProducts(response as Product[])
            
            }).catch(() => { })
        }

        fetchData()
    }, [])

    const handleTableClick = (param: Product) => {

            setProduct(param as Product);
    
    }

    const handleEditAction = (): void => {
       
        if (product.id !== undefined && product.id > 0) {

            navigate(`/editProd/${product.id}`);
        }
    }

    const handleDeleteProduct = (): void => {

        
    }

    const handleDesabledProduct = (): void => {

       
    }

    return (

        <div className="default-page">
            <div className="default-content">

                <Link to={'/createProd'}>
                    <button
                        className="content-abled-button-list">
                        CRIAR PRODUTO
                    </button>
                </Link>

                <TableRender<Product>
                    headers={[
                        { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Identificador'},
                        { gridType: 'FLEX', attributeName: 'name', width: 1, label: 'Produto'},
                        { gridType: 'FLEX', attributeName: 'description',  width: '1', label: 'Descrição'},
                        { gridType: 'FLEX', attributeName: 'barCode',  width: '1', label: 'Código de barras'},
                        { gridType: 'FLEX', attributeName: 'active',  width: '1', label: 'Estado'}
                    ]}

                    eventButtons={[
                        { label: 'DELETAR PRODUTO', cb: handleDeleteProduct},
                        { label: 'EDITAR', cb: handleEditAction}
                    ]}

                    values={products}
                    // editAction={handleEditAction}
                    selectedRow={product}
                    onTableClick={handleTableClick}
                />
            </div>
        </div>
    )
}
export default ProductListRender;