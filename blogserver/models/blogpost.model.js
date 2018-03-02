'use strict';

//blogpost
const mongoose = require("mongoose");
//Blog post author, date, title, body, category
const blogpostSchema = new mongoose.Schema({
    id:Number,
    author:String,
    title:String,
    category:String,
    body:String,
    date:{type:Date, default:Date.now},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

const Blogpost = mongoose.model("Blogpost", blogpostSchema);
module.exports = Blogpost;