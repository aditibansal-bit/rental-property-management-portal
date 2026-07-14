const express = require("express");
const router = express.Router();

const {
  addProperty,
  getProperties,
  getPropertyById,
  updateProperty, 
} = require("../controllers/propertyController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addProperty);
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.put("/:id", protect, updateProperty);

module.exports = router;