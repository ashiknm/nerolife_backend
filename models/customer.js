// import mongoose database.
const mongoose = require("mongoose");

//make the user Schema
const customerSchema = new mongoose.Schema(
  {
    customer_first_name: { type: String, required: true },
    customer_last_name: { type: String, required: true },
    customer_id : {type : String },
    gender: { type: String , required: true  }, // dropdown
    dob: { type: Date , required: true },
    phone: { type: String , required: true , unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age_group : {type :String},  // drop down auto generation
    music_preference : {type :String},  // dropdown
    event_preference : {type :String},  // dropdown
    music_platform : {type :String}, // dropdown
    outing_frequency : {type :String}, // dropdown
    communication_preference : {type : String}, // dropdown 
    social_handles : { type: String },
    authentication_status : {type : Boolean},
    customers_feedback : {type : String},
    request_help : {type :String},
    invite_link : {type : String},
    customer_disclaimer : {type : String},
    customer_license_acceptance : {type :Boolean},
    attended_events :  [{type:String}],
    reserved_events  : [{type:String}],
    
  },
  {
    timestamps: true,
  }
);

// make the User module for exporting.
const Customer = mongoose.model("customer", customerSchema);

// export this User class created.
module.exports = Customer;
