const mongoose = require('mongoose')

const blogCategorySchema = mongoose.Schema({
    blogCategory : {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('blogCategory', blogCategorySchema)