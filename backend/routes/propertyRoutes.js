const express = require("express");
const router = express.Router();

const {
  addProperty,
  getProperties,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addProperty);
router.get("/", getProperties);
module.exports = router;