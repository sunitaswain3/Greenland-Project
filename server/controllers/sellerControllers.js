const sellerModel = require("../models/SellerModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const registerSeller = async(req,res) =>{
    try { 
        const {name,email,password,phone} =req.body

        const hashPassword = await bcrypt.hash(password, 10)

        const newSeller = new sellerModel({name,email,password:hashPassword,phone})

        const existingSeller = await sellerModel.findOne({email})
        if(existingSeller){
            return res.status(400).json({message:"email already exit"})
        }
        
        await newSeller.save()
        res.status(201).json({message:"Seller registered successfully✅",data:newSeller})
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}

const loginSeller = async(req,res)=> {
  try {
     const {email,password} =req.body
    
     if (!email || !password) {
        return res.status(400).json({message:"email and password are required"})
     }
        
     const existingSeller = await sellerModel.findOne({email})
     if(!existingSeller){
        return res.status(404).json({message:"seller not found"})
    }

    // if(password != existingSeller.password){
    //     return res.status(400).json({message:"invalid password"})
    // }

    const isMatch = await bcrypt.compare(password,existingSeller.password)

    if (!isMatch){
        return res.status(401).json({message:"invalid password"})
    }

    const token = jwt.sign({ id: existingSeller._id },process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(200).json({message:"login successful",data:existingSeller,token:token})

   } catch (error) {
    
    res.status(500).json({error:error.message})
  }
}

module.exports = {registerSeller,loginSeller}