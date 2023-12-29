// import mongoose database.
const mongoose = require("mongoose");

//make the user Schema
const calendarSchema = new mongoose.Schema(
  {
    event_name: { type: String, required: true },
    outlet_name : {type: String},
    artist_lineup : [{ type :String}],
    event_date  :{type : Date} ,  // manual entry
    event_start_time : {type : String} , // manually entry
    event_end_time : {type : String} , // manually entry
    music_category : {type : String} , // dropdown 
    event_category : {type : String} , // dropdown 
    event_location_map : {type : String} ,
    event_address : { type: String, required: true }, //outlet address
    invite_link : {type : String},
  },
  {
    timestamps: true,
  }
);


// make the User module for exporting.
const Calendar = mongoose.model("calendar", calendarSchema);

// export this User class created.
module.exports = Calendar;
