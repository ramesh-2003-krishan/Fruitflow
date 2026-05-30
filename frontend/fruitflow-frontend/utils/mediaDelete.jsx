import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"



export default function DeleteProductModal({product, onClose, onProductDeleted}){

const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

async function handleDelete(){
    const token = localStorage.getItem("token")

    if(token == null){
        toast.error("please login first")
        return
    }

    setLoading(true)
    setError(null)

    try{

        await axios.delete(
             `http://localhost:3000/products/${product.productID}`, 
             {
                headers : {
                    Authorization : `Bearer ${token}`
                }
             }
        )

        toast.success("product deleted!")
        onProductDeleted()
        onClose()

    }catch(err){
       const errorMsg = err.response?.data?.message || "Error deleting product"
        setError(errorMsg)
        toast.error(errorMsg)
    } finally {
        setLoading(false)
    }
}



 return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[420px]">

                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-800">Delete product</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                </div>

               
                <div className="flex gap-3 mb-6 p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="text-2xl flex-shrink-0">⚠️</div>
                    <div>
                        <p className="font-medium text-red-900 text-sm">Are you sure?</p>
                        <p className="text-red-700 text-xs mt-1">This action cannot be undone</p>
                    </div>
                </div>

                
                <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Product to delete:</p>
                    <div className="flex items-center gap-3">
                        <img
                            src={product?.images[0]}
                            className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                            <p className="font-medium text-sm text-gray-800">{product?.name}</p>
                            <p className="text-xs text-gray-400">{product?.productID}</p>
                        </div>
                    </div>
                </div>

               
                <div className="mb-6 text-sm text-gray-600">
                    <p className="mb-2">
                        <span className="font-medium">Price:</span> Rs. {product?.price}
                    </p>
                    <p>
                        <span className="font-medium">Stock:</span> {product?.stock} units
                    </p>
                </div>

                
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

               
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete product"}
                    </button>
                </div>
            </div>
        </div>
    )
}