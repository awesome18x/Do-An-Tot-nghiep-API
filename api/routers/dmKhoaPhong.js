const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMKhoaPhong = require('./../models/DMKhoaPhong');

router.post('/create', (req, res, next) => {

    const dmKhoaPhong = new DMKhoaPhong({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        type: req.body.type,
        ma: req.body.ma,
        diaChi: req.body.diaChi
    });

    dmKhoaPhong.save()
        .then(khoaphong => {
            res.status(201).json({
                msg: 'Created DMKhoaPhong',
                DMKhoaPhongCreated: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.get('/', (req, res, next) => {
    const type = req.query.type;
    let loaiTK;
    if (type) {
        DMKhoaPhong
            .find({ type: type })
            .sort('name')
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
                    dmKhoaPhong: results.map(dmkhoaphong => {
                        return {
                            _id: dmkhoaphong._id,
                            name: dmkhoaphong.name,
                            type: dmkhoaphong.type,
                            createdAt: dmkhoaphong.createdAt,
                            ma: dmkhoaphong.ma,
                            diaChi: dmkhoaphong.diaChi,
                            request: {
                                type: 'GET'
                            }
                        }
                    })
                })
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        DMKhoaPhong
            .find()
            .sort('name')
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
                    dmKhoaPhong: results.map(dmkhoaphong => {
                        return {
                            _id: dmkhoaphong._id,
                            name: dmkhoaphong.name,
                            type: dmkhoaphong.type,
                            createdAt: dmkhoaphong.createdAt,
                            ma: dmkhoaphong.ma,
                            diaChi: dmkhoaphong.diaChi,
                            request: {
                                type: 'GET'
                            }
                        }
                    })
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    DMKhoaPhong.findById({ _id: id })
        .exec()
        .then(khoaphong => {
            res.status(201).json({
                msg: `Da tim thay 1 khoa(phong) voi id: ${id}`,
                DMKhoaPhong: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const khoaPhongUpdate = new DMKhoaPhong({
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