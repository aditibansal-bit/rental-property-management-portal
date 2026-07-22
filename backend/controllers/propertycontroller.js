const Property = require("../models/Property");
const RentalRequest = require("../models/RentalRequest");
const addProperty = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
    const { title, description, location, rent } = req.body;

    const property = await Property.create({
  title,
  description,
  location,
  rent,
  image: req.file ? req.file.filename : "",
  owner: req.user.id,
});

    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (error) {
     console.log("ADD PROPERTY ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "owner",
      "name email phone"
    );

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email phone"
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const searchProperties = async (req, res) => {
  try {
    const { location, minRent, maxRent } = req.query;

    let query = {};

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (minRent || maxRent) {
      query.rent = {};

      if (minRent) {
        query.rent.$gte = Number(minRent);
      }

      if (maxRent) {
        query.rent.$lte = Number(maxRent);
      }
    }

    const properties = await Property.find(query).populate(
      "owner",
      "name email phone"
    );

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();

    const availableProperties = await Property.countDocuments({
      status: "Available",
    });

    const pendingRequests = await RentalRequest.countDocuments({
  status: "Pending",
});

const activeTenants = await RentalRequest.countDocuments({
  status: "Approved",
});

    res.status(200).json({
  totalProperties,
  availableProperties,
  pendingRequests,
  activeTenants,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    console.log("Property owner:", property.owner);
console.log("Logged in user:", req.user.id);

    if (property.owner.toString() !== req.user.id) {
  return res.status(403).json({
    message: "You are not authorized to update this property",
  });
}

    property.title = req.body.title || property.title;
    property.description = req.body.description || property.description;
    property.location = req.body.location || property.location;
    property.rent = req.body.rent || property.rent;

    // Update image if a new one is uploaded
    if (req.file) {
      property.image = req.file.filename;
    }

    const updatedProperty = await property.save();

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user.id) {
  return res.status(403).json({
    message: "You are not authorized to delete this property",
  });
}

    await property.deleteOne();

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: error.message,
  });
}
};

module.exports = {
  addProperty,
  getProperties,
  searchProperties,
  getDashboardStats,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
