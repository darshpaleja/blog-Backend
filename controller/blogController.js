const blogSchema = require('../model/blogSchema')

exports.addBlog = async (req ,res) => {
    const data = req.body
    console.log(req.file , "file");
    const image = req.file.filename

    const blogData = {
        title : data.title,
        content : data.content,
        author_Name : data.author_Name,
        address : data.address,
        image : image,
        catID : data.catID
    }
    
    try {
        const blogCreatedData = await blogSchema.create(blogData)
        res.status(200).json({
            status : 'Success',
            Message : 'Blog Add Successfully',
            Data : blogCreatedData
        })
    } catch (error) {
        res.status(400).json({
            status : 'Fail',
            Message : error.message
        })
    }
}

// Get All Blog
exports.getBlog = async (req , res) => {
    try {
        const blogData = await blogSchema.find().populate('catID')
        res.status(200).json({
            status : 'Success',
            Message : 'Blog get Successfully',
            Data : blogData
        })
    } catch (error) {
        res.status(400).json({
            status : 'Fail',
            Message : error.message
        })
    }
}

// Get Blog By ID
exports.getBlogById = async (req , res) => {
    try {
        const blogData = await blogSchema.findById(req.params.id).populate('catID')
        res.status(200).json({
            status : 'Success' ,
            Message : 'Blog Get Successfully' ,
            Data : blogData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail' ,
            Message : error.message
        })
    }
}

exports.deleteBlog = async (req , res) => {
    const deleteID = req.params.id
    console.log(deleteID , 'delete id');
    
    try {
        await blogSchema.findByIdAndDelete(deleteID)
        res.status(200).json({
            status : 'Success' ,
            Message : 'Blog Deleted Successfully'
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}

exports.updateBlog = async (req , res) => {
    const updateID = req.params.id
    const updatedData = req.body

    try {
        const newData = await blogSchema.findByIdAndUpdate(updateID , updatedData)
        res.status(200).json({
            status : 'Success' ,
            Message : 'Blog Updated Successfully',
            Data : newData
        }) 
    } catch (error) {
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}

// Get Blog By Category ID
exports.getBlogByCategoryId = async (req , res) => {
    const categoryID = req.params.id
    try {
        const blogData = await blogSchema.find({ catID : categoryID }).populate('catID')
        res.status(200).json({
            status : 'Success' ,
            Message : 'Blog Get Successfully' ,
            Data : blogData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail' ,
            Message : error.message
        })
    }
}
