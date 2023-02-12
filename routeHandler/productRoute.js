const express = require("express")
const mongoose = require("mongoose")
const productSchema = require("../Schemas/productSchema")

const productRoute = express.Router()

const Product = mongoose.model("product", productSchema)

//Post a product
productRoute.post("/add", async (req, res) => {

    const newProduct = new Product(req.body)
    await newProduct.save((err) => {
        if (!err) {
            res.status(200).json({ message: "added success" })
        } else {
            res.status(409).json({ error: "added failed" })

        }
    })

})

//product get by id
productRoute.get("/:id", async (req, res) => {

    //hear find by id
    Product.findById(req.params.id)
        .select({
            __v: 0,
        }).exec((error, result) => {
            if (!error && result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({ error: "product Not Found" })
            }
        })
})

//get all product 
productRoute.get("/all", async (req, res) => {
    Product.find({}).exec((error, result) => {
        if (!error && result) {
            console.log(result);
        } else {
            console.log(error);
        }
    })

})

module.exports = productRoute;