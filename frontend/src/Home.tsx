import { useEffect } from "react";
import L from "leaflet";
import { Truck, Shield, Star, ArrowRight } from 'lucide-react';
import Navigation from "./components/user/Navigation";

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
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
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
            <Navigation/>
            {/* Hero Section */}
            <section className="relative bg-neutral-800 py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
                            Welcome to PixelShop
                        </h1>
                        <p className="text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto">
                            Discover amazing products at prices you'll love. Your next favorite purchase is just a click away.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="/products"
                                className="inline-flex items-center justify-center bg-indigo-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20"
                            >
                                Browse Products
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                            <a
                                href="/about"
                                className="inline-flex items-center justify-center border-2 border-neutral-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-neutral-700 hover:border-neutral-500 transition-all duration-300"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-neutral-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Why Choose PixelShop?
                        </h2>
                        <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                            We provide exceptional service and quality products to make your shopping experience unforgettable
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group bg-neutral-800 p-10 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 text-center">
                            <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Truck className="w-16 h-16 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Fast Delivery</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Get your orders delivered quickly and safely within 24-48 hours
                            </p>
                        </div>
                        
                        <div className="group bg-neutral-800 p-10 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 text-center">
                            <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Shield className="w-16 h-16 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Secure Payment</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Shop with confidence using our secure and encrypted checkout system
                            </p>
                        </div>
                        
                        <div className="group bg-neutral-800 p-10 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 text-center">
                            <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Star className="w-16 h-16 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Quality Products</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Curated selection of top-rated items from trusted brands
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Start Shopping?
                    </h2>
                    <p className="text-xl text-neutral-400 mb-10 max-w-3xl mx-auto">
                        Join thousands of happy customers today and discover products you'll love
                    </p>
                    <a
                        href="/account"
                        className="inline-block bg-indigo-600 text-white px-12 py-5 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20"
                    >
                        Create Free Account
                    </a>
                </div>
            </section>

            {/* Location Section with Map */}
            <section className="py-24 bg-neutral-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our Location
                        </h2>
                        <p className="text-xl text-neutral-400">
                            📍 Based in Serbia
                        </p>
                    </div>
                    <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4 h-96">
                        <div id="map" className="w-full h-full rounded-lg"></div>
                    </div>
                </div>
            </section>

            {/* Contact & Info Section */}
            <section className="py-24 bg-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Contact */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
                            <div className="space-y-4 text-neutral-400">
                                <p>
                                    <span className="font-semibold text-white block mb-1">Phone:</span>
                                    <a href="tel:+381612341748" className="hover:text-indigo-400 transition-colors duration-300">
                                        +381 61 234-1748
                                    </a>
                                </p>
                                <p>
                                    <span className="font-semibold text-white block mb-1">Email:</span>
                                    <a href="mailto:dusanmilekic0511@gmail.com" className="hover:text-indigo-400 transition-colors duration-300 break-all">
                                        dusanmilekic0511@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                        
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
                            <div className="space-y-3">
                                <a href="/products" className="block text-neutral-400 hover:text-indigo-400 transition-colors duration-300">
                                    Products
                                </a>
                                <a href="/delivery" className="block text-neutral-400 hover:text-indigo-400 transition-colors duration-300">
                                    Delivery Info
                                </a>
                                <a href="/contact" className="block text-neutral-400 hover:text-indigo-400 transition-colors duration-300">
                                    Contact
                                </a>
                                <a href="/about" className="block text-neutral-400 hover:text-indigo-400 transition-colors duration-300">
                                    About Us
                                </a>
                            </div>
                        </div>
                        
                        {/* Social */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Connect</h3>
                            <div className="space-y-3">
                                <a 
                                    href="https://rs.linkedin.com/in/dusan-milekic/en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-neutral-400 hover:text-indigo-400 transition-colors duration-300"
                                >
                                    LinkedIn →
                                </a>
                                <a 
                                    href="https://github.com/Dusan-Milekic"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-neutral-400 hover:text-indigo-400 transition-colors duration-300"
                                >
                                    GitHub →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 border-t border-neutral-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-500">© 2024 PixelShop. All rights reserved.</p>
                    <p className="text-neutral-600">Developed by Dušan Milekić</p>
                </div>
            </footer>
        </>
    );
}