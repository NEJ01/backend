const app=require('express').Router()

const Categorymodel = require('../model/Category');


//For Saving  data

app.post('/Cnew',(request,response)=>{
    new Categorymodel(request.body).save();
    response.send("Record saved Sucessfully")
})

//For retriving  data

app.get('/Cview',async(request,response)=>{
    var data = await Categorymodel.find();
    response.send(data)
})

//For update status delete
app.put('/updatestatus/:id',async(request,response)=>{
    let id = request.params.id
    await Categorymodel.findByIdAndUpdate(id,{$set:{Status:"INACTIVE"}})
    response.send("Record Deleted")
})

//For modifing the details student
app.put('/Cedit/:id',async(request,response)=>{
    let id = request.params.id
    await Categorymodel.findByIdAndUpdate(id,request.body)
    response.send("Record updated")
})

module.exports = app