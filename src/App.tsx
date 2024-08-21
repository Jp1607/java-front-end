import React from 'react';
import './App.css';
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductListRender from './pages/listProds';

function App() {
 
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/createProds' element={<CadProds<T>(rows:T)/>}/> */}
          <Route path='/listProds'
            element={<ProductListRender/>}
          />
          <Route path='/*' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
