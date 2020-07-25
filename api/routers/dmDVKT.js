const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMDVKT = require('./../models/DMDVKT');

router.post('/create', (req, res, next) => {

    const dvkt = new DMDVKT({
        _id: new mongoose.Types.ObjectId,
        Name: req.body.name,
        MaDV: req.body.madv,
        Type: +req.body.type,
        active: req.body.active,
        GiaDV: req.body.giadv,
        GiaBH: req.body.giabh,
        BuongThucHien: req.body.buongthuchien,
        KhoaThucHien: req.body.khoathuchien
    });

    dvkt.save()
        .then(dvkt => {
            res.status(201).json({
                msg: 'Created dvkt thanh cong',
                dvkt: dvkt
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
    const type = +req.query.type;
    const pageSize = +req.query.pageSize;
    const pageIndex = +req.query.pageIndex;
    let dantocQuery;
    let dantocFetched;
    if (type != 0) {
        dantocQuery = DMDVKT.find({ Type: type }).skip(pageSize * (pageIndex - 1)).limit(pageSize);
    } else {
        dantocQuery = DMDVKT.find().skip(pageSize * (pageIndex - 1)).limit(pageSize);
    }

    dantocQuery
        .exec()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            dantocFetched = results;
            if (type != 0) {
                return DMDVKT.countDocuments({ Type: type });
            } else {
                return DMDVKT.countDocuments();
            }

        }).then(count => {
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                count: count,
                dvkt: dantocFetched
            });
        })
        .catch(error => {
            console.log(error);
        });

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    DMDVKT.findById({ _id: id })
        .exec()
        .then(dvkt => {
            res.status(201).json({
                msg: `Da tim thay 1 dvkt voi id: ${id}`,
                dvkt: dvkt
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
    DMDVKT.findByIdAndDelete({ _id: id })
        .exec()
        .then(khoaphong => {
            if (!khoaphong) {
                res.status(500).json({
                    msg: `Co loi xay ra khi xoa 1 dvkt voi id: ${id}`,
                    dvkt: khoaphong
                });
            }
            res.status(201).json({
                msg: `Da xoa 1 dvkt voi id: ${id}`,
                dantoc: khoaphong
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
    const danTocUpdate = new DMDanToc({
        name: req.body.name,
        ma: req.body.ma,
        STT: req.body.STT
    });

    DMDanToc.findByIdAndUpdate({ _id: id }, danTocUpdate)
        .exec()
        .then(khoaphong => {
            res.status(201).json({
                msg: `Da update 1 DAN TOC voi id: ${id}`,
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