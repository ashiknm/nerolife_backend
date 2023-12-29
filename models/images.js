const mongoose=require('mongoose');

var Images=mongoose.model('images',{
     prop_id:{type:String},
     avatar:{type:String},
});

module.exports={Images}