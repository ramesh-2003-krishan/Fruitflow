import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { getCartCount } from "../utils/cart"


export default function Header() {
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    let user = null
    
    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]))
            user = decoded
        } catch (e) {
            console.log("Can't decode token")
        }
    }

    function handleLogout() {
        localStorage.removeItem("token")
        toast.success("Logged out successfully")
        setUserMenuOpen(false)
        navigate("/")
    }

     window.addEventListener("focus", () => {
        setCartCount(getCartCount())
    })

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">

                    <Link to="/home" className="flex items-center gap-2 font-semibold text-lg text-green-700 hover:text-green-800">
                        <span className="text-2xl">🌿</span>
                        FruitFlow
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/home" className="text-gray-600 hover:text-green-700 text-sm font-medium">
                            Home
                        </Link>
                        <Link to="/product" className="text-gray-600 hover:text-green-700 text-sm font-medium">
                            Products
                        </Link>
                         <Link to="/shop" className="text-gray-600 hover:text-green-700 text-sm font-medium">
                            Shops
                        </Link>
                        <Link to="/about" className="text-gray-600 hover:text-green-700 text-sm font-medium">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-600 hover:text-green-700 text-sm font-medium">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                         <Link 
                            to="/cartt"
                            className="relative p-2 text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-lg transition"
                        >
                            <span className="text-2xl">🛒</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount > 9 ? "9+" : cartCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium text-sm">
                                        {user?.userName?.[0] || "U"}
                                    </div>
                                    <span className="text-sm text-gray-700">{user?.userName}</span>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-xs text-gray-500">Logged in as</p>
                                            <p className="text-sm font-medium text-gray-800">{user?.email}</p>
                                        </div>

                                        {user?.role === "admin" && (
                                            <Link
                                                to="/admin"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                📊 Admin Panel
                                            </Link>
                                        )}

                                        <Link
                                            to="/"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            👤 My Profile
                                        </Link>
                                        <Link
                                            to="/"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            📦 My Orders
                                        </Link>

                                        <button
                                            to="/login"
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 cursor-pointer"
                                        >
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 text-sm text-white bg-green-700 rounded-lg hover:bg-green-800 font-medium"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}