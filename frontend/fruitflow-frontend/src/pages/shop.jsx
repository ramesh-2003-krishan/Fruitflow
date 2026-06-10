import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"

export default function Shop() {
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [selectedShop, setSelectedShop] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3000/shops", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setShops(res.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    const filtered = shops.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase())
    )

    const openMap = (lat, lng) => {
        window.open(`https://maps.google.com/?q=${lat},${lng}`, "_blank")
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-green-700 text-lg">Loading shops...</p>
            </div>
        )
    }

    return (
        <div>
            <Header />

            <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">🏪 Our Shops</h1>
                    <p className="text-xl text-gray-600">Find the nearest FruitFlow shop to you</p>
                </div>
            </section>

            <section className="bg-white border-b border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold text-green-700">{shops.length}</p>
                            <p className="text-gray-600 text-sm mt-1">Total Shops</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-green-700">24hrs</p>
                            <p className="text-gray-600 text-sm mt-1">Open Daily</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-green-700">100+</p>
                            <p className="text-gray-600 text-sm mt-1">Products</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-8">
                <input
                    type="text"
                    placeholder="🔍 Search by shop name or address..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-6 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700 text-gray-700"
                />
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-16">
                <p className="text-gray-500 mb-6">
                    Showing <span className="font-bold text-gray-900">{filtered.length}</span> shops
                </p>

                {filtered.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((shop) => (
                            <div
                                key={shop.shopID}
                                className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition duration-300"
                            >
                                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow">
                                            🏪
                                        </div>
                                        <span className="text-green-100 text-xs font-medium bg-green-800 px-3 py-1 rounded-full">
                                            {shop.shopID}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-bold text-xl mt-4">{shop.name}</h3>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start gap-3">
                                            <span className="text-lg flex-shrink-0">📍</span>
                                            <p className="text-gray-600 text-sm">{shop.address}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">📱</span>
                                            <a  
                                                href={`tel:${shop.phone}`}
                                                className="text-green-700 hover:text-green-800 text-sm font-medium"
                                            >
                                                {shop.phone}
                                            </a>
                                        </div>
                                    </div>

                                    {shop.products?.length > 0 && (
                                        <div className="mb-6">
                                            <p className="text-xs font-medium text-gray-500 mb-2">
                                                Available Products ({shop.products.length})
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {shop.products.slice(0, 4).map((product) => (
                                                    <span
                                                        key={product.productID}
                                                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                                                    >
                                                        {product.name}
                                                    </span>
                                                ))}
                                                {shop.products.length > 4 && (
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                        +{shop.products.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openMap(shop.location.lat, shop.location.lng)}
                                            className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium transition"
                                        >
                                            📍 View on Map
                                        </button>
                                        <button
                                            onClick={() => setSelectedShop(shop)}
                                            className="flex-1 border border-green-700 text-green-700 hover:bg-green-50 py-2 rounded-lg text-sm font-medium transition"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No shops found</p>
                        <p className="text-gray-400 text-sm mt-2">Try a different search</p>
                    </div>
                )}
            </section>

            {selectedShop && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-screen overflow-y-auto">

                        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 relative">
                            <button
                                onClick={() => setSelectedShop(null)}
                                className="absolute top-4 right-4 text-white hover:text-green-200 text-2xl"
                            >
                                ✕
                            </button>
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow mb-4">
                                🏪
                            </div>
                            <h2 className="text-white font-bold text-2xl">{selectedShop.name}</h2>
                            <p className="text-green-100 text-sm">{selectedShop.shopID}</p>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-900 mb-3">Contact Info</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span>📍</span>
                                        <p className="text-gray-600 text-sm">{selectedShop.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span>📱</span>
                                        <a href={`tel:${selectedShop.phone}`} className="text-green-700 text-sm font-medium">
                                            {selectedShop.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {selectedShop.products?.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-bold text-gray-900 mb-3">
                                        All Products ({selectedShop.products.length})
                                    </h3>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {selectedShop.products.map((product) => (
                                            <div
                                                key={product.productID}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                    <p className="text-xs text-gray-500">{product.productID}</p>
                                                </div>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                                    Qty: {product.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => openMap(selectedShop.location.lat, selectedShop.location.lng)}
                                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium transition"
                            >
                                📍 Open in Google Maps
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}