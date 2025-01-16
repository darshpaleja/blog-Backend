const blogCategorySchema = require('../model/blogCategory')

exports.createcategory = async (req ,res) => {
    const data = req.body
    
    try {
        const catData = await blogCategorySchema.create(data)
        res.status(200).json({
            status : 'Success',
            Message : 'Blog Category Add Successfully',
            Data : catData
        })
    } catch (error) {
        res.status(400).json({
            status : 'Fail',
            Message : error.message
        })
    }
}

exports.getCategory = async (req, res) => {
  try {
    const data = await blogCategorySchema.find();
    res.status(200).json({
      status: "Success",
      Message: "Blog Category Get Successfully",
      Data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      Message: error.message,
    });
  }
};
