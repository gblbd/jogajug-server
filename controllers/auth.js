const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    // const profile = req.files.profileImage;

    // console.log("file", profile);

    // const encodeedPic = picData.toString("base64");
    // const profileImage = Buffer.from(encodeedPic, "base64");
    // console.log(profileImage);

    try {
        User.findOne({ email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    error: 'Email is taken',
                });
            }
            const newUser = new User({
                name,
                email,
                password,
            });

            newUser.save();
            res.json({
                message: 'Signup success! Please signin',
            });
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup',
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match',
            });
        }

        // generate a token and send to client
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        const { id, name, email } = user;

        return res.json({
            token,
            user: { id, name, email },
        });
    });
};

// show user list
exports.userListData = async (req, res) => {
    try {
        const test = await User.find({}, '-hashed_password -salt');

        res.json(test);
    } catch (error) {
        res.json({ message: error });
    }
};
// read user
exports.read = async (req, res) => {
    const ide = req.params.id;

    User.findById(ide).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found',
            });
        }

        res.json(user);
    });
};
// delete user
exports.userDelete = async (req, res) => {
    try {
        const { id } = req.body;

        await User.deleteOne({ _id: id });

        res.json({ message: 'successfully deleted' });
    } catch (error) {
        res.json({ message: error });
    }
};
// update list
exports.userUpdateData = async (req, res) => {
    const { name, email, id } = req.body;

    await User.findByIdAndUpdate(id, {
        $set: {
            name,
            email,
        },
    });

    return res.json({
        name,
        email,
    });
};
// api for chat

exports.getUsersForMessage = async (req, res) => {
    try {
        console.log(req.ID);
        console.log('ser', req.query.search);
        const queryData = req.query.search
            ? {
                  $or: [{ name: { $regex: req.query.search, $options: 'i' } }],
              }
            : {};
        console.log(queryData);
        if (req.query.search !== '') {
            const users = await User.find(queryData).find({ _id: { $ne: req.ID } });
            res.json(users);
        } else {
            res.json('please enter name');
        }
    } catch (err) {
        res.json(err);
    }
};
