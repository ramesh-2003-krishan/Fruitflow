import { useState } from "react"

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(){
        console.log(email)
        console.log(password)
    }

    return (
        <div className="w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">

            
            <div className="absolute inset-0 bg-black/50"></div>

           
            <div className="relative z-10 w-[90%] max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">

               
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-gray-200 mt-2">
                        Login to your account
                    </p>
                </div>

                
                <form className="flex flex-col gap-5">

                   
                    <div className="flex flex-col">
                        <label className="text-white mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-blue-400"
                            onChange={
                                (e) =>{
                                    setEmail(e.target.value)
                                }
                            }
                            value={email}
                        />
                    </div>

                   
                    <div className="flex flex-col">
                        <label className="text-white mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-blue-400"
                            onChange={
                                (e) =>{
                                    setPassword(e.target.value)
                                }
                            }
                            value={password}
                        />
                    </div>

                   
                    <div className="flex justify-between items-center text-sm text-white">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <button
                            type="button"
                            className="hover:text-blue-300"
                        >
                            Forgot Password?
                        </button>
                    </div>

                   
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-lg font-semibold mt-2"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                </form>

               
                <p className="text-center text-gray-200 mt-6">
                    Don’t have an account?{" "}
                    <span className="text-blue-300 cursor-pointer hover:underline">
                        Register
                    </span>
                </p>

            </div>

        </div>
    )
}