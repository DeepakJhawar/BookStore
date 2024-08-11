import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const change = (e)=>{
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  }
  const navigate = useNavigate();
  const submit = async()=>{
    console.log("clicked")
    try{
      if(values.username === "" || values.email === "" || values.password === "" || values.address === ""){
        alert("All fields are required");
      }else{
        const response = await axios.post("http://localhost:4000/api/v1/sign-up", values);
        alert(response.data.message);
        navigate("/login");
      }
    }catch(err){
      alert(err.response.data.message);
    }
  }
  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 flex flex-col">
        <h2 className="text-zinc-300 text-xl">Sign Up</h2>
        <div className="mt-4">
          <div>
            <label className="text-zinc-400">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              value={values.username}
              onChange={change}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Email</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@gmail.com"
              name="email"
              value={values.email}
              onChange={change}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              value={values.password}
              onChange={change}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Address</label>
            <textarea
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="address"
              name="address"
              value={values.address}
              onChange={change}
              required
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700" onClick={submit}>
              Signup
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
