import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import ProductCard from "../components/productCard";
import Home from "./home";
import axios from "axios";

export default function Product(){
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [priceRange, setPriceRange] = useState(500)
    const [availability, setAvailability] = useState("all")
    const [sortBy, setSortBy] = useState("latest")

    useEffect(() => {
        axios.get("http://localhost:3000/products", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setProducts(res.data)
            setFiltered(res.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        let result = products

        
        if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            )
        }

       
        result = result.filter(p => p.price <= priceRange)

        
        if (availability === "available") {
            result = result.filter(p => p.stock > 0)
        } else if (availability === "outofstock") {
            result = result.filter(p => p.stock === 0)
        }

        
        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price)
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price)
        } else if (sortBy === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name))
        }

        setFiltered(result)
    }, [search, priceRange, availability, sortBy, products])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-green-700 text-lg">Loading products...</p>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="bg-gradient-to-r from-green-50 to-green-100 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-900">🍎 Our Products</h1>
                    <p className="text-gray-600 mt-2">Fresh, organic fruits delivered to your doorstep</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-4 gap-8">
                    
                    
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

                           
                            <div className="mb-6">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                                <input
                                    type="text"
                                    placeholder="Search fruits..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                                />
                            </div>

                            
                            <div className="mb-6">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Price: Rs. {priceRange}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Rs. 0</span>
                                    <span>Rs. 500</span>
                                </div>
                            </div>

                           
                            <div className="mb-6">
                                <label className="text-sm font-medium text-gray-700 mb-3 block">Availability</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="availability"
                                            value="all"
                                            checked={availability === "all"}
                                            onChange={(e) => setAvailability(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-700">All Products</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="availability"
                                            value="available"
                                            checked={availability === "available"}
                                            onChange={(e) => setAvailability(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-700">In Stock</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="availability"
                                            value="outofstock"
                                            checked={availability === "outofstock"}
                                            onChange={(e) => setAvailability(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-700">Out of Stock</span>
                                    </label>
                                </div>
                            </div>

                            
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                                >
                                    <option value="latest">Latest</option>
                                    <option value="name">Name (A-Z)</option>
                                    <option value="price-low">Price (Low to High)</option>
                                    <option value="price-high">Price (High to Low)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    
                    <div className="md:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                Showing <span className="font-bold text-gray-900">{filtered.length}</span> products
                            </p>
                        </div>

                        {filtered.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((product) => (
                                    
                            <Link 
                            key={product.productID}
                            to={`/product/${product.productID}`} 
                            >
                                    <div key={product.productID} className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition">
                                        <div className="h-48 bg-gray-100 overflow-hidden">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover hover:scale-105 transition"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                            <p className="text-xs text-gray-500 mb-3">{product.productID}</p>
                                            
                                            <div className="mb-3">
                                                <p className="text-sm line-through text-gray-400">Rs. {product.lablePrice}</p>
                                                <p className="text-lg font-bold text-green-700">Rs. {product.price}</p>
                                            </div>

                                            <div className="mb-3">
                                                {product.stock > 0 ? (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                                        {product.stock} in stock
                                                    </span>
                                                ) : (
                                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                                        Out of stock
                                                    </span>
                                                )}
                                            </div>

                                            <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
                                                disabled={product.stock === 0}
                                            >
                                                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                                            </button>
                                        </div>
                                    </div>
                                   </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No products found</p>
                                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}