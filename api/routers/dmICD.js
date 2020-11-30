const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMICD = require('../models/DMICD');

router.post('/create', async(req, res, next) => {

    const icd = new DMICD({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        ma: req.body.ma,
        nhom: req.body.nhom,
        chuong: req.body.chuong,
        active: req.body.active
    });

    icd.save()
        .then(icd => {
            res.status(201).json({
                msg: 'Created icd thanh cong',
                icd: icd
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
    const icdquery = DMICD.find().skip(pageSize * (pageIndex - 1)).limit(pageSize);
    let icdFetched;
    icdquery
        .sort('STT')
        .exec()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            icdFetched = results;
            return DMICD.countDocuments();
        }).then(count => {
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                count: count,
                ICD: icdFetched.map(hxt => {
                    return {
                        _id: hxt._id,
                        name: hxt.name,
                        nhom: hxt.nhom,
                        ma: hxt.ma,
                        chuong: hxt.chuong,
                        active: hxt.active
                    }
                })
            });
        })
        .catch(error => {
            console.log(error);
        });

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    DMICD.findById({ _id: id })
        .exec()
        .then(data => {
            res.status(201).json({
                data
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
    DMICD.findByIdAndDelete({ _id: id })
        .exec()
        .then(icd => {
            if (!icd) {
                res.status(500).json({
                    msg: `Co loi xay ra khi xoa 1 dan toc voi id: ${id}`
                });
            }
            res.status(201).json({
                msg: `Da xoa 1 dan toc voi id: ${id}`,
                icd: icd
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    // const icdUpdate = new DMICD({
    //     name: req.body.name,
    //     ma: req.body.ma,
    //     nhom: req.body.nhom,
    //     chuong: req.body.chuong,
    //     active: req.body.active
    // });

    DMICD.findByIdAndUpdate({ _id: id }, {
        $set: {
            name: req.body.name,
            ma: req.body.ma,
            nhom: req.body.nhom,
            chuong: req.body.chuong,
            active: req.body.active
        }
    },{
        upsert: true
    })
        .exec()
        .then(icd => {
            res.status(201).json({
                msg: `Da update 1 DAN TOC voi id: ${id}`,
                icd: icd
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});





module.exports = router;