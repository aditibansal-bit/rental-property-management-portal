const express = require("express");
const router = express.Router();

const {
  createRentalRequest,
  getRentalRequests,
  updateRentalRequestStatus,
} = require("../controllers/rentalRequestController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createRentalRequest);
router.get("/", protect, getRentalRequests);
router.put("/:id", protect, updateRentalRequestStatus);
module.exports = router;