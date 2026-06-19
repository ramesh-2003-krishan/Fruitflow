import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"
import axios from "axios"
import toast from "react-hot-toast"

export default function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("overview")
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({ name: "", email: "" })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        try {
            const decoded = JSON.parse(atob(token.split('.')[1]))
            setUser(decoded)
            setForm({ name: decoded.userName || "", email: decoded.email || "" })
        } catch (e) {
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
            setOrders(res.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    function handleLogout() {
        localStorage.removeItem("token")
        toast.success("Logged out successfully")
        navigate("/")
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

    function getOrderTotal(products) {
        return products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
    }

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-green-700 text-lg">Loading profile...</p>
            </div>
        )
    }

    const totalSpent = orders.reduce((sum, o) => sum + getOrderTotal(o.products), 0)
    const deliveredCount = orders.filter(o => o.status === "delivered").length
    const pendingCount = orders.filter(o => o.status === "pending" || o.status === "processing").length

    return (
        <div>
            <Header />

           
            <section className="bg-gradient-to-r from-green-700 to-green-800 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-green-700 shadow-lg">
                            {user.image ? (
                                <img src={user.image} alt={user.userName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                user.userName?.[0]?.toUpperCase() || "U"
                            )}
                        </div>
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">{user.userName}</h1>
                            <p className="text-green-100 mt-1">{user.email}</p>
                            <span className="inline-block mt-2 text-xs bg-green-600 px-3 py-1 rounded-full font-medium">
                                {user.role === "admin" ? "👑 Admin" : "🌿 Customer"}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-4 gap-6">

                  
                    <div className="col-span-1">
                        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-1 sticky top-20">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                    activeTab === "overview" ? "bg-green-700 text-white" : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                📊 Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                    activeTab === "orders" ? "bg-green-700 text-white" : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                📦 My Orders
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                    activeTab === "settings" ? "bg-green-700 text-white" : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                ⚙️ Account Settings
                            </button>

                            {user.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                                >
                                    🛠️ Admin Panel
                                </Link>
                            )}

                            <hr className="my-2 border-gray-100" />

                            <Link
                                onClick={handleLogout}
                                to="/login"
                                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
                            >
                                🚪 Logout
                            </Link>
                        </div>
                    </div>

                  
                    <div className="col-span-3">

                        
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white rounded-xl border border-gray-100 p-5">
                                        <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                                        <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-2 inline-block">All time</span>
                                    </div>
                                    <div className="bg-white rounded-xl border border-gray-100 p-5">
                                        <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                                        <p className="text-2xl font-bold text-gray-800">Rs. {totalSpent.toFixed(2)}</p>
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-2 inline-block">Lifetime</span>
                                    </div>
                                    <div className="bg-white rounded-xl border border-gray-100 p-5">
                                        <p className="text-xs text-gray-500 mb-1">Active Orders</p>
                                        <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
                                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mt-2 inline-block">In progress</span>
                                    </div>
                                </div>

                               
                                <div className="bg-white rounded-xl border border-gray-100 p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                                        <button
                                            onClick={() => setActiveTab("orders")}
                                            className="text-sm text-green-700 hover:text-green-800 font-medium"
                                        >
                                            View all →
                                        </button>
                                    </div>

                                    {orders.length === 0 ? (
                                        <div className="text-center py-10">
                                            <p className="text-3xl mb-2">🛒</p>
                                            <p className="text-gray-500 text-sm mb-4">No orders yet</p>
                                            <Link to="/product" className="text-green-700 font-medium text-sm hover:underline">
                                                Start Shopping →
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {orders.slice(0, 3).map((order) => (
                                                <div key={order.orderID} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">{order.orderID}</p>
                                                        <p className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-semibold text-green-700">
                                                            Rs. {getOrderTotal(order.products).toFixed(2)}
                                                        </span>
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                     
                        {activeTab === "orders" && (
                            <div className="bg-white rounded-xl border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">My Orders ({orders.length})</h2>

                                {orders.length === 0 ? (
                                    <div className="text-center py-16">
                                        <p className="text-4xl mb-3">📦</p>
                                        <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                                        <Link to="/product" className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg inline-block text-sm font-medium">
                                            Browse Products
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order.orderID} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{order.orderID}</p>
                                                        <p className="text-xs text-gray-400">{new Date(order.date).toLocaleString()}</p>
                                                    </div>
                                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(order.status)}`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>

                                                <div className="space-y-1 mb-3">
                                                    {order.products.map((p, idx) => (
                                                        <div key={idx} className="flex justify-between text-sm">
                                                            <span className="text-gray-600">{p.name} × {p.quantity}</span>
                                                            <span className="text-gray-800">Rs. {(p.price * p.quantity).toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                                    <span className="text-xs text-gray-400">{order.address}</span>
                                                    <span className="font-bold text-green-700">
                                                        Rs. {getOrderTotal(order.products).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        
                        {activeTab === "settings" && (
                            <div className="bg-white rounded-xl border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-6">Account Settings</h2>

                                <div className="space-y-5 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            disabled={!editing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none focus:border-green-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                                        <input
                                            type="text"
                                            value={user.role === "admin" ? "Administrator" : "Customer"}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500"
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        {editing ? (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        toast.success("Profile updated successfully")
                                                        setEditing(false)
                                                    }}
                                                    className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm font-medium"
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    onClick={() => setEditing(false)}
                                                    className="border border-gray-200 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => setEditing(true)}
                                                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm font-medium"
                                            >
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <hr className="my-8 border-gray-100" />

                                <div>
                                    <h3 className="text-sm font-bold text-red-600 mb-2">Danger Zone</h3>
                                    <p className="text-xs text-gray-500 mb-3">Logging out will end your current session.</p>
                                    <button
                                        onClick={handleLogout}
                                        className="border border-red-200 text-red-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-50"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}