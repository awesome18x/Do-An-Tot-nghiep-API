const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMBenhAn = require('./../models/DMBenhAn');

router.post('/create', async(req, res, next) => {

    const benhan = new DMBenhAn({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        ma: req.body.ma,
        thuocKhoa: req.body.thuocKhoa
    });

    benhan.save()
        .then(dmbenhan => {
            res.status(201).json({
                msg: 'Created benh an thanh cong',
                dmbenhan: dmbenhan
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
    const pageSize = +req.query.pageSize;
    const pageIndex = +req.query.pageIndex;
    const dantocQuery = DMBenhAn
    .find()
    .skip(pageSize * (pageIndex - 1))
    .limit(pageSize);
    let dmBenhAnFetched;
    dantocQuery
        .exec()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            dmBenhAnFetched = results;
            return DMBenhAn.countDocuments();
        }).then(count => {
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                count: count,
                dmbenhan: dmBenhAnFetched
            });
        })
        .catch(error => {
            console.log(error);
        });

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    DMBenhAn.findById({ _id: id })
        .exec()
        .then(khoaphong => {
            res.status(201).json({
                msg: `Da tim thay 1 benh an voi id: ${id}`,
                benhan: khoaphong
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
    DMBenhAn.findByIdAndDelete({ _id: id })
        .exec()
        .then(khoaphong => {
            if (!khoaphong) {
                res.status(500).json({
                    msg: `Co loi xay ra khi xoa 1 dan toc voi id: ${id}`,
                    dantoc: khoaphong
                });
            }
            res.status(201).json({
                msg: `Da xoa 1 dan toc voi id: ${id}`,
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
    const danTocUpdate = new DMBenhAn({
        name: req.body.name,
        ma: req.body.ma
    });

    DMBenhAn.findByIdAndUpdate({ _id: id }, danTocUpdate)
        .exec()
        .then(khoaphong => {
            res.status(201).json({
                msg: `Da update 1 DAN TOC voi id: ${id}`,
                DMBenhAn: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});





module.exports = router;