import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Admin from './pages/admin'

function App() {
 

  return (
    <BrowserRouter>
    <div>
   
    <Routes path='/'>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/admin/*' element={<Admin/>}/>
      <Route path="/*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
