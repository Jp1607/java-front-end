import { Route, Routes } from "react-router-dom"
import CreateProds from "../../pages/products/createProds"
import ProductListRender from "../../pages/products/listProds"
import PageNotFound from "../../pages/notFound"
import HomePage from "../../pages/mainPages/greetings"
import UserListRender from "../../pages/user/listUser"

const Routers = () => {

    return (

        <Routes>
            <Route>
                <Route index path='/' element={<HomePage />} />
                <Route path='/createProd' element={<CreateProds /> } />
                <Route path='/editProd/:id?' element={<CreateProds />} />
                <Route path='/editUser/:id?' element={<CreateProds />} />
                <Route path='/listProds' element={<ProductListRender />} />
                <Route path='/listUsers' element={<UserListRender />} />
                <Route path="/*" element={<PageNotFound />} />
            </Route>
        </Routes>

    )
}

export default Routers;