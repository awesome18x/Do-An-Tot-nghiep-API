const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dmLoaiKhoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    ma: {
        type: String,
        required: true,
    },
    phanCap: {
        type: Number,
        required: true,
        unique: true
    },
    diaChi: {
        type: String,
        required: true,
    },
    isKhoNgoaiTru: {
        type: Boolean,
        required: true,
    },
    isKhongThanhToan: {
        type: Boolean,
        required: true,
    },
    isNhapHoaDon: {
        type: Boolean,
        required: true,
    }, 
    soTonCanhBao: {
        type: Number
    },
    soNgayCanhBao: {
        type: Number
    }
});

module.exports = mongoose.model('DMLKho', dmLoaiKhoSchema);