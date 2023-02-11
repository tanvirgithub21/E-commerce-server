const express = require("express")
const mongoose = require("mongoose")
const userSchemas = require("../Schemas/userSchemas")
const userRoute = express.Router()

const User = new mongoose.model("User", userSchemas)


//get a user
userRoute.get("/", async (req, res) => {

    await User.findOne({ email: "tanvir.bd.global@gmail.com" })
        .select({
            _id: 0,
            password: 0,
            __v: 0,
        })
        .exec((err, result) => {
            if (err) {

                res.status(500).json({ error: "Internal Server Error" })
            } else {
                res.status(200).json({
                    message: "User find successful",
                    result: result,
                })
            }
        })
})

//create user
userRoute.post("/create", async (req, res) => {

    //check user already exist or not
    await User.findOne({ email: req.body.email })
        .exec(async (err, result) => {
            console.log(err, result);
            if (err) {
                res.status(500).json({ error: "Internal Server Error" })
            } else if (result) {
                res.status(400).json({ message: "User Already exist" })
            }
            else {
                //cerate new user
                const newUser = new User(req.body)
                await newUser.save(err => {
                    if (err) {
                        res.status(500).json({ error: "Internal Server Error" })
                    } else {
                        res.status(200).json({ message: "Sining successful" })
                    }
                })
            }
        })


})

module.exports = userRoute;