const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HSPhieuKham = require('./../models/HSPhieuKham');

router.post('/create', (req, res, next) => {

    const hsphieukham = new HSPhieuKham({
        _id: new mongoose.Types.ObjectId,
        PhongKham: req.body.idbuongkham,
        LoaiKham: req.body.idloaikham,
        ChanDoanTuyenDuoi: req.body.chandoantuyenduoi,
        BenhVienTruoc: req.body.idbenhvientruoc,
        NguoiDonTiep: req.body.idusername,
        LuotKham: req.body.luotkham,
        TrangThai: req.body.trangthai
    });

    hsphieukham.save()
        .then(hxt => {
            res.status(201).json({
                msg: 'Created HSPhieuKham thanh cong',
                HSPhieuKham: hxt
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
            console.log(error);
        });
});

router.get('/', (req, res, next) => {

    HuongXuTri
        .find()
        .sort('STT')
        .exec()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                count: results.length,
                hxt: results.map(hxt => {
                    return {
                        _id: hxt._id,
                        name: hxt.name,
                        STT: hxt.STT
                    }
                })
            });
        })
        .catch(error => {
            console.log(error);
        });

});



module.exports = router;