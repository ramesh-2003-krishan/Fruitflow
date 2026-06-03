import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../components/header"
import Footer from "../components/footer"

export default function ProductDetail() {
    const { productID } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

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
            </div>

            <Footer />
        </div>
    )
}