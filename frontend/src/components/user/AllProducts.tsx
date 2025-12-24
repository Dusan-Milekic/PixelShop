import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, X, ShoppingCart, Star } from 'lucide-react';
import NavigationProducts from "./NavigationProducts"
import { useCartStore } from '../../store/cartStore'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  likes: number;
  image_url: string;
}

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/admin/products/get');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  // Handle category toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategories([]);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });
  
  // Product Card Component
  const ProductCard = ({ product }: { product: Product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    
    const handleAddToCart = () => {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    };

    return (
    <div className="group bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-indigo-500 transition-all duration-300 hover:transform hover:scale-105">
      {/* Image */}
      <div className="relative bg-neutral-900 h-64 flex items-center justify-center overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1f2937/818cf8?text=No+Image';
          }}
        />
        {product.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-neutral-900/80 flex items-center justify-center">
            <span className="text-neutral-400 font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/30">
            {product.category}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-neutral-300 text-sm ml-1">
              {(4 + Math.random()).toFixed(1)}
            </span>
          </div>
          <span className="text-neutral-500 text-sm">
            ({product.likes} likes)
          </span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <button 
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              product.stock_quantity > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Stock indicator */}
        <div className="mt-3 text-sm">
          {product.stock_quantity > 10 ? (
            <span className="text-green-400">In Stock ({product.stock_quantity})</span>
          ) : product.stock_quantity > 0 ? (
            <span className="text-yellow-400">Low Stock ({product.stock_quantity})</span>
          ) : (
            <span className="text-red-400">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
  };

  if (loading) {
    return (
      <>
        <NavigationProducts />
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mb-4 mx-auto"></div>
            <p className="text-xl font-semibold text-white">Loading products...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationProducts />
      <div className="min-h-screen bg-neutral-900">
        {/* Hero Section */}
        <section className="relative bg-neutral-800 py-16">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All Products
            </h1>
            <p className="text-lg text-neutral-400">
              Browse our complete collection of {products.length} products
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 sticky top-4">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    Clear All
                  </button>
                </div>

                {/* Search Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-900 cursor-pointer transition-colors duration-300"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-5 h-5 rounded border-neutral-600 bg-neutral-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                        />
                        <span className="text-neutral-300 capitalize">
                          {category}
                        </span>
                        <span className="ml-auto text-sm text-neutral-500">
                          ({products.filter(p => p.category === category).length})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Active Filters */}
                {(searchQuery || minPrice || maxPrice || selectedCategories.length > 0) && (
                  <div className="pt-6 border-t border-neutral-700">
                    <h3 className="text-sm font-semibold text-white mb-3">Active Filters</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <span className="inline-flex items-center gap-2 bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-500/30">
                          Search: {searchQuery}
                          <X
                            className="w-4 h-4 cursor-pointer hover:text-white"
                            onClick={() => setSearchQuery('')}
                          />
                        </span>
                      )}
                      {minPrice && (
                        <span className="inline-flex items-center gap-2 bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-500/30">
                          Min: ${minPrice}
                          <X
                            className="w-4 h-4 cursor-pointer hover:text-white"
                            onClick={() => setMinPrice('')}
                          />
                        </span>
                      )}
                      {maxPrice && (
                        <span className="inline-flex items-center gap-2 bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-500/30">
                          Max: ${maxPrice}
                          <X
                            className="w-4 h-4 cursor-pointer hover:text-white"
                            onClick={() => setMaxPrice('')}
                          />
                        </span>
                      )}
                      {selectedCategories.map((cat) => (
                        <span
                          key={cat}
                          className="inline-flex items-center gap-2 bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-sm capitalize border border-indigo-500/30"
                        >
                          {cat}
                          <X
                            className="w-4 h-4 cursor-pointer hover:text-white"
                            onClick={() => toggleCategory(cat)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-neutral-400">
                  Showing <span className="text-white font-semibold">{filteredProducts.length}</span> of{' '}
                  <span className="text-white font-semibold">{products.length}</span> products
                </p>
              </div>

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-12 text-center">
                  <p className="text-xl text-neutral-400 mb-2">No products found</p>
                  <p className="text-neutral-500">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
  };
