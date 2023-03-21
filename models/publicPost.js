const mongoose = require('mongoose');

// user schema
const PublicPostScheama = new mongoose.Schema(
    {
        postText: {
            type: String,
            trim: true,
        },
        // mood realated data wll save here
        activityStatus: {
            type: String,
            trim: true,
        },
        taggedUserFriend: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        /*  taggedUserFriend: [
      {
        userFriendId: { type: mongoose.Types.ObjectId, ref: "User" },
      },
    ], */
        postLocation: {
            type: String,
            trim: true,
        },
        shareLink: {
            type: String,
            trim: true,
        },
        // public or private or friends mode post
        newsfeedStatus: {
            type: String,
            trim: true,
        },
        postImageList: [
            {
                data: Buffer,
                type: String,
            },
        ],
        postGifImage: [
            {
                data: Buffer,
                type: String,
            },
        ],
        /* postImage: {
      type: String,
    }, */
    },
    { timestamps: true },
);

// virtual

module.exports = mongoose.model('PublicPost', PublicPostScheama);
