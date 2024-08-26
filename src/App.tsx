import './App.css';
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListRender from './pages/listProds';
import CreateProds from './pages/createProds';
import DeleteProduct from './pages/deleteProds';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='/login' element={<Login />} />
          <Route path='/createProd' element={<CreateProds />} />
          <Route path='/editProd/:id?' element={<CreateProds />} />
          <Route path='/deleteProd/:id?' element={<DeleteProduct />} />
          <Route path='/listProds' element={<ProductListRender />}
          />
          <Route path='/*' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
