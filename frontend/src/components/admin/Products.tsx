import { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category: "",
    image_url: ""
  });

  const listAllProducts = () => {
    return;
  };
  
  const addNewProduct = () => {};

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
      const response = await axios.post('http://localhost:8000/api/products', {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        category: formData.category,
        image_url: formData.image_url
      });

      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');
      
      // Reset form
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
      {/* Loading Overlay */}
      {sending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Adding product...</p>
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
            <label className="mb-2 font-medium text-gray-700">
              Description
            </label>
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
            <label className="mb-2 font-medium text-gray-700">
              Stock Quantity
            </label>
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
    </>
  );
}