const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    image_url: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    }

})

module.exports = productSchema;