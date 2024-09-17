import React, { useEffect, useLayoutEffect } from "react";
import getProducts, { Product, User } from "../api/TableFetch";
import { useState } from "react";
import { Link, Path, useLocation } from "react-router-dom";
import TableRender from "../components/tableRender";
import '../css/table.css';

const ProductListRender: React.FC = () => {

    
    const [products, setProducts] = useState<Product[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [product, setProduct] = useState<Product>({
        name: '',
        description: "",
        barCode: 0,
        active: false
    })
    const [user, setUser] = useState<User>({
        name: '',
        active: false
    })

    const path:string = useLocation().pathname == "/listProds" ? "/product" : "/users"
    
    useEffect(() => {
        
        
        const fetchData = async () => {
            
            // if (useLocation().pathname == "/listProds"){
                //     setPath("/product")
                // } else {
                    //    setPath("/users")
// }


            await getProducts(path == "/product" ? "/product" : "/users").then((response: Product[] | User[]) => {
console.log(path)
                if(response as Product[]){
                    console.log(response)
                    setProducts(response as Product[])
                    console.log(response)
                } else (response as User[]) 
                
                    setUsers(response as User[])
            }).catch(() => { })
        }

        fetchData()
    }, [path])

    const handleTableClickCity = (param: Product | User) => {

        if(param as Product) {

            setProduct(param as Product);
        } else {
        setUser(param as User);
        }
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
           
            <TableRender
                values={path == "listProds" ? products : users}
                selectedRow={path == "listProds" ? product : user}
                onTableClick={handleTableClickCity}
            />
        </div>
        </div>
    )
}
export default ProductListRender;