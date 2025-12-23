import AdminPanel from './AdminPanel'
import './App.css'
import Contact from './Contact'
import Delivery from './Delivery'
import Home from './Home'
import Products from './components/admin/Products'
import Location from './Location'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Account from './Account'
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
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
