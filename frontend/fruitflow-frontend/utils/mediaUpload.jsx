import { useState } from "react"
import { supabase } from "../config/supabase.jsx"
import axios from "axios"
 
export default function AddProductModal({ onClose, onProductAdded }) {

    const [formData, setFormData] = useState({
        productID: "",
        name: "",
        lablePrice: "",
        price: "",
        stock: "",
        isAvalaible: true
    })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

  
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

   
    function handleImageSelect(e) {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
          
            setImagePreview(URL.createObjectURL(file))
        }
    }

    
    async function uploadImage() {
        if (!imageFile) return null

        const fileName = `${Date.now()}_${imageFile.name}`

        const { data, error } = await supabase.storage
            .from("images")        
            .upload(fileName, imageFile)

        if (error) throw error

        
        const { data: urlData } = supabase.storage
            .from("images")
            .getPublicUrl(fileName)

        return urlData.publicUrl  
    }

  
    async function handleSubmit() {
        setLoading(true)
        setError(null)

        try {
           
            const imageUrl = await uploadImage()

         
            await axios.post("http://localhost:3000/products", {
                ...formData,
                lablePrice: Number(formData.lablePrice),
                price: Number(formData.price),
                stock: Number(formData.stock),
                images: imageUrl ? [imageUrl] : []
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            onProductAdded()  
            onClose()         

        } catch (err) {
            setError("Failed to add product")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[480px] max-h-[90vh] overflow-y-auto">

               
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-medium text-gray-800">Add new product</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

              
                <div className="mb-4">
                    <label className="text-sm text-gray-600 mb-1 block">Product image</label>
                    <div
                        className="border-2 border-dashed border-green-200 rounded-lg p-4 text-center cursor-pointer hover:border-green-400 transition-colors"
                        onClick={() => document.getElementById("imageInput").click()}
                    >
                        {imagePreview ? (
                            <img src={imagePreview} className="w-24 h-24 object-cover rounded-lg mx-auto" />
                        ) : (
                            <div>
                                <p className="text-4xl mb-2">🖼️</p>
                                <p className="text-sm text-gray-400">Click to upload image</p>
                            </div>
                        )}
                    </div>
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                    />
                </div>

              
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Product ID</label>
                        <input
                            name="productID"
                            placeholder="PRD001"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Name</label>
                        <input
                            name="name"
                            placeholder="Orange"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm text-gray-600 mb-1 block">Label price</label>
                            <input
                                name="lablePrice"
                                type="number"
                                placeholder="250"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 mb-1 block">Price</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="200"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Stock</label>
                        <input
                            name="stock"
                            type="number"
                            placeholder="50"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                            onChange={handleChange}
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
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add product"}
                    </button>
                </div>
            </div>
        </div>
    )
}