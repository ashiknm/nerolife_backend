// write a controller function to get all the Outlets from the database.
// for this first import the Outlet class from the models file Outlet.js

const Outlet = require("../models/outlet");

// function to get all the Outlets.
async function handleGetAllOutlets(req, res) {
  const allDbOutlets = await Outlet.find({});
  return res.json(allDbOutlets);
}

// function to get the Outlet by id.
async function handleGetOutletById(req, res) {
  // first get the id enterd by the Outlet.
  const fetched_Outlet = await Outlet.findById(req.params.id);
  // if the Outlet if not found by the id.
  if (!fetched_Outlet) {
    return res.status(400).json({ error: "Outlet not found." });
  }
  // return the fetch Outlet from the database.
  return res.json(fetched_Outlet);
}

async function handleUpdateOutletById(req, res) {
  try {
    const updatedOutlet = await Outlet.findByIdAndUpdate(
      req.params.id,
      req.body, // Use req.body to get the updated values from Postman or frontend
      { new: true, runValidators: true }
    );

    if (!updatedOutlet) {
      return res.status(404).json({ error: "Outlet not found." });
    }

    return res.json({ status: "Outlet updated successfully.", updatedOutlet });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleDeleteOutletById(req, res) {
  try {
    const deletedOutlet = await Outlet.findByIdAndDelete(req.params.id);

    if (!deletedOutlet) {
      return res.status(404).json({ error: "Outlet not found." });
    }

    const deletionTime = new Date();
    // You can perform additional operations or logging related to the deletion here.
    console.log(deletionTime);

    return res.json({
      status: "Outlet deleted successfully.",
      deletedOutlet,
      deletionTime,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleCreateNewOutlet(req, res) {
  try {
    const body = req.body;
    if (
      !body.outlet_name ||
      !body.phone ||
      !body.email ||
      !body.password ||
      !body.address ||
      !body.opening_time ||
      !body.closing_time ||
      !body.outlet_category
    ) {
      // we will set the reponse code to 400
      return res.status(400).json({ Warning: "All fields are required. " });
    }
    // now we will push the code into the mongodb database into the Outlets collection.
    const result = await Outlet.create({
        outlet_name: body.outlet_name,
        outlet_id : body.outlet_id,
        gender: body.gender, // dropdown
        dob: body.dob,
        phone: body.phone,
        email: body.email,
        password: body.password,
        address: body.address,
        website: body.website,
        opening_time: body.opening_time,
        closing_time: body.closing_time,
        social_handles: body.social_handles,
        outlet_icon: body.outlet_icon,
        outlet_category: body.outlet_category,
        description: body.description,
        linked_artists: body.linked_artists,
        map: body.map,
        authentication_status: body.authentication_status,
        feedback: body.feedback,
        requesthelp: body.requesthelp,
        invitelink: body.invitelink,
        outlet_profile_rules_and_regulation: body.outlet_profile_rules_and_regulation,
        outlet_license_acceptance: body.outlet_license_acceptance,
        intro_video: body.intro_video
     
    });
    //  we will consolel the result as well .
    console.log("Result is ", result);
    // so return the status code as 201 , so as to indicate Outlet has been created.
    return res
      .status(201)
      .json({ Message: "Outlet successfully created.", id: result._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

module.exports = {
  handleGetAllOutlets,
  handleGetOutletById,
  handleUpdateOutletById,
  handleDeleteOutletById,
  handleCreateNewOutlet,
};
