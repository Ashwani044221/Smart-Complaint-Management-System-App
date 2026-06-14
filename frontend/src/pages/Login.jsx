import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import API from "../api/axios"; 

function Login() {
  const navigate =useNavigate();

  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");

  const loginInput = {email,password};
  
  const HandleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const res =await API.post("/api/users/login",loginInput);

      localStorage.setItem("user",JSON.stringify(res.data.user));

      alert(res.data.message);
      navigate("/Mycomplaints");

      setEmail("");
      setPassword("");
    }catch(err){
      alert(err.response?.data?.error || "Login failed");
    }
   };
    return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-gray-300 px-6">

      <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-2xl p-8 shadow-lg">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <form className="space-y-5" onSubmit={HandleSubmit}>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 font-medium"
          >
            Login
          </button>

        </form>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;