import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"
import { getCart, getCartTotal, clearCart } from "../utils/cart.js"
import axios from "axios"
import toast from "react-hot-toast"

export default function Checkout() {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [totals, setTotals] = useState({ subtotal: 0, savings: 0, total: 0 })
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery")
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })

    useEffect(() => {
        const items = getCart()
        if (items.length === 0) {
            navigate("/cartt")
            return
        }
        setCartItems(items)
        setTotals(getCartTotal())

        
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]))
                setForm(prev => ({
                    ...prev,
                    name: decoded.userName || "",
                    email: decoded.email || ""
                }))
            } catch (e) {}
        }
    }, [])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handlePlaceOrder() {
       
        if (!form.name || !form.email || !form.phone || !form.address) {
            toast.error("Please fill in all fields")
            return
        }

        setLoading(true)

        try {
           
            const orderRes = await axios.post(
                "http://localhost:3000/orders",
                {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                    products: cartItems.map(item => ({
                        productID: item.productID,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    }))
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            const orderID = orderRes.data.order?.orderID || orderRes.data.orderID

           
            await axios.post(
                "http://localhost:3000/payments",
                {
                    order: orderID,
                    amount: totals.total,
                    method: paymentMethod
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

           
            clearCart()
            toast.success("Order placed successfully!")
            navigate("/")

        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to place order")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Header />

            <section className="bg-gradient-to-r from-green-50 to-green-100 py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-900">🧾 Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your order</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-3 gap-8">

                    
                    <div className="col-span-2 space-y-6">

                        
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">📍 Delivery Information</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+94 77 123 4567"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="123 Main Street, Colombo 01"
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">💳 Payment Method</h2>
                            <div className="space-y-3">
                                {[
                                    { value: "cashOnDelivery", label: "Cash on Delivery", icon: "💵", desc: "Pay when your order arrives" },
                                    { value: "bank_transfer", label: "Bank Transfer", icon: "🏦", desc: "Transfer to our bank account" },
                                    { value: "online", label: "Online Payment", icon: "💳", desc: "Pay securely online" }
                                ].map((method) => (
                                    <div
                                        key={method.value}
                                        onClick={() => setPaymentMethod(method.value)}
                                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${
                                            paymentMethod === method.value
                                                ? "border-green-700 bg-green-50"
                                                : "border-gray-100 hover:border-gray-200"
                                        }`}
                                    >
                                        <span className="text-2xl">{method.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-gray-800">{method.label}</p>
                                            <p className="text-xs text-gray-500">{method.desc}</p>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === method.value ? "border-green-700" : "border-gray-300"
                                        }`}>
                                            {paymentMethod === method.value && (
                                                <div className="w-2 h-2 rounded-full bg-green-700" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">🛒 Order Items</h2>
                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <div key={item.productID} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-green-700 text-sm">
                                            Rs. {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                   
                    <div className="h-fit sticky top-20 space-y-4">
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-3 pb-4 border-b border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">Rs. {totals.subtotal.toFixed(2)}</span>
                                </div>
                                {totals.savings > 0 && (
                                    <div className="flex justify-between text-sm text-green-700">
                                        <span>Savings</span>
                                        <span className="font-medium">-Rs. {totals.savings.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className="text-green-700 font-medium">Free</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 mb-6">
                                <span className="font-bold text-gray-800">Total</span>
                                <span className="text-2xl font-bold text-green-700">Rs. {totals.total.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold transition"
                            >
                                {loading ? "Placing Order..." : "✅ Place Order"}
                            </button>

                            <button
                                onClick={() => navigate("/cartt")}
                                className="w-full mt-3 border border-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-50 text-sm"
                            >
                                ← Back to Cart
                            </button>
                        </div>

                        <div className="bg-green-50 rounded-xl border border-green-100 p-4">
                            <p className="text-xs text-green-700 font-medium mb-2">🔒 Secure Checkout</p>
                            <p className="text-xs text-gray-600">Your information is safe and encrypted. We never store payment details.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}