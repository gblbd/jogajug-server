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
// fetch chat
exports.fetchChatData = async (req, res) => {
    try {
        ChatApplicationData.find({ users: { $elemMatch: { $eq: req.ID } } })
            .populate({
                path: 'users',
                select: 'name email',
            })
            .populate('latestMessage')
            .populate('groupAdmin')

            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: 'latestMessage.sender',
                    select: 'name email',
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
// create group chat

exports.createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: 'Please Fill all the feilds' });
    }
    const user = await User.findById({ _id: req.ID }, '-hashed_password -salt');
    console.log('Ver', user);
    const { users } = req.body;

    if (users.length < 2) {
        return res.status(400).send('More than 2 users are required to form a group chat');
    }

    users.push(user);

    try {
        const groupChat = await ChatApplicationData.create({
            chatName: req.body.name,
            users,
            isGroupChat: true,
            groupAdmin: user,
        });

        const fullGroupChat = await ChatApplicationData.findOne({ _id: groupChat._id })
            .populate({
                path: 'users',
                select: 'name email',
            })
            .populate('groupAdmin', '-hashed_password -salt');

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
