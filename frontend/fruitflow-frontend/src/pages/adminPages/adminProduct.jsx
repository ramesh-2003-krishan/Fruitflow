import axios from "axios"
import { useEffect, useState } from "react"

export default function AdminProductPage() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/products", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setProducts(res.data)
            setLoading(false)
        }).catch((err) => {
            setError("Failed to load products")
            setLoading(false)
        })
    }, [])

    // Filter products by search
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    // Stock status helper
    const getStockStatus = (stock) => {
        if (stock === 0) return { label: "Out of stock", style: "bg-red-100 text-red-700" }
        if (stock < 10) return { label: "Low stock", style: "bg-amber-100 text-amber-700" }
        return { label: "Available", style: "bg-green-100 text-green-800" }
    }

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-green-700">Loading products...</p>
        </div>
    )

    if (error) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
        </div>
    )

    return (
        <div className="p-6 bg-gray-50 min-h-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-medium text-gray-800">🌿 Products</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your fruit inventory</p>
                </div>
                <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-green-50 px-4 py-2 rounded-lg text-sm font-medium">
                    + Add product
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Total products</p>
                    <p className="text-2xl font-medium">{products.length}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Low stock</p>
                    <p className="text-2xl font-medium">{products.filter(p => p.stock > 0 && p.stock < 10).length}</p>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Attention</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Out of stock</p>
                    <p className="text-2xl font-medium">{products.filter(p => p.stock === 0).length}</p>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Urgent</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Available</p>
                    <p className="text-2xl font-medium">{products.filter(p => p.isAvalaible).length}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Stable</span>
                </div>
            </div>

            {/* Search */}
            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-green-50">
                        <tr>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Product</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Label price</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Price</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Stock</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Status</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((product) => {
                            const status = getStockStatus(product.stock)
                            return (
                                <tr key={product.productID} className="border-t border-gray-50 hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.images[0]}
                                                className="w-9 h-9 rounded-lg object-cover bg-green-50"
                                            />
                                            <div>
                                                <p className="font-medium text-sm">{product.name}</p>
                                                <p className="text-xs text-gray-400">{product.productID}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm line-through text-gray-400">Rs. {product.lablePrice}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-green-700">Rs. {product.price}</td>
                                    <td className="px-4 py-3 text-sm">{product.stock}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.style}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg">
                                                Edit
                                            </button>
                                            <button className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}