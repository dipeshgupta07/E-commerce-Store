const mongoose = require("mongoose");


const order = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },

    message: {
        type: String
    },

    del_date: {
        type: Date
    },

    cake: {
        type: String
    },

    created_at:{
        type: Date,
        required: true,
    }
});
const Orders = mongoose.model("Orders", order);
module.exports = Orders;