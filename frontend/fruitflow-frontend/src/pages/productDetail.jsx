import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../components/header"
import Footer from "../components/footer"

export default function ProductDetail() {
    const { productID } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [nearbyShops, setNearbyShops] = useState([])
    const [shopsLoading, setShopsLoading] = useState(true)
    const [locationError, setLocationError] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${productID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setProduct(res.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [productID])

    useEffect(() => {
        findNearbyShops()
    }, [productID])

    function calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371
        const dLat = toRad(lat2 - lat1)
        const dLng = toRad(lng2 - lng1)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    function toRad(value) {
        return (value * Math.PI) / 180
    }

    function findNearbyShops() {
        setShopsLoading(true)

        if (!navigator.geolocation) {
            setLocationError("Geolocation not supported by your browser")
            loadShopsWithoutLocation()
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude
                const userLng = position.coords.longitude
                loadShopsWithLocation(userLat, userLng)
            },
            () => {
                setLocationError("Location access denied. Enable it to see nearest shops.")
                loadShopsWithoutLocation()
            }
        )
    }

    function loadShopsWithLocation(userLat, userLng) {
        axios.get("http://localhost:3000/shops", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            const shopsWithProduct = res.data
                .filter(shop =>
                    shop.products?.some(p => p.productID === productID && p.quantity > 0)
                )
                .map(shop => {
                    const distance = shop.location?.lat && shop.location?.lng
                        ? calculateDistance(userLat, userLng, shop.location.lat, shop.location.lng)
                        : null
                    const stockItem = shop.products.find(p => p.productID === productID)
                    return {
                        ...shop,
                        distance,
                        stockQuantity: stockItem?.quantity || 0
                    }
                })
                .sort((a, b) => {
                    if (a.distance == null) return 1
                    if (b.distance == null) return -1
                    return a.distance - b.distance
                })

            setNearbyShops(shopsWithProduct)
            setShopsLoading(false)
        }).catch(() => {
            setShopsLoading(false)
        })
    }

    function loadShopsWithoutLocation() {
        axios.get("http://localhost:3000/shops", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            const shopsWithProduct = res.data
                .filter(shop =>
                   shop.products?.some(p => p.productID === productID)
                )
                .map(shop => {
                    const stockItem = shop.products.find(p => p.productID === productID)
                    return {
                        ...shop,
                        distance: null,
                        stockQuantity: stockItem?.quantity || 0
                    }
                })

            setNearbyShops(shopsWithProduct)
            setShopsLoading(false)
        }).catch(() => {
            setShopsLoading(false)
        })
    }

    function openMap(lat, lng) {
        window.open(`https://maps.google.com/?q=${lat},${lng}`, "_blank")
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-green-700 text-lg">Loading...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-600 text-lg">Product not found</p>
            </div>
        )
    }

    return (
        <div>
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <button
                    onClick={() => window.history.back()}
                    className="text-green-700 hover:text-green-800 font-medium mb-8 flex items-center gap-2 cursor-pointer"
                >
                    ← Back to Products
                </button>

                <div className="grid md:grid-cols-2 gap-12">

                    <div>
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <p className="text-gray-500 text-sm mb-6">{product.productID}</p>

                        <div className="mb-6">
                            <p className="text-gray-400 line-through text-lg">Rs. {product.lablePrice}</p>
                            <p className="text-4xl font-bold text-green-700">Rs. {product.price}</p>
                        </div>

                        <div className="mb-6">
                            {product.stock > 0 ? (
                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
                                    ✓ {product.stock} in stock
                                </span>
                            ) : (
                                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium">
                                    ✗ Out of stock
                                </span>
                            )}
                        </div>

                        <button
                            disabled={product.stock === 0}
                            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
                        >
                            🛒 Add to Cart
                        </button>
                    </div>
                </div>

               
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">🏪 Available Nearby</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Shops carrying this product, sorted by distance
                    </p>

                    {locationError && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
                            <p className="text-sm text-amber-700">📍 {locationError}</p>
                        </div>
                    )}

                    {shopsLoading ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-sm">Finding nearby shops...</p>
                        </div>
                    ) : nearbyShops.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-3xl mb-2">😕</p>
                            <p className="text-gray-500 text-sm">No shops currently have this product in stock</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {nearbyShops.map((shop, index) => (
                                <div
                                    key={shop.shopID}
                                    className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition relative"
                                >
                                    {index === 0 && shop.distance != null && (
                                        <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                            🏆 Nearest
                                        </span>
                                    )}

                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg">
                                                🏪
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{shop.name}</p>
                                                <p className="text-xs text-gray-400">{shop.shopID}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 mb-3">📍 {shop.address}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium border border-green-100">
                                            {shop.stockQuantity} in stock
                                        </span>
                                        {shop.distance != null && (
                                            <span className="text-xs font-bold text-gray-700">
                                                {shop.distance < 1
                                                    ? `${Math.round(shop.distance * 1000)} m away`
                                                    : `${shop.distance.toFixed(1)} km away`}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openMap(shop.location.lat, shop.location.lng)}
                                            className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-xs font-medium transition"
                                        >
                                            📍 Directions
                                        </button>
                                        <a
                                            href={`tel:${shop.phone}`}
                                            className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition text-center"
                                        >
                                            📱 Call
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}