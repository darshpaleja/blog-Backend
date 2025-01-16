const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author_Name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    catID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blogCategory',
        required : true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('blog' , blogSchema)