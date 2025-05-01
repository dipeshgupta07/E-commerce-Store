
const mongoose = require("mongoose");


const cake = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true,
    },
    flavour: {
        type: String,
        required: true,
    },
    weight: {
        type: String
    },

    price: {
        type: String
    },

    img: {
        type: String
    },

    shape: {
        type: String
    },

    created_at:{
        type: Date,
        required: true,
    }
});
const Cakes = mongoose.model("Cakes", cake);
module.exports = Cakes;