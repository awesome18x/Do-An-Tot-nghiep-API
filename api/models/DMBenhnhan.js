const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bnSchema = new Schema({
    _id: Schema.Types.ObjectId,
    MaBN: {
        type: String,
    },
    HoTen: {
        type: String,
    },
    NgaySinh: {
        type: String,
    },
    GioiTinh: {
        type: Number,
    },
    SoCMND: {
        type: String
    },
    DiaChi: {
        type: String,
    },
    DanToc: {
        type: String,
    },
    QuocTich: {
        type: String,
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
    },
    Tuoi: {
        type: Number
    }


});

module.exports = mongoose.model('DMBenhNhan', bnSchema);