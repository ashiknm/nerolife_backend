// import mongoose database.
const mongoose = require("mongoose");

//make the user Schema
const artistSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    artist_name: { type: String, required: true },
    artist_id : {type : String,  unique: true },
    dob :{type :Date , required : true},
    phone: { type: String , required: true , unique:true },
    email: { type: String, required: true, unique: true },
    website : {type : String},
    password: { type: String, required: true },
    age_group : {type: String},
    social_handles : { type: String },
    artist_profile_icon : { type: String  },
    artist_category: { type: String, required: true },
    music_operations : {type :String , required : true},
    description : { type: String },
    linked_outlets : {type: String},
    authentication_status : {type : Boolean},
    feedback : {type : String},
    requesthelp : {type :String},
    invitelink : {type : String},
    artist_profile_disclaimer : {type : String},
    artist_license_acceptance : {type :Boolean},
  },
  {
    timestamps: true,
  }
);

// make the User module for exporting.
const Artist = mongoose.model("artist", artistSchema);

// export this User class created.
module.exports = Artist;






