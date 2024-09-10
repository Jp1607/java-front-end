import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateProds from "../../pages/products/createProds"
import DeleteProduct from "../../pages/deleteProds"
import ProductListRender from "../../pages/listProds"
import HomePage from "../../pages/homePage"
import { useAuthContext } from "../context/AuthContext"
import Login from "../../pages/login"
import PageNotFound from "../../pages/notFound"

const Routers = () => {

    const auth = useAuthContext();

    console.log('ROTAS REREDERIZADAS', auth);

    return (

        <Routes>
            <Route>
                <Route index path='/' element={<HomePage />} />
                <Route path='/createProd' element={<CreateProds />} />
                <Route path='/editProd/:id?' element={<CreateProds />} />
                <Route path='/listProds' element={<ProductListRender />} />
                <Route path="/*" element={<PageNotFound />} />
            </Route>
        </Routes>

    )
}

export default Routers;