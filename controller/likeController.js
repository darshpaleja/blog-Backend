const likeSchema = require('../model/likeSchema');

exports.addLike = async (req, res) => {
    try {
        const data = req.body;

        const existingLike = await likeSchema.findOne({ 
            userId: data.userId, 
            blogId: data.blogId 
        });
        
        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "Blog already liked"
            });
        }

        const like = await likeSchema.create(data);
        res.status(200).json({
            success: true,
            message: 'Blog liked successfully',
            data: like
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to like blog',
            Error: error.message
        });
    }
};

exports.removeLike = async (req, res) => {
    try {
        const { userId, blogId } = req.params;
        
        console.log("Attempting to remove like:", { userId, blogId });

        const result = await likeSchema.findOneAndDelete({ 
            userId: userId, 
            blogId: blogId 
        });

        console.log("Delete result:", result);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Like not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Like removed successfully',
            deletedLike: result
        });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(400).json({
            success: false,
            message: 'Failed to remove like',
            Error: error.message
        });
    }
};

exports.getUserLikes = async (req, res) => {
    try {
        const userId = req.params.id;

        const userLikes = await likeSchema
            .find({ userId: userId })
            .lean()
            .populate('blogId');

        res.status(200).json({
            success: true,
            message: 'Get likes successfully',
            data: userLikes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to get likes',
            Error: error.message
        });
    }
};

// Get like count for a blog
exports.getBlogLikeCount = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const count = await likeSchema.countDocuments({ blogId: blogId });

        res.status(200).json({
            success: true,
            message: 'Get like count successfully',
            count: count
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to get like count',
            Error: error.message
        });
    }
}; 