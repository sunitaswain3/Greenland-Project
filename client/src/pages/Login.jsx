import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [ok, setOk] = useState("")

  const handleSubmit = async() => {

    const data = { email, password }


    try {
      const response = await axios.post("http://localhost:3000/api/sellerAuth/sellerLogin", data)
      console.log(response)

      localStorage.setItem("authToken",response.data.token)
      setOk(response.data.message)
      setTimeout(() => navigate('/dashboard'), 2000)        //2 sec =2000
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-80 text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Login</h2>
        {ok?<p>{ok}</p>:null}
          <input type="text" placeholder="Email" className="w-full mb-4 p-2 border rounded" onChange={(e) => setemail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full mb-6 p-2 border rounded" onChange={(e) => setpassword(e.target.value)} />
          <button onClick={handleSubmit} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">Login</button>
          <p className="mt-4 text-center text-sm">
            Don't have an account? <Link to="/signup" className="text-green-600 font-semibold">Sign up</Link>
          </p>
        </div>
    </div>
      );
};

      export default Login;
