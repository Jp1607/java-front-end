import './App.css';
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListRender from './pages/listProds';
import CreateProds from './pages/products/createProds';
import DeleteProduct from './pages/deleteProds';
import AuthWrapper from './components/AuthWrapper';
import HomePage from './pages/homePage';
import DeleteProduct2 from './pages/deleteProds2';
import AuthContextProvider, { useAuthContext } from './api/context/AuthContext';
import Routers from './api/router/Routes';
import Controler from './pages/Controler';

function App() {

  return (
    <AuthContextProvider>
      <Controler />
    </AuthContextProvider>

  );
}

export default App;
