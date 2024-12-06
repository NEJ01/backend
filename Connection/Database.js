const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://canteen:123@cluster0.vhsp4.mongodb.net/cms?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));