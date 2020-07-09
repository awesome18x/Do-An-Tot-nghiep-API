const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    khoaPhong: {
        type: Schema.Types.ObjectId,
        ref: 'DMKhoaPhong',
        required: true
    },
    hoTen: {
        type: String,
        required: true
    },
    CCHN: {
        type: String,
        required: true
    },
    hocVi: {
        type: String
    }

});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);