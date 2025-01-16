var express = require('express');
var router = express.Router();
const CC = require('../controller/blogCategoryController')

router.post('/addCategory', CC.createcategory)
router.get('/getCategory', CC.getCategory)
module.exports = router;
