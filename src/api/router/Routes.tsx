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
import CreateUser from "../../pages/user/createUser"
import ListStorage from "../../pages/Storages/listStorage"
import CreateStorage from "../../pages/Storages/createStorage"
import ListStockFlow from "../../pages/stockFlowList"
import SellProd from "../../pages/products/sellProd"
import BuyProd from "../../pages/products/buyProd"

const Routers = () => {

    return (

        <Routes>
            <Route>
                <Route index path='/' element={<HomePage />} />

                {/* Product endpoints */}
                <Route path='/listProds' element={<ProductListRender />} />
                <Route path='/createProd' element={<CreateProds />} />
                <Route path='/editProd/:id' element={<CreateProds />} />
                <Route path='/viewProd/:viewId' element={<CreateProds />} />

                {/* User endpoints */}
                <Route path='/listUsers' element={<UserListRender />} />
                <Route path='/createUser' element={<CreateUser />} />
                <Route path='/viewUser/:viewId' element={<CreateUser />} />

                {/* Brand endpoints */}
                <Route path='/listBrands' element={<BrandListRender />} />
                <Route path='/createBrand' element={<CreateBrands />} />
                <Route path='/editBrand/:id' element={<CreateBrands />} />
                <Route path='/viewBrand/:viewId' element={<CreateBrands />} />

                {/* Group endpoints */}
                <Route path='/listGroups' element={<GroupListRender />} />
                <Route path='/createGroup' element={<CreateGroups />} />
                <Route path='/editGroup/:id' element={<CreateGroups />} />
                <Route path='/viewGroup/:viewId' element={<CreateGroups />} />

                {/* Type endpoints */}
                <Route path='/listTypes' element={<TypeListRender />} />
                <Route path='/createType' element={<CreateTypes />} />
                <Route path='/editType/:id' element={<CreateTypes />} />
                <Route path='/viewType/:viewId' element={<CreateTypes />} />

                {/* Measurement units endpoints */}
                <Route path='/listMUs' element={<MUListRender />} />
                <Route path='/createMU' element={<CreateMUs />} />
                <Route path='/editMU/:id' element={<CreateMUs />} />
                <Route path='/viewMU/:viewId' element={<CreateMUs />} />

                {/* Storage endpoints */}
                <Route path='/listStorages' element={<ListStorage />} />
                <Route path='/createStorage' element={<CreateStorage />} />
                <Route path='/editStorage/:editID' element={<CreateStorage />} />
                <Route path='/viewStorage/:viewID' element={<CreateStorage />} />

                {/* Stock flow endpoints */}
                <Route path='/listStocksFlow' element={<ListStockFlow />} />
                <Route path='/sellItem' element={<SellProd />} />
                <Route path='/buyItem' element={<BuyProd />} />

                <Route path="/*" element={<PageNotFound />} />
            </Route>
        </Routes>

    )
}

export default Routers;