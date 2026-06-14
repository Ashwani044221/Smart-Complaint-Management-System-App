import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import API from "../api/axios";
function Signup() {
  const navigate = useNavigate();
  
  const [signupData,setSignupData] = useState({
    name:"",
    email:"",
    password:"",
    confirmpassword:""
  });

  const [userData,setUserData] = useState([]);
  const HandleChange = (e) =>{
        setSignupData({
          ...signupData,
          [e.target.name]:e.target.value
        });
      };

  const HandleSubmit = async(e) =>{
        e.preventDefault();
      try{
        if(signupData.password !== signupData.confirmpassword){
            alert("Passwords do not match");
          return;
         }

        const { confirmpassword, ...userData } = signupData;

        const res = await API.post("/api/users/signup",userData);

        setUserData(prev => [...prev,res.data]);

        navigate("/Login");

        setSignupData({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
        });

        console.log("User created:", res.data);
        
       }catch(err) {
        console.log(err.response?.data);
        alert(err.response?.data?.message || err.response?.data?.error);
       }
  }; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-gray-300 px-6">

      <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-2xl p-8 shadow-lg">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={HandleSubmit}>

          {/* Name */}
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={HandleChange}
              placeholder="Enter your name"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={HandleChange}
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
              value={signupData.password}
              onChange={HandleChange}
              placeholder="Enter password"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-400">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={signupData.confirmpassword}
              onChange={HandleChange}
              placeholder="Confirm password"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 font-medium"
          >
            Sign Up
          </button>

        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;