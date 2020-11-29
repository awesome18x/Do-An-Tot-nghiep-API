const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HSPhieuKham = require('./../models/HSPhieuKham');
const moment = require('moment');

router.post('/create', async (req, res, next) => {
    let count = await HSPhieuKham.countDocuments();
    var date = new Date();
    var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ];

    var idRanDom = components.join("");

    const hsphieukham = new HSPhieuKham({
        _id: new mongoose.Types.ObjectId,
        createdAt: req.body.createdAt,
        PhongKham: req.body.idbuongkham,
        LoaiKham: req.body.idloaikham,
        ChanDoanTuyenDuoi: req.body.chandoantuyenduoi,
        BenhVienTruoc: req.body.idbenhvientruoc,
        NguoiDonTiep: req.body.idusername,
        LuotKham: req.body.luotkham,
        TrangThai: req.body.trangthai,
        BenhNhan: req.body.idbenhnhan,
        TheBHYT: req.body.idthebhyt,
        HoTen: req.body.hoten,
        Tuoi: req.body.tuoi,
        SoTheBHYT: req.body.sothebhyt,
        IsBHYT: req.body.isbhyt,
        MaPhieuKham: idRanDom,
        MaBenhNhan: 2020000000 + count
    });
    // Lấy ra bệnh nhân được đón gần nhất theo phòng khám được đón tiếp vào
    let phieuKhamNewest = await HSPhieuKham.find({'PhongKham': req.body.idbuongkham}).sort({createdAt: 'desc'}).limit(1);
    // console.log(phieuKhamNewest[0]);
    // return;
    // console.log(moment(phieuKhamNewest[0].NgayDonTiep).format("DD/MM/YYYY"));
    // console.log(moment(new Date()).format("DD/MM/YYYY"));
    // console.log(moment(phieuKhamNewest[0].NgayDonTiep).format("DD/MM/YYYY") !== moment(new Date()).format("DD/MM/YYYY"));
    // return;
    if (phieuKhamNewest.length === 0) {
        hsphieukham.LuotKham = 1;
    }
    if (phieuKhamNewest.length >= 1){
       if (moment(phieuKhamNewest[0].NgayDonTiep).format("DD/MM/YYYY") !== moment(new Date()).format("DD/MM/YYYY")) {
        hsphieukham.LuotKham = 1;
       } else {
        hsphieukham.LuotKham = Number(phieuKhamNewest[0].LuotKham) + 1;
       }
    }
    

    hsphieukham.save()
        .then(result => {
            res.status(201).json({
                HSPhieuKham: result
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
            console.log(error);
        });
});

router.get('/danhsach/dstiepdon', async (req, res, next) => {
    // console.log(moment(req.query.from).subtract(5, 'days').format());
    let filter = {
        NgayDonTiep: {
            $gte: req.query.from, 
            $lt: req.query.to
        },
        TrangThai: {
            $nin: 4
        }
    }

    if (req.query.phongKham !== '') {
        filter.PhongKham = req.query.phongKham === null ? '' : req.query.phongKham;
    } 


    let totalResult = await HSPhieuKham.find(filter).countDocuments();
    HSPhieuKham.find(filter).sort({NgayDonTiep: 'desc' }).skip(+req.query.pageSize * (+req.query.pageIndex - 1)).limit(+req.query.pageSize)
    .populate('PhongKham BenhNhan TheBHYT BacSyKham')
    .exec()
    .then(data => {
        res.status(200).json({
            soLuong: totalResult,
            data: data
        });
    })
    .catch(error => {
        console.log(error);
    });
});


router.get('/danhsach/dsdangkham', async (req, res) => {
    let filter = {
        TrangThai: 2,
        PhongKham: req.query.phongKham
    };

    const count = await HSPhieuKham.find(filter).countDocuments();

    HSPhieuKham
        .find(filter)
        .sort({NgayDonTiep: 'desc' })
        .skip(+req.query.pageSize * (+req.query.pageIndex - 1))
        .limit(+req.query.pageSize)
        .populate('PhongKham BenhNhan TheBHYT BacSyKham')
        .exec()
        .then(data => {
            res.status(200).json({
                totalResult: count,
                data: data
            });
        })
        .catch(error => {
            console.log(error);
        })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    HSPhieuKham.findById({ _id: id })
        .populate('PhongKham BenhNhan TheBHYT')
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json(error);
            console.log(error);
        })
});

router.get('/', async (req, res, next) => {
    const status = +req.query.status;
    const idbuongkham = req.query.idbuongkham;
    const pageSize = +req.query.pageSize;
    const pageIndex = +req.query.pageIndex;
    const numberTotal = await HSPhieuKham.find({ TrangThai: status, PhongKham: idbuongkham }).countDocuments();
    if (status && idbuongkham) {
        HSPhieuKham
            .find({ TrangThai: status, PhongKham: idbuongkham })
            .skip(pageSize * (pageIndex - 1))
            .limit(pageSize)
            .populate('TheBHYT BenhNhan PhongKham')
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
                    count: numberTotal,
                    HSPhieuKham: results
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    HSPhieuKham
        .find()
        .populate('TheBHYT BenhNhan')
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
    HSPhieuKham.update({ _id: id }, req.body)
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


router.delete('/delete-all', (req, res) => {
    HSPhieuKham.deleteMany().exec().then(() => {
        console.log('ok');
    }).catch(console.log)
})




module.exports = router;