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
        TrangThai: req.body.trangthai,
        BenhNhan: req.body.idbenhnhan,
        TheBHYT: req.body.idthebhyt,

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

    HSPhieuKham
        .find()
        .sort('LuotKham')
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
                HSPhieuKham: results
            });
        })
        .catch(error => {
            console.log(error);
        });

});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    Object.assign(updateOps, req.body)
        // console.log(Object.keys(req.body));
    for (const key in req.body) {
        updateOps[key] = key.value;
    }
    console.log(updateOps);
    // HSPhieuKham.findByIdAndUpdate(id, updateOps).exec((err, data) => {
    //     console.log("error:", err, data);

    //     res.status(200).json({
    //         msg: 'Update HSPhieuKham thanh cong',
    //         HSPhieuKham: data
    //     })
    // })

    HSPhieuKham.update({ _id: id }, updateOps)
        // .exec()
        .then(result => {
            res.status(200).json({
                msg: 'Update HSPhieuKham thanh cong',
                HSPhieuKham: result
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});



module.exports = router;