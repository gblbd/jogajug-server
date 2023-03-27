const ChatApplicationData = require('../models/chatApplicationData');
const MessageData = require('../models/messageData');
const User = require('../models/user');

exports.sendMessageToUser = async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log('Invalid data passed into request');
        return res.sendStatus(400);
    }

    const newMessage = {
        sender: req.ID,
        content,
        chatApplicationInfo: chatId,
    };

    try {
        let message = await MessageData.create(newMessage);

        message = await message.populate('sender', 'name');
        message = await message.populate('chatApplicationInfo');

        message = await User.populate(message, {
            path: 'chatApplicationInfo.users',
            select: 'name email',
        });

        await ChatApplicationData.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
// fetch all message for a particular chat

exports.fetchMessageForAChat = async (req, res) => {
    try {
        const messages = await MessageData.find({ chat: req.params.chatId })
            .populate('sender', 'name  email')
            .populate('chatApplicationInfo');
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
