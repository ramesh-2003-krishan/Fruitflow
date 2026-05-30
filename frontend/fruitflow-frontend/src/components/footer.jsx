import { Link } from "react-router-dom"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🌿</span>
                            <span className="font-semibold text-white text-lg">FruitFlow</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Fresh fruits delivered to your doorstep. Quality, freshness, and sustainability in every order.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-green-400 text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-green-400 text-sm">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-green-400 text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-green-400 text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-green-400 text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-green-400 text-sm">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-green-400 text-sm">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-green-400 text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <span>📍</span>
                                <span>123 Fresh Street, Negombo, SL</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📧</span>
                                <a href="mailto:info@fruitflow.com" className="hover:text-green-400">
                                    info@fruitflow.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📱</span>
                                <a href="tel:+94123456789" className="hover:text-green-400">
                                    +94 123 456 789
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-sm text-gray-400 mb-4 md:mb-0">
                            © {currentYear} FruitFlow. All rights reserved.
                        </p>

                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-400 hover:text-green-400 text-lg">
                                📘
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 text-lg">
                                🐦
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 text-lg">
                                📷
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 text-lg">
                                💼
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}