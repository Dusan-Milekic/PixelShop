export default function Navigation() {
    return (
        <nav className="bg-slate-900 shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <h2 className="text-2xl font-bold text-white">
                        PixelShop
                    </h2>
                    
                    {/* Navigation Links */}
                    <ul className="hidden md:flex items-center space-x-1">
                        <li>
                            <a href="#account" className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                                Account
                            </a>
                        </li>
                        <li>
                            <a href="#delivery" className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                                Delivery
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="#location" className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                                Location
                            </a>
                        </li>
                        <li>
                            <a href="#products" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium">
                                Products
                            </a>
                        </li>
                    </ul>

                    {/* Mobile menu button */}
                    <button className="md:hidden text-slate-300 hover:text-white transition-colors">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}