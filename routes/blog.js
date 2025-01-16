var express = require('express');
var router = express.Router();
const BC = require('../controller/blogController')
const upload = require('../middleware/multer')

router.post('/addBlog', upload.single('image') , BC.addBlog)
router.get('/getBlog' , BC.getBlog)
router.delete('/deleteBlog/:id' , BC.deleteBlog)
router.patch('/updateBlog/:id' , upload.single('image') , BC.updateBlog)

router.get('/getBlog/:id' , BC.getBlogById)
router.get('/getBlogByCategoryId/:id' , BC.getBlogByCategoryId)

module.exports = router;