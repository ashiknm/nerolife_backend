// write a controller function to get all the Artists from the database.
// for this first import the Artist class from the models file Artist.js

const Artist = require("../models/artist");

// function to get all the Artists.
async function handleGetAllArtists(req, res) {
  const allDbArtists = await Artist.find({});
  return res.json(allDbArtists);
}

// function to get the Artist by id.
async function handleGetArtistById(req, res) {
  // first get the id enterd by the Artist.
  const fetched_Artist = await Artist.findById(req.params.id);
  // if the Artist if not found by the id.
  if (!fetched_Artist) {
    return res.status(400).json({ error: "Artist not found." });
  }
  // return the fetch Artist from the database.
  return res.json(fetched_Artist);
}

async function handleUpdateArtistById(req, res) {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body, // Use req.body to get the updated values from Postman or frontend
      { new: true, runValidators: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({ error: "Artist not found." });
    }

    return res.json({ status: "Artist updated successfully.", updatedArtist });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleDeleteArtistById(req, res) {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);

    if (!deletedArtist) {
      return res.status(404).json({ error: "Artist not found." });
    }

    const deletionTime = new Date();
    // You can perform additional operations or logging related to the deletion here.
    console.log(deletionTime);

    return res.json({
      status: "Artist deleted successfully.",
      deletedArtist,
      deletionTime,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleCreateNewArtist(req, res) {
  try {
    const body = req.body;
    if (
      !body.first_name ||
      !body.last_name ||
      !body.artist_name ||
      !body.artist_id ||
      !body.dob ||
      !body.password ||
      !body.email ||
      !body.phone || 
      !body.artist_category || 
      !body.music_operations
    ) {
      // we will set the reponse code to 400
      return res.status(400).json({ Warning: "All fields are required. " });
    }
    // now we will push the code into the mongodb database into the Artists collection.
    const result = await Artist.create({
        first_name: body.first_name,
        last_name: body.last_name,
        artist_name: body.artist_name,
        artist_id : body.artist_name,
        dob :body.dob,
        phone: body.phone,
        email: body.email,
        website : body.website,
        password: body.password,
        age_group : body.age_group,
        social_handles : body.social_handles,
        artist_profile_icon : body.artist_profile_icon,
        artist_category: body.artist_category,
        music_operations : body.music_operations,
        description : body.description,
        linked_outlets : body.linked_outlets,
        authentication_status :body.authentication_status,
        feedback : body.feedback,
        requesthelp : body.requesthelp,
        invitelink : body.invitelink,
        artist_profile_disclaimer : body.artist_profile_disclaimer,
        artist_license_acceptance : body.artist_license_acceptance,
    });
    //  we will consolel the result as well .
    console.log("Result is ", result);
    // so return the status code as 201 , so as to indicate Artist has been created.
    return res
      .status(201)
      .json({ Message: "Artist successfully created.", id: result._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

module.exports = {
  handleGetAllArtists,
  handleGetArtistById,
  handleUpdateArtistById,
  handleDeleteArtistById,
  handleCreateNewArtist,
};
