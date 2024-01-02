// import mongoose database.
const mongoose = require("mongoose");

//make the user Schema
const eventSchema = new mongoose.Schema(
  {
    event_id : {type : String,  },
    event_name: { type: String, required: true },
    outlet_id : {type: String},
    outlet_name : {type: String},
    creator_id : {type: String},
    creator_type : {type: String},
    artist_lineup : [{ type :String}],
    event_date  :{type : Date} ,  // manual entry
    event_start_time : {type : String} , // manually entry
    event_end_time : {type : String} , // manually entry
    booking_status : {type: Boolean} , //open/close matches with events start time, ends with 
    music_category : {type : String} , // dropdown 
    event_category : {type : String} , // dropdown 
    reservation_category : { type : Boolean} , // if no, continue , no changes, 
    event_location_map : {type : String} ,
    event_address : { type: String, required: true }, //outlet address
    description : { type: String },
    authentication_status : {type : Boolean},
    invite_link : {type : String},
    booking_guestlist : {type : Number } ,  //  1 to 8
    customer_category : {type: String},  //radio buttons single lady /couple /group
    event_price : {type : Number} , // price option
    event_disclaimer : {type : String},
    attended_customers: [{type:String}],
    reserved_customers :  [{type:String}],
    ticket_link: {type:String},
    poster_url: { type: String }, // Add poster_url field
    intro_video: { type: String }, // Add intro_video field
  },
  {
    timestamps: true,
  }
);


// make the User module for exporting.
const Event = mongoose.model("event", eventSchema);

// export this User class created.
module.exports = Event;
