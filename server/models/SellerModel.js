const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"] 
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: { 
    type: String, 
    required: [true, "Password is required"] 
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: [true, "Phone number must be unique"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Seller", sellerSchema);
