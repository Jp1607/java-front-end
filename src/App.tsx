import './App.css';
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListRender from './pages/listProds';
import CreateProds from './pages/createProds';
import DeleteProduct from './pages/deleteProds';

import AuthWrapper from './components/AuthWrapper';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/'>
          {/* <Route path='/createProd' element={localStorage.getItem('token') !== null ? <CreateProds /> :  <AuthWrapper/>} /> */}
          {/* <Route path='/createProd' element={localStorage.getItem('token') !== null ? <CreateProds /> :  <AuthWrapper/>} />
          <Route path='/editProd/:id?' element={localStorage.getItem('token') !== null ? <CreateProds /> : <AuthWrapper/>} />
          <Route path='/deleteProd/:id?' element={localStorage.getItem('token') !== null ? <DeleteProduct /> : <AuthWrapper/>} /> */}
          <Route path='/createProd' element={<CreateProds />} />
          <Route path='/editProd/:id?' element={<CreateProds />} />
          <Route path='/deleteProd/:id?' element={<DeleteProduct />} />
          <Route path='/listProds' element={<ProductListRender />} />
            {/* localStorage.getItem('token') !== null ? <ProductListRender /> : <AuthWrapper/>} /> */}
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Login />} />
          <Route path='/*' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
