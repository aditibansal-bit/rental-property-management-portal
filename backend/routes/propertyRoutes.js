const express = require("express");
const router = express.Router();

const {
  addProperty,
  getProperties,
  searchProperties,
  getDashboardStats,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Add Property (with image upload)
router.post(
  "/",
  protect,
  upload.single("image"),
  addProperty
);

// Get all properties
router.get("/", getProperties);

// Search properties
router.get("/search", searchProperties);

// Get dashboard stats
router.get("/dashboard/stats", protect, getDashboardStats);

// Get property by ID
router.get("/:id", getPropertyById);

// Update property
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProperty
);

// Delete property
router.delete("/:id", protect, deleteProperty);

module.exports = router;