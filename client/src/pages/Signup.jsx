import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();


  const [name,setName]= useState("")
  const [email,setemail]= useState("")
  const [phone,setphone]= useState("")
  const [password,setPassword]= useState("")

  const [ok,setOk]= useState("")

  const handleSubmit = async()=>{

    const data = {name,email,phone,password}

    try {
      const response = await axios.post("http://localhost:3000/api/sellerAuth/sellerRegister",data)
      console.log(response)
      setOk(response.data.message)
      setTimeout( ()=>navigate('/'),2000)        //2 sec =2000
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-80 text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Signup</h2>
        {ok?<p>{ok}</p>:null}
        <input type="text" placeholder="Name" className="w-full mb-4 p-2 border rounded" onChange={(e)=> setName(e.target.value) }/>
        <input type="text" placeholder="Email" className="w-full mb-4 p-2 border rounded" onChange={(e)=> setemail(e.target.value) } />
        <input type="text" placeholder="phone" className="w-full mb-4 p-2 border rounded" onChange={(e)=> setphone(e.target.value) }/>
        <input type="password" placeholder="Password" className="w-full mb-6 p-2 border rounded" onChange={(e)=> setPassword(e.target.value) } />
        <button onClick={handleSubmit} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
