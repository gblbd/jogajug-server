const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

exports.signup = (req, res) => {
  const { name, email, password, profileImage } = req.body;
  //const profile = req.files.profileImage;

  //console.log("file", profile);

  //const encodeedPic = picData.toString("base64");
  //const profileImage = Buffer.from(encodeedPic, "base64");
  //console.log(profileImage);
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
  });
  

  let newUser = new User({
    name,
    email,
    profileImage,
    
    password,
  });

  newUser.save((err, success) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({
      message: "Signup success! Please signin",
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email } = user;

    return res.json({
      token,
      user: { _id, name, email },
    });
  });
};

//show user list
exports.userListData = async (req, res) => {
  try {
    const test = await User.find({});

    res.json(test);
  } catch (error) {
    res.json({ message: error });
  }
};
//read user
exports.read = async (req, res) => {
  const _id = req.params.id;
  console.log("gfg", _id);

  User.findById(_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    res.json(user);
  });
};
//delete user
exports.userDelete = async (req, res) => {
  try {
    const { id } = req.body;

    await User.deleteOne({ _id: id });

    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.json({ message: error });
  }
};
//update list
exports.userUpdateData = async (req, res) => {
  const { name, email, id } = req.body;

  await User.findByIdAndUpdate(id, {
    $set: {
      name: name,
      email: email,
    },
  });

  return res.json({
    name: name,
    email: email,
  });
};
