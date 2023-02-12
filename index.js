const express = require('express');
const mongoose = require('mongoose');

//require external routes
const userRoute = require('./routeHandler/userRoute');



const cors = require('cors');
const productRoute = require('./routeHandler/productRoute');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())


//connect to database with mongoose
mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://tanvir321:tanvir321@cluster0.wdaooaq.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log("connect successfully"))
    .catch((err) => console.log(err))


// Routes handle
app.use("/user", userRoute)
app.use("/product", productRoute)







// Server Root route
app.get("/", (req, res) => {
    res.status(200).json({ message: "E Commerce Server id Going ON" })
})

// lessening to server
app.listen(port, () => {
    console.log('listen to port, ', port);
})