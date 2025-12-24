import AdminPanel from './AdminPanel'
import './App.css'
import Contact from './Contact'
import Delivery from './Delivery'
import Home from './Home'
import Products from './components/admin/Products'
import Location from './Location'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Account from './Account'
import ProductPage from './ProductPage'
import AllProducts from './components/user/AllProducts'
import Monitors from './components/user/Monitors'
import Pc from './components/user/Pc'
import Headphones from './components/user/Headphones'
import Tv from './components/user/Tv'
import CartPage from './CartPage'
function App() {


  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path="/admin" element={<AdminPanel/>} />
        <Route path="/admin/products" element={<Products/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/delivery" element={<Delivery/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/location" element={<Location/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/allproducts" element={<AllProducts/>}/>
        <Route path="/monitors" element={<Monitors/>}/>
        <Route path="/pc" element={<Pc/>}/>
        <Route path="/headphones" element={<Headphones/>}/>
        <Route path="/tv" element={<Tv/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
