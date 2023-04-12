/*

model plan :
 in this model the person who will give react,comment mthat person's  id will be saved in the model.

*/

const mongoose = require('mongoose');

// user schema
const reactCommentInfoScheama = new mongoose.Schema(
    {
        commentText: {
            type: String,
            trim: true,
        },

        publicPostId: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'PublicPost',
            },
        ],
        reactionGivenFriendId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },

        commentGivenFriendId: {
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

module.exports = mongoose.model('ReactCommentInfo', reactCommentInfoScheama);
