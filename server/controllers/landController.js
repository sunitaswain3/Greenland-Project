const Land = require("../models/LandModel");
const cloudinary = require("../config/cloudinaryConfig");
// Create Land
const createLand = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      address,
      images, // array of base64 images from frontend
      
    } = req.body;
    // console.log(req.body);
    

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const imageUrls = [];

    for (const base64Image of images) {
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: 'lands', // optional: organizes uploads in Cloudinary
      });
      imageUrls.push(result.secure_url);
    }

    const newLand = await Land.create({
      title,
      description,
      price,
      address,
      imageUrls,
      seller: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Land created successfully',
      data: newLand,
    });
  } catch (error) {
    console.error('Create Land Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};


 

// Get All Lands
const getAllLands = async (req, res) => {
  try {
    const lands = await Land.find( { seller: req.user.id } ).populate('seller');
    res.status(200).json({
      success: true,
      data: lands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLandById = async(req, res ) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) {
      return res.status(404).json({
        success: false,
        message: 'Land not found',
        });
        }
        res.status(200).json({
          success: true,
          data: land,
          });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Edit Land
const updateLand = async (req, res) => {
  try {
    const updatedLand = await Land.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLand) {
      return res.status(404).json({
        success: false,
        message: "Land not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Land updated successfully",
      data: updatedLand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Land
const deleteLand = async (req, res) => {
  try {
    const land = await Land.findByIdAndDelete(req.params.id);

    if (!land) {
      return res.status(404).json({
        success: false,
        message: "Land not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Land deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createLand,
  getAllLands,
  updateLand,
  deleteLand,
  getLandById
};