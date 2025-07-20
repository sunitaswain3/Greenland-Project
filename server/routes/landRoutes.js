const express = require("express");
const {
  createLand,
  getAllLands,
  updateLand,
  deleteLand,
  getLandById,
} = require("../controllers/landController"); // importing from landController
const authenticateUser = require("../middleware/authMiddleware");
const router = express.Router();

// Create Land
router.post("/createLand",authenticateUser, createLand);

// Get All Lands
router.get("/allLands",authenticateUser,getAllLands);
router.get("/getLandById/:id",getLandById);

// Update Land
router.put("/updateLand/:id",authenticateUser, updateLand);

// Delete Land
router.delete("/deleteLand/:id", deleteLand);

module.exports = router;
