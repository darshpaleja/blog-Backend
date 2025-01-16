const express = require('express')
const router = express.Router()
const BC = require('../controller/bookmarkController')
const authCheck = require('../middleware/authCheck')

router.post('/addbookmark' , authCheck.tokenSecure  , BC.addBookmark)
router.get('/getUserBookmark/:id' , authCheck.tokenSecure , BC.getUserBookmark)
router.delete('/removeBookmark/:userId/:blogId' , authCheck.tokenSecure , BC.removeBookmark)

module.exports = router