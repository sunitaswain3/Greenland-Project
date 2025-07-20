const express = require("express");
const {
    registerSeller, loginSeller
     }     = require("../controllers/sellerControllers");



const router = express.Router();

//register user
router.post("/sellerRegister",registerSeller);

//login user
 router.post("/sellerLogin",loginSeller);


module.exports = router