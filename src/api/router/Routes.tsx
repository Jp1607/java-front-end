import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateProds from "../../pages/createProds"
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
        <BrowserRouter>
            <Routes>
                {auth.isAuthenticated ? (
                    <Route path='/'>
                        <Route path='/createProd' element={<CreateProds />} />
                        <Route path='/editProd/:id?' element={<CreateProds />} />
                        <Route path='/listProds' element={<ProductListRender />} />
                        <Route path='/homePage' element={<HomePage />} />
                        <Route path="/*" element={<PageNotFound/>}/>
                    </Route>
                ) : (
                    <Route path='/*' element={<Login />} />
                )}
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;