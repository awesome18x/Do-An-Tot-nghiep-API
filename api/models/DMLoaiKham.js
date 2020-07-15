const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');

const loaiKhamSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    STT: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('LoaiKham', loaiKhamSchema);