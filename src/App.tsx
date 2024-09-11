import './App.css';
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListRender from './pages/listProds';
import CreateProds from './pages/products/createProds';
import DeleteProduct from './pages/deleteProds';
import AuthWrapper from './components/AuthWrapper';
import HomePage from './pages/greetings';
import DeleteProduct2 from './pages/deleteProds2';
import AuthContextProvider, { AC, AuthContext, useAuthContext } from './api/context/AuthContext';
import Routers from './api/router/Routes';
import MainApp from './pages/MainApp';

function App() {

  return (
    <AuthContextProvider>
      <AC.Consumer>
        {(auth: AuthContext) => auth.isAuthenticated ? (<MainApp />) : (<Login />)}
      </AC.Consumer>
    </AuthContextProvider>
  );
}

export default App;
