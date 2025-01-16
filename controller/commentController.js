const commentSchema = require('../model/commentSchema')

exports.addComment = async (req , res) => {
    const data = req.body
    console.log(data , 'data');
    
    try {
        const commentData = await commentSchema.create(data)
        res.status(200).json({
            status : 'Success',
            Message : 'Comment Added Successfully',
            Data : commentData
        })
    } catch (error) {
        res.status(400).json({
            status : 'Fail',
            Message : error.message
        })
    }
}

exports.getComment = async (req , res) => {
    try {

        const commentData = await commentSchema.find()
        res.status(200).json({
            status : 'Success',
            Message : 'Comments get Successfully',
            Data : commentData
        })
    } catch (error) {
        res.status(400).json({
            status : 'Fail',
            Message : error.message
        })
    }
}

exports.getCommentByBlogId = async (req , res) => {
    const blogId = req.params.blogId
    try {
        const commentData = await commentSchema.find({blogID : blogId})
        res.status(200).json({
            status : 'Success',
            Message : 'Comments get Successfully',
            Data : commentData
        })
    } catch (error) {
        res.status(400).json({
            status : 'Fail',
            Message : error.message
        })
    }
}

exports.getCommentByUserName = async (req , res) => {
    const userName = req.params.userName
    try {
        const commentData = await commentSchema.find({userName : userName}).populate('blogID')
        res.status(200).json({
            status : 'Success',
            Message : 'Comments get Successfully',
            Data : commentData
        })
    } catch (error) {
        res.status(400).json({
            status : 'Fail',
            Message : error.message
        })
    }
}

