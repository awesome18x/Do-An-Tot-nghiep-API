const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bnSchema = new Schema({
    _id: Schema.Types.ObjectId,
    MaBN: {
        type: String,
    },
    HoTen: {
        type: String,
        reuired: true
    },
    NgaySinh: {
        type: Date,
        required: true
    },
    GioiTinh: {
        type: Number,
        required: true
    },
    SoCMND: {
        type: String
    },
    DiaChi: {
        type: String,
        required: true
    },
    DanToc: {
        type: String,
        required: true
    },
    NoiLamViec: {
        type: String
    },
    SDT: {
        type: String
    },
    NgheNghiep: {
        type: String
    },
    MaSoThue: {
        type: String
    }


});

module.exports = mongoose.model('DMBenhNhan', bnSchema);