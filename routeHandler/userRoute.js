const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchemas = require("../Schemas/userSchemas")
const createJWT = require("../middleware/createJWT")
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
userRoute.post("/signup", createJWT, async (req, res) => {

    console.log("route", req.accessToken);

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
                try {
                    //password hash
                    const hashPassword = await bcrypt.hash(req.body.password, 10)

                    //cerate new user
                    const newUser = new User({
                        ...req.body, password: hashPassword
                    })
                    await newUser.save((err) => {
                        if (err) {
                            res.status(500).json({ error: "Internal Server Error" })
                        } else {
                            res.status(200).json({ message: "Sining successful", accessToken: req.accessToken })
                        }
                    })

                } catch {
                    res.status(500).json({ message: "signup field" })
                }
            }
        })


})

userRoute.get("/login", createJWT, async (req, res) => {
    try {
        //check valid user or not
        User.findOne({ email: req.body.email })
            .exec(async (err, result) => {
                if (!err && result) {
                    if (req.body?.password) {
                        // check valid password
                        const matchPassword = await bcrypt.compare(req.body.password, result.password)
                        if (matchPassword) {
                            res.status(200).json({ message: "Login successful", accessToken: req.accessToken })
                        } else {
                            res.status(403).json({ message: "incorrect password" })
                        }
                    } else {
                        res.status(403).json({ message: "Forbidden Access" })
                    }
                } else {
                    res.status(404).json({ message: "User not found" })
                }
            })
    } catch {
        res.status(500).json({ error: "Internal Server Error" })
    }

})

module.exports = userRoute;