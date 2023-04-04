/*

model plan :
 in this model the person who will givereply will store their info..
 it is the model where all the reply comment data will store
*/

const mongoose = require('mongoose');

// user schema
const replyInCommentScheama = new mongoose.Schema(
    {
        replycommentText: {
            type: String,
            trim: true,
        },
        mainCommentId: {
            type: mongoose.Types.ObjectId,
            ref: ' ReactCommentInfo',
        },
        publicPostId: {
            type: mongoose.Types.ObjectId,
            ref: 'PublicPost',
        },

        replycommentGivenUserId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        userProfiletImage: {
            type: String,
        },
    },
    { timestamps: true }
);

// virtual

module.exports = mongoose.model('ReplyInComment', replyInCommentScheama);
