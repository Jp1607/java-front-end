import './App.css';
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListRender from './pages/listProds';
import CreateProds from './pages/createProds';
import DeleteProduct from './pages/deleteProds';
import AuthWrapper from './components/AuthWrapper';
import HomePage from './pages/homePage';
import DeleteProduct2 from './pages/deleteProds2';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='/createProd' element={localStorage.getItem('token') !== null ? <CreateProds /> : <AuthWrapper />} />
          <Route path='/editProd/:id?' element={localStorage.getItem('token') !== null ? <CreateProds /> : <AuthWrapper />} />
          {/* <Route path='/deleteProd2/:id?' element={localStorage.getItem('token') !== null ? <DeleteProduct2 /> : <AuthWrapper />} /> */}
          <Route path='/deleteProd/:id?' element={localStorage.getItem('token') !== null ? <DeleteProduct /> : <AuthWrapper />} />
          <Route path='/listProds' element={localStorage.getItem('token') !== null ?  <AuthWrapper /> :<ProductListRender /> } />
          <Route path='/homePage' element={ <HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
          <Route path='/*' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
