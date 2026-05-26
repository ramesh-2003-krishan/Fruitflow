import { Link, Route, Routes } from "react-router-dom";

export default function Admin(){
    return(
        <div className="h-screen w-screen flex">
            <div className="h-full w-75 bg-yellow-500 flex flex-col">
                <Link to="/Admin/Products">Products</Link>
                <Link to="/Admin/Orders">Orders</Link>
                <Link to="/Admin/Users">Users</Link>
                <Link to="/Admin/Reviews">Reviews</Link>
            </div>
            <div className="h-full w-[calc(100%-300px)] bg-green-500">
                <Routes path='/*'>
                    <Route path='/Products' element={<h1>Products</h1>}/>
                    <Route path='/Orders' element={<h1>Orders</h1>}/>
                    <Route path='/Users' element={<h1>Users</h1>}/>
                    <Route path='/Reviews' element={<h1>Reviews</h1>}/>

                </Routes>

            </div>
        </div>
    )
}