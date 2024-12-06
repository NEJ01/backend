const express = require("express");
const cors = require("cors")


const db = require("./Connection/Database")
const loginrouter = require('./routes/Loginroute')
const Categoryrouter = require('./routes/Categoryroute')
// const Productrouter = require('./routes/Productroute')
const Foodrouter = require('./routes/Foodroute')

const app = new express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());





app.get('/', (request, response) => {
    response.send("hi database")
})

app.use("/login", loginrouter)
app.use("/Category", Categoryrouter)
// app.use("/Product", Productrouter)
app.use("/Food", Foodrouter )




app.listen(4005, (request, response) => {
    console.log("Port is running in 4005")
})