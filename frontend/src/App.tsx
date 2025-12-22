import AdminPanel from './AdminPanel'
import './App.css'
import Home from './Home'
import Products from './components/admin/Products'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {


  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path="/admin" element={<AdminPanel/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
