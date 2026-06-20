import axios from "axios"
import { useEffect, useState } from "react"
import { API_BASE_URL } from "../../config/api"
import toast from "react-hot-toast"

export default function AdminReviewPage() {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [ratingFilter, setRatingFilter] = useState("all")
    const [viewingReview, setViewingReview] = useState(null)

    useEffect(() => {
        fetchReviews()
    }, [])

    function fetchReviews() {
        axios.get(`${API_BASE_URL}/reviews`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setReviews(res.data)
            setLoading(false)
        }).catch((err) => {
            setError("Failed to load reviews")
            setLoading(false)
        })
    }

    function handleDeleteReview(reviewID) {
        if (window.confirm("Are you sure you want to delete this review?")) {
            axios.delete(`${API_BASE_URL}/reviews/${reviewID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then(() => {
                toast.success("Review deleted")
                fetchReviews()
            }).catch(() => {
                toast.error("Failed to delete review")
            })
        }
    }

    const filtered = reviews.filter(r => {
        const matchesSearch = 
            r.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            r.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
            r.comment?.toLowerCase().includes(search.toLowerCase())
        
        const matchesRating = ratingFilter === "all" || r.rating === parseInt(ratingFilter)

        return matchesSearch && matchesRating
    })

    const getRatingColor = (rating) => {
        if (rating === 5) return "bg-green-100 text-green-700"
        if (rating === 4) return "bg-emerald-100 text-emerald-700"
        if (rating === 3) return "bg-yellow-100 text-yellow-700"
        if (rating === 2) return "bg-orange-100 text-orange-700"
        return "bg-red-100 text-red-700"
    }

    const getRatingEmoji = (rating) => {
        if (rating === 5) return "⭐⭐⭐⭐⭐"
        if (rating === 4) return "⭐⭐⭐⭐"
        if (rating === 3) return "⭐⭐⭐"
        if (rating === 2) return "⭐⭐"
        return "⭐"
    }

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-green-700">Loading reviews...</p>
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
                    <h1 className="text-2xl font-medium text-gray-800">⭐ Reviews</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage customer reviews and ratings</p>
                </div>
            </div>

           
            <div className="grid grid-cols-5 gap-3 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Total reviews</p>
                    <p className="text-2xl font-medium">{reviews.length}</p>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">All time</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">5 Stars</p>
                    <p className="text-2xl font-medium">{reviews.filter(r => r.rating === 5).length}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Excellent</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">4 Stars</p>
                    <p className="text-2xl font-medium">{reviews.filter(r => r.rating === 4).length}</p>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Good</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">3 Stars</p>
                    <p className="text-2xl font-medium">{reviews.filter(r => r.rating === 3).length}</p>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Average</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Low Ratings</p>
                    <p className="text-2xl font-medium">{reviews.filter(r => r.rating < 3).length}</p>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Critical</span>
                </div>
            </div>

          
            <div className="mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Average Rating</p>
                            <p className="text-3xl font-bold text-gray-800">
                                {(reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0)}
                            </p>
                        </div>
                        <div className="text-5xl">
                            {getRatingEmoji(Math.round(reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0))}
                        </div>
                    </div>
                </div>
            </div>

          
            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by customer name, product, or comment..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                    <option value="all">All Ratings</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                    <option value="2">⭐⭐ 2 Stars</option>
                    <option value="1">⭐ 1 Star</option>
                </select>
            </div>

          
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-green-50">
                        <tr>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Customer</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Product</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Rating</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Comment</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Date</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((review) => (
                            <tr key={review._id} className="border-t border-gray-50 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-xs">
                                            {review.user?.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{review.user?.name || "Unknown"}</p>
                                            <p className="text-xs text-gray-400">{review.user?.email || "N/A"}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="font-medium text-sm text-gray-800">{review.product?.name || "Deleted Product"}</p>
                                    <p className="text-xs text-gray-400">{review.product?.productID || "N/A"}</p>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRatingColor(review.rating)}`}>
                                        {getRatingEmoji(review.rating)}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setViewingReview(review)}
                                            className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg cursor-pointer"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDeleteReview(review._id)}
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
                        <p className="text-gray-500">No reviews found</p>
                    </div>
                )}
            </div>

            
            {viewingReview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">

                      
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-lg font-medium text-gray-800">Review Details</h2>
                            <button 
                                onClick={() => setViewingReview(null)} 
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            
                            <div className="text-center mb-6">
                                <p className="text-5xl mb-2">{getRatingEmoji(viewingReview.rating)}</p>
                                <span className={`inline-block text-sm px-3 py-1.5 rounded-full font-medium ${getRatingColor(viewingReview.rating)}`}>
                                    {viewingReview.rating} out of 5 stars
                                </span>
                            </div>

                           
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500 mb-3">Customer Information</p>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">
                                        {viewingReview.user?.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-gray-800">{viewingReview.user?.name || "Unknown"}</p>
                                        <p className="text-xs text-gray-500">{viewingReview.user?.email || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                          
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500 mb-3">Product Reviewed</p>
                                <p className="font-medium text-sm text-gray-800">{viewingReview.product?.name || "Deleted Product"}</p>
                                <p className="text-xs text-gray-400 mt-1">{viewingReview.product?.productID || "N/A"}</p>
                            </div>

                            
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500 mb-2">Review Comment</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{viewingReview.comment}</p>
                            </div>

                           
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-500 mb-1">Submitted On</p>
                                <p className="text-sm font-medium text-gray-800">
                                    {new Date(viewingReview.createdAt).toLocaleString()}
                                </p>
                            </div>

                            
                            <button
                                onClick={() => {
                                    handleDeleteReview(viewingReview._id)
                                    setViewingReview(null)
                                }}
                                className="w-full bg-red-700 hover:bg-red-800 text-white px-4 py-3 rounded-lg text-sm font-medium transition"
                            >
                                Delete Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}