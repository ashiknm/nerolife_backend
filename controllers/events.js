// write a controller function to get all the Events from the database.
// for this first import the Event class from the models file Event.js

const Event = require("../models/events");

// function to get all the Events.
async function handleGetAllEvents(req, res) {
  const allDbEvents = await Event.find({});
  return res.json(allDbEvents);
}

// function to get the Event by id.
async function handleGetEventById(req, res) {
  // first get the id enterd by the Event.
  const fetched_Event = await Event.findById(req.params.id);
  // if the Event if not found by the id.
  if (!fetched_Event) {
    return res.status(400).json({ error: "Event not found." });
  }
  // return the fetch Event from the database.
  return res.json(fetched_Event);
}

async function handleUpdateEventById(req, res) {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body, // Use req.body to get the updated values from Postman or frontend
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    return res.json({ status: "Event updated successfully.", updatedEvent });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleDeleteEventById(req, res) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    const deletionTime = new Date();
    // You can perform additional operations or logging related to the deletion here.
    console.log(deletionTime);

    return res.json({
      status: "Event deleted successfully.",
      deletedEvent,
      deletionTime,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

async function handleCreateNewEvent(req, res) {
  try {
    const body = req.body;
    if (
      !body.event_name ||
      !body.outlet_name ||
      !body.event_address
    ) {
      // we will set the reponse code to 400
      return res.status(400).json({ Warning: "All fields are required. " });
    }
    // now we will push the code into the mongodb database into the Events collection.
    const result = await Event.create({
        event_id : body.event_id,
        event_name: body.event_name,
        outlet_id : body.outlet_id,
        outlet_name : body.outlet_name,
        creator_id : body.creator_id,
        creator_type : body.creator_type,
        artist_lineup : body.artist_lineup,
        event_date  :body.event_date ,  // manual entry
        event_start_time : body.event_start_time , // manually entry
        event_end_time : body.event_end_time , // manually entry
        booking_status : body.booking_status , //open/close matches with events start time, ends with event_start_time.
        music_category : body.music_category , // dropdown 
        event_category : body.event_category , // dropdown 
        reservation_category : body.reservation_category , // if no, continue , no changes, 
        // if yes. book guest list, or buy tickets
        // post event start time close
        event_location_map : body.event_location_map ,
        event_address : body.event_address, //outlet address
        description : body.description,
        authentication_status : body.authentication_status,
        invite_link : body.invite_link,
        booking_guestlist : body.booking_guestlist ,  // dropdown  1 to 10
        event_price : body.event_price , // price option
        event_disclaimer : body.event_disclaimer,
        poster_url: body.poster_url, // Add poster_url field
        intro_video: body.intro_video, // Add intro_video field
    });
    //  we will consolel the result as well .
    console.log("Result is ", result);
    // so return the status code as 201 , so as to indicate Event has been created.
    return res
      .status(201)
      .json({ Message: "Event successfully created.", id: result._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

module.exports = {
  handleGetAllEvents,
  handleGetEventById,
  handleUpdateEventById,
  handleDeleteEventById,
  handleCreateNewEvent,
};
