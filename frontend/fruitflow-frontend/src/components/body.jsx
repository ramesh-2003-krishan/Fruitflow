import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Body() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:3000/products").then((res) => {
            setProducts(res.data.slice(0, 6))
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className="bg-white">
            
           
            <section className="bg-gradient-to-r from-green-50 to-green-100 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-black  font-bold text-gray-900 mb-8 leading-none ">
                                 Fresh Fruits,<br />
                                 <span className="text-5xl md:text-7xl -mt-4">Nearest place,</span><br />
                                 Delivered Daily
                            </h1>
                            <p className="text-xl text-gray-600 mb-6">
                                Experience the freshness of nature with our premium selection of organic fruits. Farm to table in 24 hours.
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    to="/product"
                                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium"
                                >
                                    Shop Now
                                </Link>
                                <Link
                                    to="/about"
                                    className="border-2 border-green-700 text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-medium"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="relative h-96 flex items-center justify-center">
   
                                   <div className="absolute transform -rotate-12 translate-x-32 translate-y-8 shadow-lg">
                                      <img
                                           src="/pictures/market.jpg"
                                           alt="Market"
                                           className="w-48 h-56 object-cover rounded-lg border-4 border-green-200 hover:shadow-2xl hover:scale-110 hover:border-green-200 transition duration-300"
                                          />
                                    </div>

   
                                     <div className="absolute transform rotate-6 -translate-x-12 -translate-y-12 shadow-lg">
                                          <img
                                             src="/pictures/apples.jpg"
                                             alt="Apples"
                                             className="w-48 h-56 object-cover rounded-lg border-4 border-green-200 hover:shadow-2xl hover:scale-110 hover:border-green-200 transition duration-300"
                                          />
                                    </div>

    
                                    <div className="absolute transform -rotate-6 -translate-x-32 translate-y-20 shadow-lg">
                                            <img
                                              src="/pictures/berries.jpg"
                                              alt="Berries"
                                              className="w-48 h-56 object-cover rounded-lg border-4 border-green-200 hover:shadow-2xl hover:scale-110 hover:border-green-200 transition duration-300"
                                           />
                                   </div>

    
                                   <div className="absolute transform rotate-12 translate-x-16 translate-y-32 shadow-lg">
                                           <img
                                              src="/pictures/eat.jpg"
                                              alt="Child"
                                              className="w-48 h-56 object-cover rounded-lg border-4 border-green-200 hover:shadow-2xl hover:scale-110 hover:border-green-200 transition duration-300"
                                            />
                                    </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

          
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Why Choose FruitFlow?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="text-5xl mb-4">🌱</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Organic</h3>
                            <p className="text-gray-600">
                                All fruits are certified organic, pesticide-free, and sustainably grown.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="text-5xl mb-4">🚚</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">
                                Get fresh fruits delivered to your doorstep within 24 hours.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="text-5xl mb-4">💰</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
                            <p className="text-gray-600">
                                Direct from farm to your table with no middlemen markup.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

       
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <Link
                            to="/product"
                            className="text-green-700 hover:text-green-800 font-medium flex items-center gap-2"
                        >
                            View All →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-500">Loading products...</div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product.productID} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100">
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
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm line-through text-gray-400">Rs. {product.lablePrice}</p>
                                                <p className="text-lg font-bold text-green-700">Rs. {product.price}</p>
                                            </div>
                                            {product.stock > 0 ? (
                                                <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                                    Add to Cart
                                                </button>
                                            ) : (
                                                <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

          
            <section className="bg-green-700 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold mb-2">50K+</p>
                            <p className="text-green-100">Happy Customers</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">100+</p>
                            <p className="text-green-100">Fruit Varieties</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">24hrs</p>
                            <p className="text-green-100">Fast Delivery</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">4.9★</p>
                            <p className="text-green-100">Customer Rating</p>
                        </div>
                    </div>
                </div>
            </section>

          
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                About FruitFlow
                            </h2>
                            <p className="text-gray-600 mb-4">
                                FruitFlow is Sri Lanka's leading organic fruit delivery platform. We connect local farmers directly with health-conscious consumers.
                            </p>
                            <p className="text-gray-600 mb-6">
                                Our mission is to make fresh, organic fruits accessible to everyone while supporting local farming communities.
                            </p>
                            <Link
                                to="/about"
                                className="text-green-700 hover:text-green-800 font-medium flex items-center gap-2"
                            >
                                Read Our Story →
                            </Link>
                        </div>
                        <div className="text-center">
                            <div className="text-8xl">🌾</div>
                        </div>
                    </div>
                </div>
            </section>

          
            <section className="py-16 bg-white">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Get Fresh Fruit Deals
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Subscribe to our newsletter for exclusive offers and fresh fruit tips.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                        />
                        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

           
            <section className="bg-green-100 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Ready to get fresh fruits?
                    </h2>
                    <Link
                        to="/signup"
                        className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-medium"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </section>
        </div>
    )
}