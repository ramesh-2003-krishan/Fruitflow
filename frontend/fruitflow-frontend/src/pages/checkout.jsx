import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"
import { getCart, getCartTotal, clearCart } from "../utils/cart.js"
import axios from "axios"
import toast from "react-hot-toast"
import { generateReceipt } from "../utils/receipt.js"
import Home from "./home.jsx"

export default function Checkout() {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [totals, setTotals] = useState({ subtotal: 0, savings: 0, total: 0 })
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery")
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [placedOrderID, setPlacedOrderID] = useState(null)
    const [slipFile, setSlipFile] = useState(null)
    const [uploadingSlip, setUploadingSlip] = useState(false)
    const [showOnlinePayment, setShowOnlinePayment] = useState(false)
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: ""
    })

    useEffect(() => {
        const items = getCart()
        if (items.length === 0) {
            navigate("/cartt")
            return
        }
        setCartItems(items)
        setTotals(getCartTotal())

        
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]))
                setForm(prev => ({
                    ...prev,
                    name: decoded.userName || "",
                    email: decoded.email || ""
                }))
            } catch (e) {}
        }
    }, [])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

   async function handlePlaceOrder() {
    if (!form.name || !form.email || !form.phone || !form.address) {
        toast.error("Please fill in all fields")
        return
    }
    setLoading(true)

    try {
       
        const orderRes = await axios.post(
            "http://localhost:3000/orders",
            {
                name: form.name,
                email: form.email,
                phone: form.phone,
                address: form.address,
                products: cartItems.map(item => ({
                    productID: item.productID,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )

        const orderID = orderRes.data.order?.orderID || orderRes.data.orderID

        if (paymentMethod === "cashOnDelivery") {
            
            await axios.post(
                "http://localhost:3000/payments",
                {
                    order: orderID,
                    amount: totals.total,
                    method: paymentMethod
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            clearCart()
            toast.success("Order placed successfully! 🎉")
            navigate("/home")

        } else if (paymentMethod === "bank_transfer") {
            
            setPlacedOrderID(orderID)
            setOrderPlaced(true)   
            clearCart()
            toast.success("Order created! Please upload your payment slip.")
        }else if (paymentMethod === "online") {
            
            setPlacedOrderID(orderID)
            setShowOnlinePayment(true)
        }

    } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.message || "Failed to place order")
    } finally {
        setLoading(false)
    }

}

async function handleSlipUpload() {
    if (!slipFile) {
        toast.error("Please select your payment slip")
        return
    }

    setUploadingSlip(true)

    try {
       
        await axios.post(
            "http://localhost:3000/payments",
            {
                order: placedOrderID,
                amount: totals.total,
                method: "bank_transfer"
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )

        toast.success("Payment slip submitted! We'll verify and confirm your order within 24 hours. ✅")
        navigate("/home")

    } catch (error) {
        toast.error("Failed to submit slip")
    } finally {
        setUploadingSlip(false)
    }
}

async function handleOnlinePayment() {
    if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiry || !cardDetails.cvv) {
        toast.error("Please fill in all card details")
        return
    }

    if (cardDetails.cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Invalid card number")
        return
    }

    if (cardDetails.cvv.length < 3) {
        toast.error("Invalid CVV")
        return
    }

    setUploadingSlip(true)

    try {
        await axios.post(
            "http://localhost:3000/payments",
            {
                order: placedOrderID,
                amount: totals.total,
                method: "online"
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )

        generateReceipt({
            orderID: placedOrderID,
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            products: cartItems,
            paymentMethod: "bank_transfer",
            totals,
            date: new Date().toLocaleString()
        })


        clearCart()
        toast.success("Payment successful! Order placed! 🎉")
        navigate("/home")

    } catch (error) {
        toast.error("Payment failed. Please try again.")
    } finally {
        setUploadingSlip(false)
    }
}

function formatCardNumber(value) {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
}

function formatExpiry(value) {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
        return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
}




    return (
        <div>
            <Header />

            <section className="bg-gradient-to-r from-green-50 to-green-100 py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-900">🧾 Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your order</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-3 gap-8">

                    
                    <div className="col-span-2 space-y-6">

                        
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">📍 Delivery Information</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+94 77 123 4567"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="123 Main Street, Colombo 01"
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">💳 Payment Method</h2>
                            <div className="space-y-3">
                                {[
                                    { value: "cashOnDelivery", label: "Cash on Delivery", icon: "💵", desc: "Pay when your order arrives" },
                                    { value: "bank_transfer", label: "Bank Transfer", icon: "🏦", desc: "Transfer to our bank account" },
                                    { value: "online", label: "Online Payment", icon: "💳", desc: "Pay securely online" }
                                ].map((method) => (
                                    <div
                                        key={method.value}
                                        onClick={() => setPaymentMethod(method.value)}
                                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${
                                            paymentMethod === method.value
                                                ? "border-green-700 bg-green-50"
                                                : "border-gray-100 hover:border-gray-200"
                                        }`}
                                    >
                                        <span className="text-2xl">{method.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-gray-800">{method.label}</p>
                                            <p className="text-xs text-gray-500">{method.desc}</p>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === method.value ? "border-green-700" : "border-gray-300"
                                        }`}>
                                            {paymentMethod === method.value && (
                                                <div className="w-2 h-2 rounded-full bg-green-700" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                                {paymentMethod === "bank_transfer" && (
                                      <div className="mt-4 p-5 bg-blue-50 rounded-lg border border-blue-100">
                                         <p className="text-sm font-bold text-blue-800 mb-4">🏦 Bank Transfer Details</p>
                                         <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                            <span className="text-sm text-gray-500">Bank</span>
                                            <span className="text-sm font-medium text-gray-800">Commercial Bank</span>
                                         </div>
                                       <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                         <span className="text-sm text-gray-500">Account Name</span>
                                         <span className="text-sm font-medium text-gray-800">FruitFlow Pvt Ltd</span>
                                        </div>
                                       <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                         <span className="text-sm text-gray-500">Account No</span>
                                         <span className="text-sm font-medium text-gray-800">8012345678</span>
                                       </div>
                                       <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                          <span className="text-sm text-gray-500">Branch</span>
                                          <span className="text-sm font-medium text-gray-800">Colombo 03</span>
                                       </div>
                                       <div className="flex justify-between items-center py-2">
                                          <span className="text-sm text-gray-500">Amount to Pay</span>
                                          <span className="text-sm font-bold text-green-700">Rs. {totals.total.toFixed(2)}</span>
                                        </div>
                                     </div>
                                     <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                         <p className="text-xs text-amber-700 font-medium">⚠️ Important:</p>
                                         <p className="text-xs text-amber-600 mt-1">
                                                 Please use your Order ID as the payment reference when transferring.
                                                 Your order will be confirmed within 24 hours after payment verification.
                                           </p>
                                        </div>
                                    </div>
                                )}
                        </div>

                        
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">🛒 Order Items</h2>
                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <div key={item.productID} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-green-700 text-sm">
                                            Rs. {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                   
                    <div className="h-fit sticky top-20 space-y-4">
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-3 pb-4 border-b border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">Rs. {totals.subtotal.toFixed(2)}</span>
                                </div>
                                {totals.savings > 0 && (
                                    <div className="flex justify-between text-sm text-green-700">
                                        <span>Savings</span>
                                        <span className="font-medium">-Rs. {totals.savings.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className="text-green-700 font-medium">Free</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 mb-6">
                                <span className="font-bold text-gray-800">Total</span>
                                <span className="text-2xl font-bold text-green-700">Rs. {totals.total.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}

                                className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold transition"
                            >
                                {loading ? "Placing Order..." : "✅ Place Order"}
                            </button>

                            <button
                                onClick={() => navigate("/cartt")}
                                className="w-full mt-3 border border-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-50 text-sm"
                            >
                                ← Back to Cart
                            </button>
                        </div>

                        <div className="bg-green-50 rounded-xl border border-green-100 p-4">
                            <p className="text-xs text-green-700 font-medium mb-2">🔒 Secure Checkout</p>
                            <p className="text-xs text-gray-600">Your information is safe and encrypted. We never store payment details.</p>
                        </div>
                    </div>
                </div>
            </div>
           
      {orderPlaced && paymentMethod === "bank_transfer" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-xl max-w-md w-full p-6">

          
            <div className="text-center mb-6">
                <p className="text-4xl mb-2">🏦</p>
                <h2 className="text-xl font-bold text-gray-800">Upload Payment Slip</h2>
                <p className="text-sm text-gray-500 mt-1">Order ID: <span className="font-bold text-green-700">{placedOrderID}</span></p>
            </div>

           
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6">
                <p className="text-xs font-bold text-blue-800 mb-2">Transfer to:</p>
                <div className="space-y-1 text-xs text-gray-700">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Bank</span>
                        <span className="font-medium">Commercial Bank</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Account Name</span>
                        <span className="font-medium">FruitFlow Pvt Ltd</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Account No</span>
                        <span className="font-medium">8012345678</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-bold text-green-700">Rs. {totals.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Reference</span>
                        <span className="font-bold text-green-700">{placedOrderID}</span>
                    </div>
                </div>
            </div>

           
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Payment Slip
                </label>
                <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-green-700 transition"
                    onClick={() => document.getElementById("slipInput").click()}
                >
                    {slipFile ? (
                        <div>
                            <p className="text-2xl mb-1">✅</p>
                            <p className="text-sm font-medium text-green-700">{slipFile.name}</p>
                            <p className="text-xs text-gray-500 mt-1">Click to change</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-3xl mb-2">📎</p>
                            <p className="text-sm text-gray-500">Click to upload slip</p>
                            <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF</p>
                        </div>
                    )}
                </div>
                <input
                    id="slipInput"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => setSlipFile(e.target.files[0])}
                />
            </div>

           
            <button
                onClick={handleSlipUpload}
                disabled={uploadingSlip || !slipFile}
                className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold mb-3"
            >
                {uploadingSlip ? "Submitting..." : "✅ Submit Payment Slip"}
            </button>

            <button
                onClick={() => navigate("/")}
                className="w-full border border-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-50 text-sm"
            >
                I'll do this later
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
                Your order is saved. You can submit the slip anytime.
            </p>
        </div>
    </div>
)}

{showOnlinePayment && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">

          
            <div className="text-center mb-6">
                <p className="text-4xl mb-2">💳</p>
                <h2 className="text-xl font-bold text-gray-800">Online Payment</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Order ID: <span className="font-bold text-green-700">{placedOrderID}</span>
                </p>
            </div>

           
            <div className="p-4 bg-green-50 rounded-lg border border-green-100 mb-6 text-center">
                <p className="text-xs text-gray-500 mb-1">Amount to Pay</p>
                <p className="text-3xl font-bold text-green-700">Rs. {totals.total.toFixed(2)}</p>
            </div>

          
            <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-xl p-5 mb-6 text-white">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-xs opacity-70">FruitFlow Pay</p>
                    <p className="text-lg font-bold">💳</p>
                </div>
                <p className="text-lg font-mono tracking-widest mb-4">
                    {cardDetails.cardNumber || "•••• •••• •••• ••••"}
                </p>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs opacity-70 mb-1">Card Holder</p>
                        <p className="text-sm font-medium uppercase">
                            {cardDetails.cardName || "YOUR NAME"}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs opacity-70 mb-1">Expires</p>
                        <p className="text-sm font-medium">
                            {cardDetails.expiry || "MM/YY"}
                        </p>
                    </div>
                </div>
            </div>

           
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                        type="text"
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({
                            ...cardDetails,
                            cardNumber: formatCardNumber(e.target.value)
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700 font-mono"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.cardName}
                        onChange={(e) => setCardDetails({
                            ...cardDetails,
                            cardName: e.target.value.toUpperCase()
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700 uppercase"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({
                                ...cardDetails,
                                expiry: formatExpiry(e.target.value)
                            })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700 font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({
                                ...cardDetails,
                                cvv: e.target.value.replace(/[^0-9]/g, "")
                            })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-700 font-mono"
                        />
                    </div>
                </div>
            </div>

           
            <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-xs text-gray-400 flex items-center gap-1">🔒 SSL Secured</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">✅ Safe Payment</span>
            </div>

           
            <button
                onClick={handleOnlinePayment}
                disabled={uploadingSlip}
                className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold mb-3 transition"
            >
                {uploadingSlip ? "Processing..." : `💳 Pay Rs. ${totals.total.toFixed(2)}`}
            </button>

            <button
                onClick={() => setShowOnlinePayment(false)}
                className="w-full border border-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-50 text-sm"
            >
                ← Cancel Payment
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
                🔒 Your card details are encrypted and secure
            </p>
        </div>
    </div>
)}

            <Footer />
        </div>
    )
}