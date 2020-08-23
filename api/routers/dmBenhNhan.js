const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMBenhNhan = require('./../models/DMBenhNhan');

router.post('/create', (req, res, next) => {

    const dmBenhNhan = new DMBenhNhan({
        _id: new mongoose.Types.ObjectId,
        HoTen: req.body.hoten,
        NgaySinh: req.body.ngaysinh,
        GioiTinh: req.body.gioitinh,
        DanToc: req.body.dantoc,
        QuocTich: req.body.quoctich,
        SoCMND: req.body.socmnd,
        NoiLamViec: req.body.noilamviec,
        SDT: req.body.sdt,
        NgheNghiep: req.body.nghenghiep,
        MaSoThue: req.body.masothue,
        DiaChi: req.body.diachi,
        Tuoi: req.body.tuoi
    });

    dmBenhNhan.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    DMBenhNhan.findById({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const khoaPhongUpdate = new DMKhoaPhong({
        type: req.body.type,
        name: req.body.name,
        ma: req.body.ma,
        diaChi: req.body.diaChi
    });

    DMKhoaPhong.findByIdAndUpdate({ _id: id }, khoaPhongUpdate)
        .exec()
        .then(khoaphong => {
            res.status(201).json({
                msg: `Da update 1 khoa(phong) voi id: ${id}`,
                DMKhoaPhong: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    DMKhoaPhong.findByIdAndDelete({ _id: id })
        .exec()
        .then(khoaphong => {
            if (!khoaphong) {
                res.status(500).json({
                    msg: `Co loi xay ra khi xoa 1 khoa(phong) voi id: ${id}`,
                    DMKhoaPhong: khoaphong
                });
            }
            res.status(201).json({
                msg: `Da xoa 1 khoa(phong) voi id: ${id}`,
                DMKhoaPhong: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});


module.exports = router;