import { Link, Route, Routes } from "react-router-dom";

import AdminProductPage from "./adminPages/adminProduct.jsx";
import AdminOrderPage from "./adminPages/adminOrder.jsx";

export default function Admin(){
    return(
        <div className="h-screen w-screen flex">
            <div className="h-full w-[220px] flex flex-col" style={{background:"#173404"}}>

                <div className="px-4 py-5 border-b border-[#27500A]">
                   <p className="text-[#C0DD97] font-medium text-base">🌿 FruitFlow</p>
                   <p className="text-[#639922] text-xs mt-0.5"></p>
                </div>

                <nav className="flex flex-col gap-1 p-2 flex-1">
                   <Link to="/admin/Products" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#97C459] hover:bg-[#27500A] hover:text-[#C0DD97] transition-colors"> <span>🍎</span>Products</Link>
                   <Link to="/admin/Orders" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#97C459] hover:bg-[#27500A] hover:text-[#C0DD97] transition-colors"><span>🛒</span>Orders</Link>
                   <Link to="/admin/Users" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#97C459] hover:bg-[#27500A] hover:text-[#C0DD97] transition-colors"><span>👤</span>Users</Link>
                   <Link to="/admin/Reviews" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#97C459] hover:bg-[#27500A] hover:text-[#C0DD97] transition-colors"> <span>⭐</span>Reviews</Link>
                     <Link to="/admin/Stores" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#97C459] hover:bg-[#27500A] hover:text-[#C0DD97] transition-colors"> <span>🏪</span>Stores</Link>
                </nav>
                <div className="p-2 border-t border-[#27500A]">
                    <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#97C459] hover:bg-[#27500A] hover:text-[#C0DD97] w-full transition-colors">
                        🚪 Logout
                    </button>
                </div>
                
            </div>
            <div className="flex-1 overflow-y-auto">
                <Routes path='/*'>
                    <Route path='/Products' element={<AdminProductPage/>}/>
                    <Route path='/Orders' element={<AdminOrderPage/>}/>
                    <Route path='/Users' element={<h1 className="p-6">Users</h1>}/>
                    <Route path='/Reviews' element={<h1 className="p-6">Reviews</h1>}/>
                    <Route path="/Stores" element={<h1 className="p-6">Stores</h1>}/>

                </Routes>

            </div>
        </div>
    )
}