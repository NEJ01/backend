const mongoose=require("mongoose")
let sc=mongoose.Schema;
const FoodSchema = new sc({
    Fname:String,
    Description:String,
    Price:Number,
    Cid:{type:mongoose.Schema.Types.ObjectId,ref:'Categories'},
    Status:String,
    photo:{
        data : Buffer,
        contentType:String,
    },
    
});

var Foodmodel=mongoose.model("Foods",FoodSchema)
module.exports=Foodmodel;