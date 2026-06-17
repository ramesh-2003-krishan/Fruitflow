import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"
import { getCart, removeFromCart, updateQuantity, getCartTotal, clearCart } from "../utils/cart.js"

export default function Cartt() {
    const [cartItems, setCartItems] = useState([])
    const [totals, setTotals] = useState({ subtotal: 0, savings: 0, total: 0 })

    useEffect(() => {
        loadCart()
    }, [])

    function loadCart() {
        const items = getCart()
        setCartItems(items)
        setTotals(getCartTotal())
    }

    function handleRemove(productID) {
        removeFromCart(productID)
        loadCart()
    }

    function handleQuantityChange(productID, newQty) {
        if (newQty < 1) {
            handleRemove(productID)
        } else {
            updateQuantity(productID, newQty)
            loadCart()
        }
    }

    function handleClearCart() {
        if (window.confirm("Clear entire cart?")) {
            clearCart()
            loadCart()
        }
    }

    if (cartItems.length === 0) {
        return (
            <div>
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <p className="text-5xl mb-4">🛒</p>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Add some fresh fruits to get started!</p>
                        <Link to="/product" className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg inline-block">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-3 gap-8">
                    
                    <div className="col-span-2">
                        <div className="bg-white rounded-lg border border-gray-100">
                            {cartItems.map((item) => (
                                <div key={item.productID} className="flex gap-4 p-4 border-b border-gray-100 hover:bg-gray-50">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-green-700 font-bold">Rs. {item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleQuantityChange(item.productID, item.quantity - 1)} className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-100">-</button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.productID, item.quantity + 1)} className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-100">+</button>
                                    </div>
                                    <p className="font-semibold text-gray-800 w-20 text-right">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => handleRemove(item.productID)} className="text-red-600 hover:text-red-800 text-xl">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                   
                    <div className="bg-white rounded-lg border border-gray-100 p-6 h-fit sticky top-20">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold">Rs. {totals.subtotal.toFixed(2)}</span>
                            </div>
                            {totals.savings > 0 && (
                                <div className="flex justify-between text-green-700">
                                    <span>Savings</span>
                                    <span className="font-semibold">-Rs. {totals.savings.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>Rs. {totals.total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold mb-2">
                            Proceed to Checkout
                        </button>
                        <button onClick={handleClearCart} className="w-full border border-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}