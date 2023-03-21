const mongoose = require('mongoose');

// user schema
const MessageDataScheama = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        // mood realated data wll save here
        content: {
            type: String,
            trim: true,
        },
        chatApplicationInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatApplicationData',
        },
    },
    { timestamps: true }
);

// virtual

module.exports = mongoose.model('MessageData', MessageDataScheama);
