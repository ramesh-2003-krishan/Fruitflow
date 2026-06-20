import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { API_BASE_URL } from "../src/config/api"

export default function EditProductModal({ product, onClose, onProductUpdated }) {

    const [formData, setFormData] = useState({
        name: "",
        lablePrice: "",
        price: "",
        stock: "",
        isAvalaible: true
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                lablePrice: product.lablePrice || "",
                price: product.price || "",
                stock: product.stock || "",
                isAvalaible: product.isAvalaible || true
            })
        }
    }, [product]) 

   
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    
    async function editProduct() {
        const token = localStorage.getItem("token")
        
        if (token == null) {
            toast.error("please login first")
            return
        }

        if (!formData.name || !formData.price) {
            toast.error("please fill all fields")
            return
        }

        setLoading(true)

        try {
            await axios.put(
                `${API_BASE_URL}/products/${product.productID}`, 
                {
                    name: formData.name,
                    lablePrice: Number(formData.lablePrice),
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    isAvalaible: formData.isAvalaible
                },
                {
                    headers: {  
                        "Authorization": `Bearer ${token}` 
                    }
                }
            )

            toast.success("Product updated successfully")
            onProductUpdated()  
            onClose()          

        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating product")
        } finally {
            setLoading(false)
        }
    }

   
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[480px] max-h-[90vh] overflow-y-auto">

              
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-medium text-gray-800">Edit product</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                </div>

               
                <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-xs text-gray-500">Product ID</p>
                    <p className="text-sm font-medium text-gray-800">{product?.productID}</p>
                </div>

               
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                            placeholder="Product name"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm text-gray-600 mb-1 block">Label price</label>
                            <input
                                name="lablePrice"
                                type="number"
                                value={formData.lablePrice}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                placeholder="250"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 mb-1 block">Price</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                placeholder="200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Stock</label>
                        <input
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                            placeholder="50"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isAvalaible"
                            checked={formData.isAvalaible}
                            onChange={(e) => setFormData({ ...formData, isAvalaible: e.target.checked })}
                        />
                        <label htmlFor="isAvalaible" className="text-sm text-gray-600">Available</label>
                    </div>
                </div>

               
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

               
                <div className="flex gap-3 mt-5">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={editProduct}
                        disabled={loading}
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update product"}
                    </button>
                </div>
            </div>
        </div>
    )
}