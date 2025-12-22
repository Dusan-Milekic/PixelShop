import { useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image_url: string;
}

export default function Products() {
  const [showFormDiv, setFormDiv] = useState(false);
  const [showProducts, visibiltyProducts] = useState(false);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category: "",
    image_url: ""
  });

  const uniqueCategories = [...new Set(products.map(p => p.category))];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesMinPrice = minPrice === "" || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || product.price <= parseFloat(maxPrice);
    
    return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/admin/products/get');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const listAllProducts = () => {
    setFormDiv(false);
    visibiltyProducts(true);
    fetchProducts();
  };

  const addNewProduct = () => {
    visibiltyProducts(false);
    setFormDiv(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await axios.post('http://localhost:8000/api/admin/products/create', {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        category: formData.category,
        image_url: formData.image_url
      });

      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');

      setFormData({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        category: "",
        image_url: ""
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {(sending || loading) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">
              {sending ? 'Adding product...' : 'Loading products...'}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Products Management</h2>
        <p>Here you can manage your products.</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex gap-5">
        <button
          onClick={listAllProducts}
          className="cursor-pointer text-xl font-semibold mb-4 bg-blue-400 w-50 text-center py-3 rounded-lg text-white hover:bg-blue-500 transition"
        >
          Show all products
        </button>
        <button
          onClick={addNewProduct}
          className="cursor-pointer text-xl font-semibold mb-4 bg-orange-400 w-50 text-center py-3 rounded-lg text-white hover:bg-orange-500 transition"
        >
          Add new products
        </button>
      </div>

      {showFormDiv && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Add Product</h2>
          <form className="space-y-4" onSubmit={submitNewProduct}>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product name"
                required
                disabled={sending}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product description"
                rows={3}
                required
                disabled={sending}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter price"
                required
                disabled={sending}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Stock Quantity</label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter stock quantity"
                required
                disabled={sending}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter category"
                required
                disabled={sending}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter image URL"
                required
                disabled={sending}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition mt-4 ${
                sending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding Product...
                </span>
              ) : (
                'Add Product'
              )}
            </button>
          </form>
        </div>
      )}

      {showProducts && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">All Products</h2>
          
          {/* Filters */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">Search by Name</label>
              <input
                type="text"
                placeholder="Enter product name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Min Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Max Price</label>
                <input
                  type="number"
                  placeholder="999999"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Categories</label>
              <div className="flex flex-wrap gap-3">
                {uniqueCategories.map(category => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSearchName("");
                setSelectedCategories([]);
                setMinPrice("");
                setMaxPrice("");
              }}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Clear Filters
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Stock</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Image URL</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr 
                      key={product.id} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">{product.id}</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{product.name}</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600 max-w-xs truncate">{product.description}</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">{product.price} RSD</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          product.stock_quantity > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock_quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600 text-sm max-w-xs truncate">
                        <a href={product.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          View
                        </a>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <div className="flex gap-2 justify-center">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
                            Edit
                          </button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}