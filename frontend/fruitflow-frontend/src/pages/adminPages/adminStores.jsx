import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminStorePage() {

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [viewingStore, setViewingStore] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [editingStore, setEditingStore] = useState(null)

    useEffect(() => {
        fetchStores()
    }, [])

    function fetchStores() {
        axios.get("http://localhost:3000/shops", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setStores(res.data)
            setLoading(false)
        }).catch((err) => {
            setError("Failed to load stores")
            setLoading(false)
        })
    }

    function handleDeleteStore(shopID) {
        if (window.confirm("Are you sure you want to delete this store?")) {
            axios.delete(`http://localhost:3000/shops/${shopID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then(() => {
                toast.success("Store deleted")
                fetchStores()
            }).catch(() => {
                toast.error("Failed to delete store")
            })
        }
    }

    const filtered = stores.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-green-700">Loading stores...</p>
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
                    <h1 className="text-2xl font-medium text-gray-800">🏪 Stores</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage FruitFlow store locations</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                >
                    + Add Store
                </button>
            </div>

          
            <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Total stores</p>
                    <p className="text-2xl font-medium">{stores.length}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Total products</p>
                    <p className="text-2xl font-medium">{stores.reduce((sum, s) => sum + (s.products?.length || 0), 0)}</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Inventory</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Avg products/store</p>
                    <p className="text-2xl font-medium">
                        {stores.length > 0 ? Math.round(stores.reduce((sum, s) => sum + (s.products?.length || 0), 0) / stores.length) : 0}
                    </p>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Per Store</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Locations</p>
                    <p className="text-2xl font-medium">{stores.filter(s => s.location?.lat).length}</p>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Mapped</span>
                </div>
            </div>

            
            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by store name or address..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

          
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-green-50">
                        <tr>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Store</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Address</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Phone</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Products</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Location</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((store) => (
                            <tr key={store.shopID} className="border-t border-gray-50 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-lg">
                                            🏪
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{store.name}</p>
                                            <p className="text-xs text-gray-400">{store.shopID}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {store.address}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <a href={`tel:${store.phone}`} className="text-green-700 hover:text-green-800 font-medium">
                                        {store.phone}
                                    </a>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                        {store.products?.length || 0} items
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {store.location?.lat ? (
                                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                                            ✓ Mapped
                                        </span>
                                    ) : (
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                                            Not set
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setViewingStore(store)}
                                            className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg cursor-pointer"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => setEditingStore(store)}
                                            className="text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 px-3 py-1.5 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteStore(store.shopID)}
                                            className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No stores found</p>
                    </div>
                )}
            </div>

            
            {viewingStore && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">

                        
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-lg font-medium text-gray-800">Store Details</h2>
                            <button
                                onClick={() => setViewingStore(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                          
                            <div className="mb-6 text-center">
                                <div className="text-5xl mb-3">🏪</div>
                                <h3 className="text-xl font-bold text-gray-800">{viewingStore.name}</h3>
                                <p className="text-gray-500 text-sm">{viewingStore.shopID}</p>
                            </div>

                           
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500 mb-3">Contact Information</p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-3">
                                        <span>📍</span>
                                        <p className="text-sm text-gray-700">{viewingStore.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span>📱</span>
                                        <a href={`tel:${viewingStore.phone}`} className="text-green-700 text-sm font-medium">
                                            {viewingStore.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            
                            {viewingStore.products?.length > 0 && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="text-xs text-gray-500 mb-3">Products ({viewingStore.products.length})</p>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {viewingStore.products.map((product, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{product.name}</p>
                                                    <p className="text-xs text-gray-400">{product.productID}</p>
                                                </div>
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                    Qty: {product.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                           
                            {viewingStore.location?.lat && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="text-xs text-gray-500 mb-3">Location</p>
                                    <p className="text-sm text-gray-700 mb-3">
                                        📍 {viewingStore.location.lat.toFixed(4)}, {viewingStore.location.lng.toFixed(4)}
                                    </p>
                                    <button
                                        onClick={() => window.open(`https://maps.google.com/?q=${viewingStore.location.lat},${viewingStore.location.lng}`, "_blank")}
                                        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium"
                                    >
                                        View on Google Maps
                                    </button>
                                </div>
                            )}

                            
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setEditingStore(viewingStore)
                                        setViewingStore(null)
                                    }}
                                    className="flex-1 bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-lg text-sm font-medium"
                                >
                                    Edit Store
                                </button>
                                <button
                                    onClick={() => {
                                        handleDeleteStore(viewingStore.shopID)
                                        setViewingStore(null)
                                    }}
                                    className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg text-sm font-medium"
                                >
                                    Delete Store
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}