import Footer from "../components/footer.jsx"
import Header from "../components/header.jsx"

export default function About(){
    return(
        <div>
            <Header />

            <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">About FruitFlow</h1>
                    <p className="text-xl text-gray-600">Bringing fresh, organic fruits from farms to your table</p>
                </div>
            </section>

         
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-gray-600 text-lg mb-4">
                                FruitFlow started with a simple idea: connect local farmers directly with health-conscious consumers. We believe that fresh, organic fruits should be accessible to everyone.
                            </p>
                            <p className="text-gray-600 text-lg mb-4">
                                Founded in 2020, we've grown from a small startup to Sri Lanka's leading organic fruit delivery platform, serving over 50,000 happy customers.
                            </p>
                            <p className="text-gray-600 text-lg">
                                Our mission is to revolutionize the fruit industry by eliminating middlemen, supporting local farmers, and promoting healthy living.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-9xl">🌾</div>
                        </div>
                    </div>
                </div>
            </section>

          
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Mission & Vision</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
                            <p className="text-gray-600">
                                To make fresh, organic fruits accessible to every household in Sri Lanka while supporting local farmers and promoting sustainable agriculture.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                            <div className="text-5xl mb-4">👁️</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
                            <p className="text-gray-600">
                                To become the most trusted fruit delivery platform in South Asia, known for quality, sustainability, and customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

           
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🌱</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality First</h3>
                            <p className="text-gray-600">
                                Every fruit is hand-picked and quality-checked to ensure only the best reaches your table.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl mb-4">🤝</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Fair Trade</h3>
                            <p className="text-gray-600">
                                We ensure farmers get fair prices for their hard work, supporting local communities.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl mb-4">♻️</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
                            <p className="text-gray-600">
                                We're committed to eco-friendly practices and reducing our carbon footprint.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

          
            <section className="bg-green-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-5xl font-bold mb-2">50K+</p>
                            <p className="text-green-100">Happy Customers</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold mb-2">500+</p>
                            <p className="text-green-100">Partner Farmers</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold mb-2">100+</p>
                            <p className="text-green-100">Fruit Varieties</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold mb-2">4.9★</p>
                            <p className="text-green-100">Customer Rating</p>
                        </div>
                    </div>
                </div>
            </section>

          
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden text-center">
                            <div className="h-40 bg-gradient-to-r from-green-400 to-green-500"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Samantha Silva</h3>
                                <p className="text-green-700 font-medium mb-3">Founder & CEO</p>
                                <p className="text-gray-600 text-sm">
                                    Passionate about sustainable agriculture and connecting farmers with consumers.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden text-center">
                            <div className="h-40 bg-gradient-to-r from-green-400 to-green-500"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Rohit Kumar</h3>
                                <p className="text-green-700 font-medium mb-3">Operations Head</p>
                                <p className="text-gray-600 text-sm">
                                    Ensures every delivery is on time and fruits are in perfect condition.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden text-center">
                            <div className="h-40 bg-gradient-to-r from-green-400 to-green-500"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Priya Desai</h3>
                                <p className="text-green-700 font-medium mb-3">Customer Care Lead</p>
                                <p className="text-gray-600 text-sm">
                                    Dedicated to providing exceptional customer service and support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose FruitFlow?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="text-3xl flex-shrink-0">✅</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Organic</h3>
                                <p className="text-gray-600">All fruits are certified organic, pesticide-free, and sustainably grown.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-3xl flex-shrink-0">✅</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
                                <p className="text-gray-600">Fresh fruits delivered to your doorstep within 24 hours.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-3xl flex-shrink-0">✅</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
                                <p className="text-gray-600">Direct from farm to table with no middlemen markup.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-3xl flex-shrink-0">✅</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Fair to Farmers</h3>
                                <p className="text-gray-600">We ensure farmers get fair compensation for their produce.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         
            <section className="py-16 bg-green-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Have questions? We'd love to hear from you. Contact us anytime!
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="mailto:info@fruitflow.com" className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-medium">
                            📧 Email Us
                        </a>
                        <a href="tel:+94123456789" className="border-2 border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 rounded-lg font-medium">
                            📱 Call Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}