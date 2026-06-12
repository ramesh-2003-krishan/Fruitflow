import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminOrderPage() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [viewingOrder, setViewingOrder] = useState(null)

    useEffect(() => {
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
        }).catch((err) => {
            setError("Failed to load orders")
            setLoading(false)
        })
    }

    function handleStatusChange(orderID, newStatus) {
        axios.put(`http://localhost:3000/orders/${orderID}`, {
            status: newStatus
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(() => {
            toast.success("Order status updated")
            fetchOrders()
        }).catch(() => {
            toast.error("Failed to update status")
        })
    }

    const filtered = orders.filter(o => {
        const matchesSearch = 
            o.orderID.toLowerCase().includes(search.toLowerCase()) ||
            o.name.toLowerCase().includes(search.toLowerCase()) ||
            o.email.toLowerCase().includes(search.toLowerCase())
        
        const matchesStatus = statusFilter === "all" || o.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const getStatusStyle = (status) => {
        switch (status) {
            case "pending":
                return "bg-amber-100 text-amber-700"
            case "processing":
                return "bg-blue-100 text-blue-700"
            case "shipped":
                return "bg-purple-100 text-purple-700"
            case "delivered":
                return "bg-green-100 text-green-700"
            case "cancelled":
                return "bg-red-100 text-red-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const getOrderTotal = (products) => {
        return products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
    }

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-green-700">Loading orders...</p>
        </div>
    )

    if (error) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
        </div>
    )

    return (
        <div className="p-6 bg-gray-50 min-h-full">

        
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-medium text-gray-800">📦 Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage customer orders</p>
                </div>
            </div>

          
            <div className="grid grid-cols-5 gap-3 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Total orders</p>
                    <p className="text-2xl font-medium">{orders.length}</p>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">All time</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Pending</p>
                    <p className="text-2xl font-medium">{orders.filter(o => o.status === "pending").length}</p>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Action needed</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Processing</p>
                    <p className="text-2xl font-medium">{orders.filter(o => o.status === "processing").length}</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">In progress</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Delivered</p>
                    <p className="text-2xl font-medium">{orders.filter(o => o.status === "delivered").length}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Completed</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Cancelled</p>
                    <p className="text-2xl font-medium">{orders.filter(o => o.status === "cancelled").length}</p>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Refunded</span>
                </div>
            </div>

           
            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by order ID, name, or email..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

           
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-green-50">
                        <tr>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Order ID</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Customer</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Items</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Total</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Date</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Status</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((order) => (
                            <tr key={order.orderID} className="border-t border-gray-50 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <p className="font-medium text-sm text-gray-800">{order.orderID}</p>
                                </td>
                                <td className="px-4 py-3">
                                    <div>
                                        <p className="font-medium text-sm">{order.name}</p>
                                        <p className="text-xs text-gray-400">{order.email}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {order.products.length} item{order.products.length !== 1 ? "s" : ""}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-green-700">
                                    Rs. {getOrderTotal(order.products)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.orderID, e.target.value)}
                                        className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${getStatusStyle(order.status)}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => setViewingOrder(order)}
                                        className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg cursor-pointer"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No orders found</p>
                    </div>
                )}
            </div>

           
            {viewingOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">

                        
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-medium text-gray-800">Order {viewingOrder.orderID}</h2>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(viewingOrder.date).toLocaleString()}
                                </p>
                            </div>
                            <button 
                                onClick={() => setViewingOrder(null)} 
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            
                            <div className="mb-6">
                                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusStyle(viewingOrder.status)}`}>
                                    {viewingOrder.status.charAt(0).toUpperCase() + viewingOrder.status.slice(1)}
                                </span>
                            </div>

                            
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500 mb-2">Customer Information</p>
                                <p className="font-medium text-sm text-gray-800">{viewingOrder.name}</p>
                                <p className="text-sm text-gray-600 mt-1">📧 {viewingOrder.email}</p>
                                <p className="text-sm text-gray-600 mt-1">📱 {viewingOrder.phone}</p>
                                <p className="text-sm text-gray-600 mt-1">📍 {viewingOrder.address}</p>
                            </div>

                           
                            <div className="mb-6">
                                <p className="text-xs text-gray-500 mb-3">Order Items</p>
                                <div className="space-y-2">
                                    {viewingOrder.products.map((product, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{product.name}</p>
                                                <p className="text-xs text-gray-400">Qty: {product.quantity}</p>
                                            </div>
                                            <p className="text-sm font-medium text-green-700">
                                                Rs. {product.price * product.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                          
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <p className="text-sm font-medium text-gray-800">Total Amount</p>
                                <p className="text-xl font-bold text-green-700">
                                    Rs. {getOrderTotal(viewingOrder.products)}
                                </p>
                            </div>

                           
                            <div className="mt-6">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Update Status</label>
                                <select
                                    value={viewingOrder.status}
                                    onChange={(e) => {
                                        handleStatusChange(viewingOrder.orderID, e.target.value)
                                        setViewingOrder({ ...viewingOrder, status: e.target.value })
                                    }}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}