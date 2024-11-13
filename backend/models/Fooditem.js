const mongoose = require('mongoose')

const { Schema } = mongoose;

const fooditemSchema = new Schema({
    CategoryName: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    options:{
        type:Array,
        requited:true
    }

});

module.exports = mongoose.model('fooditem', fooditemSchema)