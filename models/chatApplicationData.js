const mongoose = require('mongoose');

// user schema
const ChatApplicationDataScheama = new mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true,
        },
        // mood realated data wll save here
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MessageData',
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

// virtual

module.exports = mongoose.model('ChatApplicationData', ChatApplicationDataScheama);
