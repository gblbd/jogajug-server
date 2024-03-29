const mongoose = require('mongoose');
const crypto = require('crypto');
// user schema
const userScheama = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            max: 32,
        },

        /*   role: {
      type: String,
      trim: true,

      max: 32,
    }, */

        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },

        hashed_password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
        },
        salt: String,
    },
    { timestamps: true },
);

// virtual
userScheama
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

// methods
userScheama.methods = {
    authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password; // true false
    },

    encryptPassword(password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt() {
        return `${Math.round(new Date().valueOf() * Math.random())}`;
    },
};

module.exports = mongoose.model('User', userScheama);
