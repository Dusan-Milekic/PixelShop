import { useCartStore } from './store/cartStore';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import NavigationProducts from './components/user/NavigationProducts';

export default function CartPage() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? (subtotal >= 50 ? 0 : 10) : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  // Proceed to checkout 
  const handleProceedToCheckout = () => {
    navigate('/payment');
  };

  if (cart.length === 0) {
    return (
      <>
        <NavigationProducts />
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="w-24 h-24 text-neutral-700 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-neutral-400 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <a 
              href="/allproducts" 
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationProducts />
      <div className="min-h-screen bg-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-neutral-400 hover:text-red-400 transition-colors duration-300 text-sm"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 hover:border-indigo-500 transition-all duration-300"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/128x128/1f2937/818cf8?text=No+Image';
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-neutral-400 text-sm line-clamp-2 mb-3">
                          {item.description}
                        </p>
                        <span className="inline-block bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/30 capitalize">
                          {item.category}
                        </span>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-2xl font-bold text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-neutral-900 rounded-lg border border-neutral-700">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-neutral-700 rounded-l-lg transition-colors duration-300"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="text-white font-semibold px-4">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-neutral-700 rounded-r-lg transition-colors duration-300"
                              disabled={item.quantity >= item.stock_quantity}
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Stock Warning */}
                      {item.quantity >= item.stock_quantity && (
                        <p className="text-yellow-400 text-sm mt-2">
                          Maximum available quantity reached
                        </p>
                      )}

                      {/* Price per item */}
                      <p className="text-neutral-500 text-sm mt-2">
                        ${item.price} each
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <a
                href="/allproducts"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-300 mt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </a>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                {/* Items Count */}
                <div className="flex justify-between text-neutral-400 mb-3">
                  <span>Items ({cart.length})</span>
                  <span>{cart.reduce((total, item) => total + item.quantity, 0)} total</span>
                </div>

                <div className="border-t border-neutral-700 pt-4 space-y-3">
                  {/* Subtotal */}
                  <div className="flex justify-between text-neutral-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between text-neutral-300">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {/* Free Shipping Progress */}
                  {subtotal < 50 && subtotal > 0 && (
                    <div className="bg-neutral-900 rounded-lg p-3 border border-neutral-700">
                      <p className="text-sm text-neutral-400 mb-2">
                        Add <span className="text-indigo-400 font-semibold">${(50 - subtotal).toFixed(2)}</span> more for FREE shipping!
                      </p>
                      <div className="w-full bg-neutral-700 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(subtotal / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Tax */}
                  <div className="flex justify-between text-neutral-300">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-neutral-700 mt-4 pt-4">
                  <div className="flex justify-between text-white text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button 
                    className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20 mb-3" 
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>

                  {/* Payment Icons */}
                  <div className="flex justify-center gap-2 mt-4">
                    <div className="bg-neutral-900 px-3 py-2 rounded border border-neutral-700">
                      <span className="text-neutral-400 text-xs">VISA</span>
                    </div>
                    <div className="bg-neutral-900 px-3 py-2 rounded border border-neutral-700">
                      <span className="text-neutral-400 text-xs">MASTERCARD</span>
                    </div>
                    <div className="bg-neutral-900 px-3 py-2 rounded border border-neutral-700">
                      <span className="text-neutral-400 text-xs">PAYPAL</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                  <p className="text-neutral-500 text-xs">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}