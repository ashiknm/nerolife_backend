const mongoose=require('mongoose');

var Videos=mongoose.model('videos',{
     prop_id:{type:String},
     avatar:{type:String},
});
module.exports={Videos}