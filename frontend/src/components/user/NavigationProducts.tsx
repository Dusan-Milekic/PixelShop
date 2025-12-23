import { useState } from 'react';
import { Menu, X, ChevronDown, Monitor, Cpu, Headphones, Tv, User } from 'lucide-react';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const categories = [
        { name: 'Monitors', icon: <Monitor className="w-4 h-4" />, href: '/products#monitors' },
        { name: 'Gaming PCs', icon: <Cpu className="w-4 h-4" />, href: '/products#pcs' },
        { name: 'Headphones', icon: <Headphones className="w-4 h-4" />, href: '/products#headphones' },
        { name: 'TVs', icon: <Tv className="w-4 h-4" />, href: '/products#tvs' },
    ];

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
                        {/* Category Dropdown */}
                        <li className="relative">
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                onMouseEnter={() => setIsCategoryOpen(true)}
                                className="flex items-center gap-1 px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300"
                            >
                                Categories
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Dropdown Menu */}
                            {isCategoryOpen && (
                                <div 
                                    onMouseLeave={() => setIsCategoryOpen(false)}
                                    className="absolute top-full left-0 mt-2 w-56 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl py-2 z-50"
                                >
                                    {categories.map((category, index) => (
                                        <a
                                            key={index}
                                            href={category.href}
                                            className="flex items-center gap-3 px-4 py-3 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors duration-300"
                                        >
                                            <span className="text-indigo-400">{category.icon}</span>
                                            {category.name}
                                        </a>
                                    ))}
                                    <div className="border-t border-neutral-700 my-2"></div>
                                    <a
                                        href="/products"
                                        className="flex items-center gap-3 px-4 py-3 text-indigo-400 hover:text-indigo-300 hover:bg-neutral-700 transition-colors duration-300 font-semibold"
                                    >
                                        View All Products →
                                    </a>
                                </div>
                            )}
                        </li>

                        <li>
                            <a href="/account" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 font-semibold shadow-lg shadow-indigo-500/20">
                                <User className="w-4 h-4" />
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
                            {/* Mobile Category Section */}
                            <li>
                                <button
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300"
                                >
                                    Categories
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isCategoryOpen && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        {categories.map((category, index) => (
                                            <a
                                                key={index}
                                                href={category.href}
                                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors duration-300"
                                            >
                                                <span className="text-indigo-400">{category.icon}</span>
                                                {category.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </li>

                            <li>
                                <a href="/account" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 font-semibold">
                                    <User className="w-4 h-4" />
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