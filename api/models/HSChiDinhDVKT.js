const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hsChiDinhDVKT = new Schema({
    _id: Schema.Types.ObjectId,
    idPhieuKham: {
        type: Schema.Types.ObjectId,
        ref: 'HSPhieuKham'
    },
    idBenhAn: {
        type: Schema.Types.ObjectId,
    },
    idDVKT: {
        type: Schema.Types.ObjectId,
        ref: 'DMDVKT'
    },
    TenDVKT: {
        type: String
    },
    MaDVKT: {
        type: String
    },
    NgayYLenh: {
        type: Date
    },
    NgayThucHien: {
        type: Date
    },
    NgayTao: {
        type: Date
    },
    NguoiTao: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    NguoiThucHien: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    TrangThai: {
        type: String
    },
    SoLuong: {
        type: Number
    },
    KetQua: {
        type: String
    },
    GhiChu: {
        type: String
    },
    IsBHYT: {
        type: Boolean
    },
    IsThanhToan: {
        type: Boolean
    }
});

module.exports = mongoose.model('HSChiDinhDVKT', hsChiDinhDVKT);