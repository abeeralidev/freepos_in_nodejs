const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
    activestatus:{
        type:String,
        required:false,
        default:'active'
    }, //active,deactive
    attributes:[
        {
            name:String,
            value:String
        }
    ],
    availability:{
        type:String,
        required:false,
        default:'In Stock'
    }, //In Stock, Out Of Stock
    badge:String,//New,Sale,Hot
    brand:String, 
    categories:[
        String
    ],
    descriptionshort:{
        type:String,
        required:false
    },
    descriptionlong:{
        type:String,
        required:false
    },
    images:[String],
    name:{
        type:String,
        required:true
    },
    pricesale:Number,
    priceoriginal:Number,
    reviews:[
        {
            user:String,
            comment:String,
            createddate:{
                type:Date,
                default:new Date()},
                replies:
            [
                {user:String,
                    comment:String,
                    createddate:{
                        type:Date,
                        default:new Date()
                    }
                }
            ]
        }],
    size:String,
    slug:{
        type:String,
        required:true,
        unique:true
    },
    thumbnail:String,
    weight:String,
})

const products = new  mongoose.model("Product",ProductsSchema);

module.exports = products
