const express = require('express')
const router = express.Router()
const CC = require('../controller/commentController')

router.post('/addComment' , CC.addComment)
router.get('/getComment' , CC.getComment)
router.get('/getCommentByBlogId/:blogId' , CC.getCommentByBlogId)
router.get('/getCommentByUserName/:userName' , CC.getCommentByUserName)

module.exports = router