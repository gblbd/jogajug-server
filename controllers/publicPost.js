const PublicPost = require('../models/publicPost');

exports.publicPostData = async (req, res) => {
    const {
        postText,
        activityStatus,
        taggedUserFriend,
        postLocation,
        shareLink,
        newsfeedStatus,
        postImageList,
        postGifImage,
    } = req.body;
    console.log('reqbody', req.body);

    try {
        const userId = req.ID;

        const newPostData = new PublicPost({
            postedByUser: userId,
            postText,
            activityStatus,
            taggedUserFriend,
            postLocation,
            shareLink,
            newsfeedStatus,
            postImageList,
            postGifImage,
        });
        newPostData.save((err, data) => {
            if (err) {
                return res.status(404).json({ error: err });
            }
            res.json({
                data: data._id,
                message: 'posted success!',
            });
        });
    } catch (error) {
        res.json({ message: error });
    }
};
