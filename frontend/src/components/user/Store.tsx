import { useEffect, useState } from 'react';
import axios from 'axios';
import { Monitor, Cpu, Headphones, Tv, ShoppingCart, Star, Tag } from 'lucide-react';

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

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Filter products by category
  const monitors = products.filter(p => p.category === 'monitors').slice(0,4);
  const pcs = products.filter(p => p.category === 'pcs').slice(0,4);
  const headphones = products.filter(p => p.category === 'headphones').slice(0,4);
  const tvs = products.filter(p => p.category === 'tvs').slice(0,4);

  // Best deals under $200
  const bestDeals = products.filter(p => p.price <= 200 && p.stock_quantity > 0);

  const ProductCard = ({ product, showDealBadge = false }: { product: Product; showDealBadge?: boolean }) => (
    <div className="group bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-indigo-500 transition-all duration-300 hover:transform hover:scale-105 relative">
      {/* Deal Badge */}
      {showDealBadge && (
        <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
          <Tag className="w-4 h-4" />
          DEAL
        </div>
      )}

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

  const CategorySection = ({ 
    title, 
    icon, 
    products, 
    bgGradient 
  }: { 
    title: string; 
    icon: React.ReactNode; 
    products: Product[]; 
    bgGradient: string;
  }) => {
    if (products.length === 0) return null;
    
    return (
      <section className="mb-20" id={title.toLowerCase().replace(/\s+/g, '-')}>
        {/* Category Header */}
        <div className={`relative ${bgGradient} rounded-2xl p-12 mb-8 overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-transparent"></div>
          <div className="relative flex items-center gap-4">
            <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
              {icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mb-4 mx-auto"></div>
          <p className="text-xl font-semibold text-white">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Hero Section */}
      <section className="relative bg-neutral-800 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Products
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Discover our curated selection of premium tech products
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Best Deals Under $200 */}
          {bestDeals.length > 0 && (
            <section className="mb-20" id="best-deals">
              {/* Deal Header */}
              <div className="relative bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-12 mb-8 overflow-hidden border-2 border-red-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-transparent"></div>
                <div className="relative flex items-center gap-4">
                  <div className="bg-red-500 p-4 rounded-xl shadow-lg">
                    <Tag className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Best Deals Under $200</h2>
                    <p className="text-red-200 text-lg mt-2">Don't miss out on these amazing offers!</p>
                  </div>
                </div>
              </div>

              {/* Deals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestDeals.map((product) => (
                  <ProductCard key={product.id} product={product} showDealBadge={true} />
                ))}
              </div>
            </section>
          )}

          {/* Monitors */}
          <CategorySection
            title="Monitors"
            icon={<Monitor className="w-12 h-12 text-indigo-400" />}
            products={monitors}
            bgGradient="bg-gradient-to-r from-blue-900/20 to-indigo-900/20"
          />

          {/* PCs */}
          <CategorySection
            title="Gaming PCs"
            icon={<Cpu className="w-12 h-12 text-indigo-400" />}
            products={pcs}
            bgGradient="bg-gradient-to-r from-purple-900/20 to-pink-900/20"
          />

          {/* Headphones */}
          <CategorySection
            title="Headphones"
            icon={<Headphones className="w-12 h-12 text-indigo-400" />}
            products={headphones}
            bgGradient="bg-gradient-to-r from-green-900/20 to-teal-900/20"
          />

          {/* TVs */}
          <CategorySection
            title="TVs"
            icon={<Tv className="w-12 h-12 text-indigo-400" />}
            products={tvs}
            bgGradient="bg-gradient-to-r from-orange-900/20 to-red-900/20"
          />

        </div>
      </section>
    </div>
  );
}