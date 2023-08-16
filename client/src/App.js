import React from 'react'
import  { BrowserRouter,Route,Routes } from 'react-router-dom';
import ReactTask from './React';
import Home from './Home';
import Node from './Node';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/react' element={<ReactTask/>}></Route>
      <Route path='/node' element={<Node/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App