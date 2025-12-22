import { BrowserRouter,Link ,Routes,Route} from "react-router-dom";
import Products from "./components/admin/Products"
export default function AdminPanel() {
  return (
    <>
    
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
        <h1>Admin Panel</h1>
        <nav className="flex px-2 gap-10">
          <Link to="/users">Users</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </div>


    </>
    
  )
}