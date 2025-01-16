const express = require('express');
const router = express.Router();
const { addLike, removeLike, getUserLikes, getBlogLikeCount } = require('../controller/likeController');

router.post('/addLike', addLike);
router.delete('/removeLike/:userId/:blogId', removeLike);
router.get('/getUserLikes/:id', getUserLikes);
router.get('/getBlogLikeCount/:blogId', getBlogLikeCount);

module.exports = router; 