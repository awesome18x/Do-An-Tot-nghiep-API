const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMKhoaPhong = require('./../models/DMKhoaPhong');
const HSPhieuKham = require('../models/HSPhieuKham');

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

router.get('/laydsphongkham', (req, res) => {
    DMKhoaPhong.find({type: 2}).exec().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        console.log(error);
    })
})
router.get('/laydskhoant', (req, res) => {
    DMKhoaPhong.find({type: 1}).exec().then(data => {
        res.status(200).json(data)
    }).catch(error => {
        console.log(error);
    })
})

router.get('/', (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const pageIndex = +req.query.pageIndex;
    const type = +req.query.type;
    let khoaPhongQuery;
    if (type === 3) {
        khoaPhongQuery = DMKhoaPhong.find().skip(pageSize * (pageIndex - 1)).limit(pageSize);
    } else {
        khoaPhongQuery = DMKhoaPhong.find({ type: type }).skip(pageSize * (pageIndex - 1)).limit(pageSize);
    }

    khoaPhongQuery
        .sort('name')
        .exec()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            fetchedKhoaPhongs = results;
            if (type === 3) {
                return DMKhoaPhong.countDocuments();
            } else {
                return DMKhoaPhong.countDocuments({ type: type });
            }
            // return DMKhoaPhong.countDocuments();
        }).then(count => {
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                dmKhoaPhong: fetchedKhoaPhongs.map(dmkhoaphong => {
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
                }),
                count: count
            });

        })
        .catch(error => {
            console.log(error);
        });
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
        type: req.body.type,
        name: req.body.name,
        ma: req.body.ma,
        diaChi: req.body.diaChi
    });

    DMKhoaPhong.update({ _id: id }, req.body)
        .exec()
        .then(khoaphong => {
            res.status(201).json({
                msg: `Da update 1 khoa(phong) voi id: ${id}`,
                DMKhoaPhong: khoaphong
            });
        }).catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
            console.log(error);
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