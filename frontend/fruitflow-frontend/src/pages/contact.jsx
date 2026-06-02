import { useState } from "react"
import toast from "react-hot-toast"
import Footer from "../components/footer";
import Header from "../components/header";

export default function Contact(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try { 
            toast.success("Message sent successfully! We'll get back to you soon.")
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        } catch (error) {
            toast.error("Failed to send message")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Header/>

            <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600">We're here to help! Get in touch with us anytime</p>
                </div>
            </section>

           
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        
                       
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition">
                            <div className="text-5xl mb-4">📧</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600 mb-3">Send us an email anytime</p>
                            <a href="mailto:info@fruitflow.com" className="text-green-700 hover:text-green-800 font-medium">
                                info@fruitflow.com
                            </a>
                            <p className="text-gray-500 text-sm mt-3">Response time: 2-4 hours</p>
                        </div>

                       
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition">
                            <div className="text-5xl mb-4">📱</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                            <p className="text-gray-600 mb-3">Call us during business hours</p>
                            <a href="tel:+94123456789" className="text-green-700 hover:text-green-800 font-medium">
                                +94 (123) 456-789
                            </a>
                            <p className="text-gray-500 text-sm mt-3">Mon-Fri: 9AM - 6PM</p>
                        </div>

                        
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition">
                            <div className="text-5xl mb-4">📍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                            <p className="text-gray-600 mb-3">Visit our office</p>
                            <p className="text-green-700 hover:text-green-800 font-medium">
                                123 Fresh Street<br />
                                Negombo, SL 11000
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        
                       
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                                
                            
                                <div className="mb-5">
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                                    />
                                </div>

                             
                                <div className="mb-5">
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                                    />
                                </div>

                              
                                <div className="mb-5">
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+94 123 456 789"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                                    />
                                </div>

                               
                                <div className="mb-5">
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                                    />
                                </div>

                               
                                <div className="mb-6">
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tell us more..."
                                        rows="5"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-700"
                                    ></textarea>
                                </div>

                              
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>

                       
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                            
                            <div className="space-y-4">
                              
                                <div className="bg-white p-6 rounded-lg border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">📦 How long does delivery take?</h3>
                                    <p className="text-gray-600">
                                        Standard delivery takes 24 hours. We guarantee fresh fruits on your doorstep!
                                    </p>
                                </div>

                             
                                <div className="bg-white p-6 rounded-lg border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">🔄 What's your return policy?</h3>
                                    <p className="text-gray-600">
                                        If you're not satisfied, we offer a 100% refund within 7 days of purchase.
                                    </p>
                                </div>

                             
                                <div className="bg-white p-6 rounded-lg border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">💳 What payment methods do you accept?</h3>
                                    <p className="text-gray-600">
                                        We accept credit cards, debit cards, mobile banking, and cash on delivery.
                                    </p>
                                </div>

                              
                                <div className="bg-white p-6 rounded-lg border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">🌱 Are all fruits organic?</h3>
                                    <p className="text-gray-600">
                                        Yes! All our fruits are certified organic and pesticide-free.
                                    </p>
                                </div>

                             
                                <div className="bg-white p-6 rounded-lg border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">🚚 Do you deliver outside Negombo?</h3>
                                    <p className="text-gray-600">
                                        We currently deliver in Negombo and surrounding areas. Check your area in cart!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 bg-green-50 rounded-lg p-12 border border-green-200">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Expected Response Times</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold text-green-700 mb-2">2-4 hrs</p>
                            <p className="text-gray-600">Email Response</p>
                            <p className="text-sm text-gray-500 mt-2">During business hours</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-green-700 mb-2">Instant</p>
                            <p className="text-gray-600">Phone Support</p>
                            <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-6PM</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-green-700 mb-2">1-2 hrs</p>
                            <p className="text-gray-600">Chat Support</p>
                            <p className="text-sm text-gray-500 mt-2">Available 8AM-8PM</p>
                        </div>
                    </div>
                </div>
            </section>

           
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Follow Us</h2>
                    <p className="text-gray-600 mb-8">Stay updated with our latest offers and fruit tips</p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-lg transition text-2xl">
                            📘
                        </a>
                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-lg transition text-2xl">
                            🐦
                        </a>
                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-lg transition text-2xl">
                            📷
                        </a>
                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-lg transition text-2xl">
                            💬
                        </a>
                    </div>
                </div>
            </section>

           
            <section className="h-96 bg-gray-300 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                        <p className="text-gray-600 text-xl mb-4">📍 Our Location</p>
                        <p className="text-gray-500">123 Fresh Street, Negombo, SL 11000</p>
                        <p className="text-gray-400 text-sm mt-2">(Google Map embed here)</p>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}