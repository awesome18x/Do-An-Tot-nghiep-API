const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bnSchema = new Schema({
    _id: Schema.Types.ObjectId,
    maBN: {
        type: String,
    },
    hoTen: {
        type: String,
        reuired: true
    },
    ngaySinh: {
        type: Date,
        required: true
    },
    gioiTinh: {
        type: Number,
        required: true
    },
    soCMND: {
        type: String
    },
    diaChi: {
        type: String,
        required: true
    },
    danToc: {
        type: String,
        required: true
    },
    noiLamViec: {
        type: String
    },
    SDT: {
        type: String
    },
    ngheNghiep: {
        type: String
    },
    maSoThue: {
        type: String
    },
    maKhuVuc: {
        type: String
    }


});

module.exports = mongoose.model('DMBenhNhan', bnSchema);