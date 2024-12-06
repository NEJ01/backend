const app = require('express').Router()
const multer = require('multer');

const Foodmodel=require("../model/Food")

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

//for saving
app.post('/Fnew', upload.single('photo'), async (request, response) => {
        try {
                const { Fname,Description,Price,Cid,Status } = request.body
               
                const newdata = new Foodmodel({
                    Fname,Description,Price,Cid,Status,
                    photo: {
                        data: request.file.buffer,
                        contentType: request.file.mimetype,
                    }
                })


                await newdata.save();
                res.status(200).json({ message: 'food added successfully' });
        }
    catch (error) 
    {
                response.status(500).json({ error: 'Internal Server Error' });
    }
}
)

//For retriving  data

app.get('/Foodview', async (request, response) => {

    const result = await Foodmodel.aggregate([
      {
        $lookup: {
          from: 'foods', // Name of the other collection
          localField: 'Cid', // field of item
          foreignField: '_id', //field of category
          as: 'ffood',
        },
      },
    ]);
  
    response.send(result)
  })

  
//For update status delete
app.put('/updatestatus/:id',async(request,response)=>{
  let id = request.params.id
  await Foodmodel.findByIdAndUpdate(id,{$set:{Status:"INACTIVE"}})
  response.send("Record Deleted")
})


//For modifing the details student
app.put('/Fedit/:id',async(request,response)=>{
  let id = request.params.id
  await Foodmodel.findByIdAndUpdate(id,request.body)
  response.send("Record updated")
})


module.exports = app