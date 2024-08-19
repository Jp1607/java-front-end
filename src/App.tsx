import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./pages/login";
import ListProds from "./pages/listProds";
import CreateProds from "./pages/createProds";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadProds from './pages/createProds';

//import Login from "./pages/login";
// import NavBar from './components/navBar';
// import ListProds from "./pages/listProds";
// import CreateProds from "./pages/createProds";
// import DeleteProds from "./pages/deleteProds";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/createProds' element={<CadProds<T>(rows:T)/>}/> */}
          <Route path='/listProds' element={<ListProds />} />
          <Route path='/*' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

    //  <NavBar />

  );
}

export default App;
