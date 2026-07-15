const RentalRequest = require("../models/RentalRequest");

const createRentalRequest = async (req, res) => {
  try {
    const { property } = req.body;

    const request = await RentalRequest.create({
      property,
      tenant: req.user.id,
    });

    res.status(201).json({
      message: "Rental request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getRentalRequests = async (req, res) => {
  try {
    const requests = await RentalRequest.find()
      .populate("property", "title location rent")
      .populate("tenant", "name email phone");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateRentalRequestStatus = async (req, res) => {
  try {
    const request = await RentalRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Rental request not found",
      });
    }

    request.status = req.body.status;

    const updatedRequest = await request.save();

    res.status(200).json({
      message: "Rental request updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRentalRequest,
  getRentalRequests,
  updateRentalRequestStatus,
};