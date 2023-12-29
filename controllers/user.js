// write a controller function to get all the users from the database.
// for this first import the User class from the models file user.js

const User = require("../models/user");

// function to get all the users.
async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

// function to get the user by id.
async function handleGetUserById(req, res) {
  // first get the id enterd by the user.
  const fetched_user = await User.findById(req.params.id);
  // if the user if not found by the id.
  if (!fetched_user) {
    return res.status(400).json({ error: "User not found." });
  }
  // return the fetch user from the database.
  return res.json(fetched_user);
}

async function handleUpdateUserById(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // Use req.body to get the updated values from Postman or frontend
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ status: "User updated successfully.", updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const deletionTime = new Date();
    // You can perform additional operations or logging related to the deletion here.
    console.log(deletionTime);

    return res.json({
      status: "User deleted successfully.",
      deletedUser,
      deletionTime,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleCreateNewUser(req, res) {
  try {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      // we will set the reponse code to 400
      return res.status(400).json({ Warning: "All fields are required. " });
    }
    // now we will push the code into the mongodb database into the users collection.
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });
    //  we will consolel the result as well .
    console.log("Result is ", result);
    // so return the status code as 201 , so as to indicate user has been created.
    return res
      .status(201)
      .json({ Message: "User successfully created.", id: result._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
