const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    blogID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blog',
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('comment' , commentSchema)