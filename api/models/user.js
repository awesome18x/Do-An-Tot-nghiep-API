const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    khoaphong: {
        type: Schema.Types.ObjectId,
        ref: 'DMKhoaPhong',
    },
    hoten: {
        type: String,
    },
    CCHN: {
        type: String,
    },
    hocvi: {
        type: String
    },
    createdAt: {
        type: Date
    },
    active: {
        type: Boolean
    }

});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);