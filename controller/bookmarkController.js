const bookmarkSchema = require('../model/bookmarkmodel')

exports.addBookmark = async (req, res) => {
    try {
        const data = req.body

        const existingBookmark = await bookmarkSchema.findOne({ userId: data.userId, blogId: data.blogId })
        if (existingBookmark) {
            return res.status(400).json({
                success: false,
                message: "Blog already bookmarked"
            });
        }

        const bookmark = await bookmarkSchema.create(data)
        res.status(200).json({
            status: 'Success',
            message: 'Blog bookmark successfully',
            data: bookmark
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Failed to bookmark blog',
            Error: error.message
        })
    }
}

exports.getUserBookmark = async (req, res) => {
    try {
        const userId = req.params.id

        const userBookmarks = await bookmarkSchema.find({ userId: userId }).lean().populate('blogId')
        res.status(200).json({
            success: true,
            message: 'Get bookmarks successfully',
            data: userBookmarks
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Failed to get bookmarks',
            Error: error.message
        })
    }
}

exports.removeBookmark = async (req, res) => {
    try {
        const { userId , blogId } = req.params;
        
        const result = await bookmarkSchema.findOneAndDelete({ 
            userId: userId, 
            blogId: blogId 
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Bookmark not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Bookmark removed successfully',
            deletedBookmark: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to remove bookmark',
            Error: error.message
        });
    }
};