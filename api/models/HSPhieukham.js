const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hsPhieuKhamSchema = new Schema({
    _id: Schema.Types.ObjectId,

    NgayDonTiep: {
        type: Date,
        default: Date.now()
    },
    BenhNhan: {
        type: Schema.Types.ObjectId,
        ref: 'DMBenhNhan'
    },
    TheBHYT: {
        type: Schema.Types.ObjectId,
        ref: 'DMTheBHYT'
    },
    SoTheBHYT: {
        type: String
    },
    HoTen: {
        type: String
    },
    Tuoi: {
        type: Number
    },
    IsBHYT: {
        type: Boolean
    },
    BacSyKham: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    NguoiDonTiep: {
        type: Schema.Types.ObjectId,
        // ref: 'User',
    },
    PhongKham: {
        type: Schema.Types.ObjectId,
        ref: 'DMKhoaPhong'
    },
    LoaiKham: {
        type: Schema.Types.ObjectId,
        ref: 'LoaiKham'
    },
    BenhVienTruoc: {
        type: Schema.Types.ObjectId,
        ref: 'DMBenhVien'
    },
    LuotKham: {
        type: Number
    },
    ChanDoanTuyenDuoi: {
        type: String
    },
    MaPhieuKham: {
        type: Number,
        // required: true
    },
    MaBenhNhan: {
        type: String,
        // required: true
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
    LoiDan: {
        type: String
    },
    NgayTaiKham: {
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
    },
    IdHSChiDinhDVKT: {
        type: Schema.Types.ObjectId,
        ref: 'HSChiDinhDVKT'
    },
    iddonthuoc: {
        type: Schema.Types.ObjectId,
        ref: 'HSDonThuoc'
    },
    createdAt: {
        type: Date
    }, 
    isNoiTru: {
        type: Boolean
    },
    IsCapCuu: {
        type: Boolean
    },
    idMaBenhChinh: {
        type: Schema.Types.ObjectId,
        ref: 'DMICD'
    }


});

module.exports = mongoose.model('HSPhieuKham', hsPhieuKhamSchema);