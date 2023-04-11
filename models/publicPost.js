/*

model plan :
in this model the person who will give react,comment,all that person's id will be saved in the model
There will be another model where the reaction will be save with the user id..
There will be another model where the comment will be save with the user id..
*/

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
        postedByUser: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },

        taggedUserFriend: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        reactionGivenFriend: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        commentGivenFriend: [
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
        /*  shareLink: {
            type: String,
            trim: true,
        }, */
        // public or private or friends mode post
        postAudience: {
            type: String,
            trim: true,
        },
        postImageList: [
            {
                data: Buffer,
                type: String,
            },
        ],
        /* postGifImage: [
            {
                data: Buffer,
                type: String,
            },
        ], */
        /* postImage: {
      type: String,
    }, */
    },
    { timestamps: true }
);

// virtual

module.exports = mongoose.model('PublicPost', PublicPostScheama);
