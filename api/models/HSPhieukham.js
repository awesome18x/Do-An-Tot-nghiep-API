const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phieukhamSchema = new Schema({
    _id: Schema.Types.ObjectId,

    ngayKham: {
        type: Date,
        required: true
    },
    bacSyKham: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    MaPhieuKham: {
        type: String,
        required: true
    },
    GioBatDauKham: {
        type: Date,
    },
    GioKetThucKham: {
        type: Date,
    },
    DienBienBenh: {
        type: String
    },
    TienSuBenh: {
        type: String
    },
    ToanThan: {
        type: String
    },
    CacBoPhan: {
        type: String
    },
    ChanDoan: {
        type: String
    },
    ToanThan: {
        type: String
    },
    PPDieuTri: {
        type: String
    },
    Mach: {
        type: String
    },
    NhietDo: {
        type: String
    },
    HuyetApTren: {
        type: String
    },
    HuyetApDuoi: {
        type: String
    },
    NhipTho: {
        type: String
    },
    SPO2: {
        type: String
    },
    CanNang: {
        type: String
    },
    ChieuCao: {
        type: String
    },
    TrangThai: {
        type: Number,
        required: true
            // định nghĩa trạng thái: 
            // 1 - vừa đón tiếp xong đồng thời có ở danh sách chờ khám, 
            // 2 - có tên ở danh sách đang khám
            // 3 - có tên ở danh sách đã khám xong
            // 4 - đã huỷ khám
            // 5 - có tên ở danh sách chuyển viện
            // 6 - có tên ở danh sách chờ cấp số vào viện
            // 7 - có tên ở danh sách đang điều trị nội trú
            // 8- có tên ở danh sách đã ra viện
    }


});

module.exports = mongoose.model('HSPhieuKham', phieukhamSchema);