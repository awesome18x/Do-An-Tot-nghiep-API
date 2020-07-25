const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmDVKT = new Schema({
    _id: Schema.Types.ObjectId,
    Name: {
        type: String,
        required: true
    },
    MaDV: {
        type: String,
        required: true,
        unique: true
    },
    Type: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true
    },
    GiaDV: {
        type: Number,
        required: true,
    },
    GiaBH: {
        type: Number,
        required: true,
    },
    BuongThucHien: [{
        type: Schema.Types.ObjectId,
        ref: 'DMKhoaPhong',
    }],
    KhoaThucHien: [{
        type: Schema.Types.ObjectId,
        ref: 'DMKhoaPhong',
    }],
});

module.exports = mongoose.model('DMDVKT', dmDVKT);