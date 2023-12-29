// import mongoose database.
const mongoose = require("mongoose");

//make the user Schema
const outletSchema = new mongoose.Schema(
  {
    outlet_name: { type: String, required: true },
    outlet_id : {type : String, },
    phone: { type: String , required: true , unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address : { type: String, required: true },
    website : {type : String},
    opening_time: { type: String, required: true }, // am pm
    closing_time: { type: String, required: true },
    social_handles : { type: String },
    outlet_icon : { type: String  },
    outlet_category: { type: String, required: true },
    description : { type: String },
    linked_artists : [{type:String}],
    linked_events : [{type:String}],
    map : {type:String}, // event location --- outlet google location
    authentication_status : {type : Boolean},
    feedback : {type : String},
    requesthelp : {type :String},
    invitelink : {type : String},
    outlet_profile_rules_and_regulation : {type : String},
    outlet_license_acceptance : {type :Boolean},
    rating : {type: Number}
  },
  {
    timestamps: true,
  }
);

// make the User module for exporting.
const Outlet = mongoose.model("outlet", outletSchema);

// export this User class created.
module.exports = Outlet;