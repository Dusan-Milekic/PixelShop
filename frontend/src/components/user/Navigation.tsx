import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-neutral-900 shadow-lg border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <h2 className="text-2xl font-bold text-white">
                        <a href="/" className="hover:text-indigo-400 transition-colors duration-300">
                            PixelShop
                        </a>
                    </h2>
                    
                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex items-center space-x-1">
                        <li>
                            <a href="/" className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/products" className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="/delivery" className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                Delivery
                            </a>
                        </li>
                        <li>
                            <a href="/location" className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                Location
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/account" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 font-semibold shadow-lg shadow-indigo-500/20">
                                Account
                            </a>
                        </li>
                    </ul>

                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-neutral-300 hover:text-white transition-colors duration-300"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="block px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/products" className="block px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="/delivery" className="block px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                    Delivery
                                </a>
                            </li>
                            <li>
                                <a href="/location" className="block px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                    Location
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="block px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="block px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/account" className="block px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 font-semibold text-center">
                                    Account
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}