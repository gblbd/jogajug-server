const ChatApplicationData = require('../models/chatApplicationData');
const MessageData = require('../models/messageData');
const User = require('../models/user');

exports.chatAccess = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            console.log('UserId param not sent with request');
            return res.sendStatus(400);
        }
        console.log('message1');
        let isChat = await ChatApplicationData.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.ID } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate({
                path: 'users',

                select: 'name email',
            })
            .populate('latestMessage');
        console.log('ch1', isChat);
        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name email',
        });
        console.log(isChat);
        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            const chatData = {
                chatName: 'sender',
                isGroupChat: false,
                users: [req.ID, userId],
            };

            try {
                const createdChat = await ChatApplicationData.create(chatData);
                const FullChat = await ChatApplicationData.findOne({
                    _id: createdChat._id,
                }).populate({
                    path: 'users',

                    select: 'name email',
                });
                res.status(200).json(FullChat);
            } catch (error) {
                res.status(400);
                throw new Error(error.message);
            }
        }
    } catch (err) {
        res.json(err);
    }
};
