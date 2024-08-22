import React, { useEffect } from "react";
import getProducts, { Product } from "../api/TableFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductListRender: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {

        const fetchData = async () => {

            await getProducts().then((response: Product[]) => {
                setProducts(response)
            }).catch(() => { })
        }

        fetchData()

    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> NOME </th>
                        <th> DESCRIÇÃO </th>
                        <th> CÓDIGO DE BARRAS </th>
                        <th> ATIVO </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map((r: Product, index: number) => (
                            <tr
                                key={`table-row-${index}`}
                            >
                                {
                                    typeof r === 'object' && r !== null ?
                                        Object.entries(r).map(([key, value], idx: number) => (
                                            <td
                                                key={`table-row-cell-${idx}`}
                                            >
                                                {value as any}

                                            </td>
                                        )) : null
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Link to={'/createProd'}><button>CRIAR PRODUTO</button></Link>
        </div>
    )
}
export default ProductListRender;