import { useState } from 'react';
import { useCartStore } from './store/cartStore';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, ArrowLeft, Lock, Check, ShoppingBag } from 'lucide-react';
import NavigationProducts from './components/user/NavigationProducts';

interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface CardInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

type PaymentMethod = 'card' | 'paypal' | 'crypto';

export default function PaymentPage() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Serbia'
  });

  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <>
        <NavigationProducts />
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="w-24 h-24 text-neutral-700 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">No items to checkout</h2>
            <p className="text-neutral-400 mb-8">
              Your cart is empty. Please add items before proceeding to payment.
            </p>
            <button
              onClick={() => navigate('/allproducts')}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate billing info
    if (!billingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!billingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!billingInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingInfo.email)) newErrors.email = 'Invalid email format';
    if (!billingInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!billingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!billingInfo.city.trim()) newErrors.city = 'City is required';
    if (!billingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Validate card info if card payment is selected
    if (paymentMethod === 'card') {
      if (!cardInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(cardInfo.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number';
      if (!cardInfo.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!cardInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expiryDate)) newErrors.expiryDate = 'Invalid format (MM/YY)';
      if (!cardInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(cardInfo.cvv)) newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsProcessing(true);

  try {
    // Dobavi user_id iz cookies
    const userId = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_id='))
      ?.split('=')[1];

    if (!userId) {
      alert('User not authenticated. Please log in.');
      setIsProcessing(false);
      navigate('/login');
      return;
    }

    // Pripremi podatke u formatu koji backend očekuje
    const orderData = {
      user_id: parseInt(userId),
      total_amount: parseFloat(total.toFixed(2)),
      price: parseFloat(subtotal.toFixed(2)),
      First_Name: billingInfo.firstName,
      Last_Name: billingInfo.lastName,
      Email: billingInfo.email,
      Address: billingInfo.address,
      City: billingInfo.city,
      Zipcode: billingInfo.zipCode,
      Country: billingInfo.country,
      Phone_Number: billingInfo.phone,
      Payment_Method: paymentMethod === 'card' ? 'Credit Card' : 
                      paymentMethod === 'paypal' ? 'PayPal' : 'Crypto'
    };

    console.log('Sending order data:', orderData); // Za debugging

    const response = await fetch('http://localhost:8000/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Uspešna porudžbina
      clearCart();
      setIsProcessing(false);
      alert(`Payment successful! Order #${result.data.id} created. Thank you for your purchase.`);
      navigate('/');
    } else {
      // Error handling
      setIsProcessing(false);
      const errorMessage = result.message || 'Payment failed. Please try again.';
      alert(errorMessage);
      console.error('Order creation failed:', result);
    }
  } catch (error) {
    setIsProcessing(false);
    alert('Network error. Please check your connection and try again.');
    console.error('Network error:', error);
  }
};

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <>
      <NavigationProducts />
      <div className="min-h-screen bg-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/cart')}
              className="text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl font-bold text-white">Secure Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Billing Information */}
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Billing Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-300 mb-2 text-sm font-medium">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.firstName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                        className={`w-full bg-neutral-900 border ${errors.firstName ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-neutral-300 mb-2 text-sm font-medium">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.lastName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                        className={`w-full bg-neutral-900 border ${errors.lastName ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="block text-neutral-300 mb-2 text-sm font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                        className={`w-full bg-neutral-900 border ${errors.email ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                        placeholder="john.doe@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-neutral-300 mb-2 text-sm font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                        className={`w-full bg-neutral-900 border ${errors.phone ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                        placeholder="+381 60 123 4567"
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-neutral-300 mb-2 text-sm font-medium">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                        className={`w-full bg-neutral-900 border ${errors.address ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                        placeholder="123 Main Street"
                      />
                      {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-neutral-300 mb-2 text-sm font-medium">
                        City *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                        className={`w-full bg-neutral-900 border ${errors.city ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                        placeholder="Belgrade"
                      />
                      {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-neutral-300 mb-2 text-sm font-medium">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.zipCode}
                        onChange={(e) => setBillingInfo({ ...billingInfo, zipCode: e.target.value })}
                        className={`w-full bg-neutral-900 border ${errors.zipCode ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                        placeholder="11000"
                      />
                      {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-neutral-300 mb-2 text-sm font-medium">
                        Country *
                      </label>
                      <select
                        value={billingInfo.country}
                        onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                      >
                        <option value="Serbia">Serbia</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="North Macedonia">North Macedonia</option>
                        <option value="Slovenia">Slovenia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        paymentMethod === 'card'
                          ? 'border-indigo-500 bg-indigo-900/30'
                          : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                      }`}
                    >
                      <CreditCard className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-indigo-400' : 'text-neutral-400'}`} />
                      <p className="text-white font-semibold text-sm">Credit Card</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        paymentMethod === 'paypal'
                          ? 'border-indigo-500 bg-indigo-900/30'
                          : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                      }`}
                    >
                      <Wallet className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'paypal' ? 'text-indigo-400' : 'text-neutral-400'}`} />
                      <p className="text-white font-semibold text-sm">PayPal</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        paymentMethod === 'crypto'
                          ? 'border-indigo-500 bg-indigo-900/30'
                          : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                      }`}
                    >
                      <Wallet className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'crypto' ? 'text-indigo-400' : 'text-neutral-400'}`} />
                      <p className="text-white font-semibold text-sm">Crypto</p>
                    </button>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-neutral-300 mb-2 text-sm font-medium">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={cardInfo.cardNumber}
                          onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: formatCardNumber(e.target.value) })}
                          className={`w-full bg-neutral-900 border ${errors.cardNumber ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-neutral-300 mb-2 text-sm font-medium">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={cardInfo.cardName}
                          onChange={(e) => setCardInfo({ ...cardInfo, cardName: e.target.value.toUpperCase() })}
                          className={`w-full bg-neutral-900 border ${errors.cardName ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                          placeholder="JOHN DOE"
                        />
                        {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-neutral-300 mb-2 text-sm font-medium">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={cardInfo.expiryDate}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: formatExpiryDate(e.target.value) })}
                            className={`w-full bg-neutral-900 border ${errors.expiryDate ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                        </div>

                        <div>
                          <label className="block text-neutral-300 mb-2 text-sm font-medium">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, '') })}
                            className={`w-full bg-neutral-900 border ${errors.cvv ? 'border-red-500' : 'border-neutral-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors duration-300`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8">
                      <p className="text-neutral-400 mb-4">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                      <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
                        PayPal
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'crypto' && (
                    <div className="text-center py-8">
                      <p className="text-neutral-400 mb-4">
                        Cryptocurrency payment support coming soon.
                      </p>
                      <p className="text-neutral-500 text-sm">
                        We'll accept Bitcoin, Ethereum, and other major cryptocurrencies.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 sticky top-4">
                  <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                  {/* Cart Items */}
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 pb-3 border-b border-neutral-700">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/64x64/1f2937/818cf8?text=No+Image';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-sm line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-neutral-400 text-xs">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-indigo-400 font-semibold text-sm mt-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-neutral-700 pt-4 space-y-3">
                    <div className="flex justify-between text-neutral-300">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

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

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Complete Payment
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security Features */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-neutral-400 text-xs">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-xs">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>PCI DSS compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-xs">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Secure payment gateway</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 text-center">
                    <p className="text-neutral-500 text-xs mb-2">Secured by</p>
                    <div className="flex justify-center gap-2">
                      <div className="bg-neutral-900 px-3 py-2 rounded border border-neutral-700">
                        <span className="text-neutral-400 text-xs font-semibold">Stripe</span>
                      </div>
                      <div className="bg-neutral-900 px-3 py-2 rounded border border-neutral-700">
                        <span className="text-neutral-400 text-xs font-semibold">Norton</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}