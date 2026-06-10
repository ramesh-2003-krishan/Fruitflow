import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Admin from './pages/admin'
import Product from './pages/product'
import About from './pages/about'
import toast, {Toaster} from 'react-hot-toast'
import Contact from './pages/contact'
import ProductDetail from './pages/productDetail'
import Shop from './pages/shop'


function App() {
 

  return (
    <BrowserRouter>
    <div>
      <Toaster position='top-center'/>
   
    <Routes path='/'>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/admin/*' element={<Admin/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/product/:productID' element={<ProductDetail/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path="/*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
