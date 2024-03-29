const FormData = require('form-data');
const Axios = require('axios');
const PublicPost = require('../models/publicPost');
// api to save a jobseekers's Personal Details
const imageHostKey = '79e6ec2db50a9ac8dbdb3b42a1accc92';
exports.publicPostData = async (req, res) => {
    const {
        postText,
        activityStatus,
        taggedUserFriend,
        postLocation,

        postAudience,
        postImageList,
    } = req.body;
    // console.log('reqbody', req.body);
    const imageUrls = [];

    for (let index = 0; index < postImageList.length; index++) {
        const bodyData = new FormData();
        const element = postImageList[index];
        const imageData = element.split(',')[1].trim();
        bodyData.append('image', imageData);
        const response = await Axios({
            method: 'post',
            url: `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: bodyData,
        });

        imageUrls.push(response.data.data.url);
    }

    try {
        const userId = req.ID;

        const newPostData = new PublicPost({
            postedByUser: userId,
            postText,
            activityStatus,
            taggedUserFriend,
            postLocation,

            postAudience,
            postImageList: imageUrls,
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
// show post status
/* exports.publicPostDataShow = async (req, res) => {
    const result = await PublicPost.find({}).populate({
        path: 'postedByUser',

        select: 'name profileImage',
    });
    res.json(result);
}; */
exports.publicPostDataShow = async (req, res) => {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    try {
        const result = await PublicPost.find({})
            .populate({
                path: 'postedByUser',
                select: 'name profileImage',
            })
            .skip(skip)
            .limit(limit);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
