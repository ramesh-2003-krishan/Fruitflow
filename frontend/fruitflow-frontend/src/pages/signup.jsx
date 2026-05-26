import { useState } from "react";
import axios from "axios";

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSignup(e) {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:3000/users",
                {
                    name: name,
                    email: email,
                    password: password,
                    role: "user"
                }
            );

            console.log(response.data);

            alert("Account created successfully");

        } catch (e) {

            console.error(e);

            alert("Signup failed");

        }
    }

    return (

        <div className="w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">

           
            <div className="absolute inset-0 bg-black/50"></div>

            
            <div className="relative z-10 w-[90%] max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">

                
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-200 mt-2">
                        Sign up to continue
                    </p>

                </div>

                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSignup}
                >

                    {/* Name */}
                    <div className="flex flex-col">

                        <label className="text-white mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-blue-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                  
                    <div className="flex flex-col">

                        <label className="text-white mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                  
                    <div className="flex flex-col">

                        <label className="text-white mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-blue-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                    </div>

                   
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-lg font-semibold mt-2"
                    >
                        Sign Up
                    </button>

                </form>

               
                <p className="text-center text-gray-200 mt-6">

                    Already have an account?{" "}

                    <span className="text-blue-300 cursor-pointer hover:underline">
                        Login
                    </span>

                </p>

            </div>

        </div>
    );
}