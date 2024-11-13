const mongoose = require('mongoose')

const { Schema } = mongoose;

const ReviewSchema = new Schema({
    customerName: {
        type: String,
        required: true,
        
    },
    email:{
        type:String,
        required:true
    },
    itemOrdered:{
        type:String,
        required:true
    },
    rating: {
        type: Number,
        
    },
    comment: {
        type: String,
        required: true,
    },
    foodQuality: {
        type: Number,
        required: true,
    },
    deliveryTime:{
        type:Number,
        required:true
    },
    packagingTime:{
        type:Number,
        required:true
    },
    wouldOrderAgain:{
        type:Boolean,
        required:true
    }
    

});

module.exports = mongoose.model('Review', ReviewSchema)