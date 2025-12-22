import Navigation from "./components/user/Navigation"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        // Load script
        const script = document.createElement('script');
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
        script.crossOrigin = "";
        script.async = true;
        
        script.onload = () => {
       
            const map = L.map('map').setView([44.0165, 21.0059], 7); // Coordinates Serbia
            
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);
            
            // Add marker Serbia
            L.marker([44.7866, 20.4489]).addTo(map) // Beograd
                .bindPopup('Belgrade, Serbia')
                .openPopup();
        };
        
        document.body.appendChild(script);
        
        // Cleanup
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            {/* Leaflet CSS */}
            <link 
                rel="stylesheet" 
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" 
                crossOrigin="" 
            />
            
            <Navigation />
            
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold mb-4">
                                Welcome to PixelShop
                            </h1>
                            <p className="text-xl text-slate-300 mb-6">
                                Discover amazing products at prices you'll love
                            </p>
                            <div className="flex gap-4">
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    Browse Products
                                </button>
                                <button className="border border-slate-600 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="bg-slate-800 rounded-lg p-8 h-64 flex items-center justify-center">
                                <p className="text-slate-400 text-center">Product Showcase Image</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🚚</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-slate-600">Get your orders delivered quickly and safely</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💳</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                            <p className="text-slate-600">Shop with confidence using secure checkout</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⭐</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                            <p className="text-slate-600">Curated selection of top-rated items</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sign In Section */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-slate-600 mb-6">Sign in to continue shopping</p>
                        
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors"
                            >
                                Sign In
                            </button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-indigo-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Shopping?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join thousands of happy customers today
                    </p>
                    <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium transition-colors">
                        Create Free Account
                    </button>
                </div>
            </section>

            {/* Location Section with Map */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-4">Our Location</h2>
                    <p className="text-xl text-slate-600 text-center mb-8">
                        📍 Based in Serbia
                    </p>
                    <div className="bg-slate-100 rounded-lg border border-slate-200 p-4 h-96">
                        <div id="map" className="w-full h-full rounded-lg"></div>
                    </div>
                </div>
            </section>

            {/* Contact & Info */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Contact */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <div className="space-y-3 text-slate-600">
                                <p>
                                    <span className="font-medium text-slate-900">Phone:</span><br/>
                                    <a href="tel:+381612341748" className="hover:text-indigo-600">
                                        +381 61 234-1748
                                    </a>
                                </p>
                                <p>
                                    <span className="font-medium text-slate-900">Email:</span><br/>
                                    <a href="mailto:dusanmilekic0511@gmail.com" className="hover:text-indigo-600 break-all">
                                        dusanmilekic0511@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                        
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <a href="#products" className="block text-slate-600 hover:text-indigo-600">Products</a>
                                <a href="#delivery" className="block text-slate-600 hover:text-indigo-600">Delivery Info</a>
                                <a href="#contact" className="block text-slate-600 hover:text-indigo-600">Contact</a>
                            </div>
                        </div>
                        
                        {/* Social */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Connect</h3>
                            <div className="space-y-2">
                                <a 
                                    href="https://rs.linkedin.com/in/dusan-milekic/en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-slate-600 hover:text-indigo-600"
                                >
                                    LinkedIn →
                                </a>
                                <a 
                                    href="https://github.com/Dusan-Milekic"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-slate-600 hover:text-indigo-600"
                                >
                                    GitHub →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-8 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2024 PixelShop. All rights reserved.</p>
                    <p className="text-slate-500">Developed by Dušan Milekić</p>
                </div>
            </footer>
        </>
    )
}