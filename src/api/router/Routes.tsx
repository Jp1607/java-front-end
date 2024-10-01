import { Route, Routes } from "react-router-dom"
import CreateProds from "../../pages/products/createProds"
import ProductListRender from "../../pages/products/listProds"
import PageNotFound from "../../pages/notFound"
import HomePage from "../../pages/mainPages/greetings"
import UserListRender from "../../pages/user/listUser"
import BrandListRender from "../../pages/cadAndOpts/Brand/ListBrand"
import GroupListRender from "../../pages/cadAndOpts/Group/ListGroup"
import MUListRender from "../../pages/cadAndOpts/Measurement Unit/ListMU"
import TypeListRender from "../../pages/cadAndOpts/Type/ListType"
import CreateBrands from "../../pages/cadAndOpts/Brand/CreateBrand"
import CreateGroups from "../../pages/cadAndOpts/Group/CreateGroup"
import CreateTypes from "../../pages/cadAndOpts/Type/CreateType"
import CreateMUs from "../../pages/cadAndOpts/Measurement Unit/CreateMU"

const Routers = () => {

    return (

        <Routes>
            <Route>
                <Route index path='/' element={<HomePage />} />

                {/* Product endpoints */}
                <Route path='/listProds' element={<ProductListRender />} />
                <Route path='/createProd' element={<CreateProds />} />
                <Route path='/editProd/:id?' element={<CreateProds />} />

                {/* User endpoints */}
                <Route path='/listUsers' element={<UserListRender />} />

                {/* Brand endpoints */}
                <Route path='/listBrands' element={<BrandListRender />} />
                <Route path='/createBrand' element={<CreateBrands />} />

                {/* Group endpoints */}
                <Route path='/listGroups' element={<GroupListRender />} />
                <Route path='/createGroup' element={<CreateGroups />} />

                {/* Type endpoints */}
                <Route path='/listTypes' element={<TypeListRender />} />
                <Route path='/createType' element={<CreateTypes />} />

                {/* Measurement units endpoints */}
                <Route path='/listMUs' element={<MUListRender />} />
                <Route path='/createMU' element={<CreateMUs />} />

                <Route path="/*" element={<PageNotFound />} />
            </Route>
        </Routes>

    )
}

export default Routers;