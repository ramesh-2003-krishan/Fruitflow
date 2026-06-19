import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"
import axios from "axios"

export default function MyOrders() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }
        fetchOrders()
    }, [])

    function fetchOrders() {
        axios.get("http://localhost:3000/orders", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            // Sort newest first
            const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
            setOrders(sorted)
            setLoading(false)
        }).catch(() => {
            setError("Failed to load your orders")
            setLoading(false)
        })
    }

    function getStatusStyle(status) {
        switch (status) {
            case "pending": return "bg-amber-100 text-amber-700"
            case "processing": return "bg-blue-100 text-blue-700"
            case "shipped": return "bg-purple-100 text-purple-700"
            case "delivered": return "bg-green-100 text-green-700"
            case "cancelled": return "bg-red-100 text-red-700"
            default: return "bg-gray-100 text-gray-700"
        }
    }

    function getStatusIcon(status) {
        switch (status) {
            case "pending": return "⏳"
            case "processing": return "⚙️"
            case "shipped": return "🚚"
            case "delivered": return "✅"
            case "cancelled": return "❌"
            default: return "📦"
        }
    }

   function getOrderTotal(products) {
    if (!products || !Array.isArray(products)) return 0
    
    return products.reduce((sum, p) => {
        const price = Number(p.price) || 0
        const quantity = Number(p.quantity) || 0
        return sum + (price * quantity)
    }, 0)
}

    function getStatusStep(status) {
        const steps = ["pending", "processing", "shipped", "delivered"]
        return steps.indexOf(status)
    }

    const filtered = orders.filter(order => {
        const matchesSearch =
            order.orderID.toLowerCase().includes(search.toLowerCase()) ||
            order.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()))

        const matchesStatus = statusFilter === "all" || order.status === statusFilter

        return matchesSearch && matchesStatus
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-green-700 text-lg">Loading your orders...</p>
            </div>
        )
    }


    return (
        <div>
            <Header />

          
            <section className="bg-gradient-to-r from-green-50 to-green-100 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-900">📦 My Orders</h1>
                    <p className="text-gray-600 mt-2">Track and manage your orders</p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-8">

                {error ? (
                    <div className="text-center py-16">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                  
                    <div className="text-center py-20">
                        <p className="text-6xl mb-4">🛒</p>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-8">When you place an order, it will appear here.</p>
                        <Link to="/product" className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg inline-block font-medium">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                      
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                                <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                                <p className="text-xs text-gray-500 mb-1">Pending</p>
                                <p className="text-2xl font-bold text-amber-600">
                                    {orders.filter(o => o.status === "pending").length}
                                </p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                                <p className="text-xs text-gray-500 mb-1">Delivered</p>
                                <p className="text-2xl font-bold text-green-700">
                                    {orders.filter(o => o.status === "delivered").length}
                                </p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                                <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    Rs. {orders.reduce((sum, o) => sum + getOrderTotal(o.products), 0).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        
                        <div className="flex gap-3 mb-6">
                            <input
                                type="text"
                                placeholder="🔍 Search by order ID or product name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-green-700"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-green-700"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                       
                        {filtered.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-500">No orders match your search</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filtered.map((order) => (
                                    <div
                                        key={order.orderID}
                                        className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition cursor-pointer"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-gray-800">{order.orderID}</p>
                                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusStyle(order.status)}`}>
                                                        {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                                </p>
                                            </div>
                                            <p className="text-lg font-bold text-green-700">
                                                Rs. {getOrderTotal(order.products).toFixed(2)}
                                            </p>
                                        </div>

                                       
                                        <div className="flex items-center gap-2 mb-3 overflow-x-auto">
                                            {order.products.slice(0, 4).map((p, idx) => (
                                                <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-100 whitespace-nowrap">
                                                    {p.name} × {p.quantity}
                                                </span>
                                            ))}
                                            {order.products.length > 4 && (
                                                <span className="text-xs text-gray-400">+{order.products.length - 4} more</span>
                                            )}
                                        </div>

                                       
                                        {order.status !== "cancelled" && (
                                            <div className="flex items-center gap-1 mt-3">
                                                {["pending", "processing", "shipped", "delivered"].map((step, idx) => (
                                                    <div key={step} className="flex items-center flex-1">
                                                        <div className={`w-2.5 h-2.5 rounded-full ${
                                                            idx <= getStatusStep(order.status) ? "bg-green-700" : "bg-gray-200"
                                                        }`} />
                                                        {idx < 3 && (
                                                            <div className={`flex-1 h-0.5 ${
                                                                idx < getStatusStep(order.status) ? "bg-green-700" : "bg-gray-200"
                                                            }`} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-xs text-gray-400">📍 {order.address}</p>
                                            <button className="text-xs text-green-700 font-medium hover:underline">
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

           
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">{selectedOrder.orderID}</h2>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(selectedOrder.date).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                          
                            <div className="mb-6">
                                <span className={`inline-block text-sm px-3 py-1.5 rounded-full font-medium ${getStatusStyle(selectedOrder.status)}`}>
                                    {getStatusIcon(selectedOrder.status)} {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                </span>
                            </div>

                           
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500 mb-2">Delivery Information</p>
                                <p className="text-sm font-medium text-gray-800">{selectedOrder.name}</p>
                                <p className="text-sm text-gray-600 mt-1">📧 {selectedOrder.email}</p>
                                <p className="text-sm text-gray-600 mt-1">📱 {selectedOrder.phone}</p>
                                <p className="text-sm text-gray-600 mt-1">📍 {selectedOrder.address}</p>
                            </div>

                          
                            <div className="mb-6">
                                <p className="text-xs text-gray-500 mb-3">Order Items</p>
                                <div className="space-y-2">
                                    {selectedOrder.products.map((p, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{p.name}</p>
                                                <p className="text-xs text-gray-400">Qty: {p.quantity} × Rs. {p.price}</p>
                                            </div>
                                            <p className="text-sm font-medium text-green-700">
                                                Rs. {(p.price * p.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                          
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <p className="text-sm font-medium text-gray-800">Total Amount</p>
                                <p className="text-xl font-bold text-green-700">
                                    Rs. {getOrderTotal(selectedOrder.products).toFixed(2)}
                                </p>
                            </div>

                            
                            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                                <p className="text-xs text-blue-700">
                                    Need help with this order? <Link to="/contact" className="font-medium hover:underline">Contact support</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}